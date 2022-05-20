import React from "react";
import {
  InputFileArea,
  Title,
  Text,
  SendButton,
  Input,
} from "./styles/ClientStyle";
import firebase from "firebase/app";
import "../../config";
import {
  firestoreClientsKey,
  clientIdKey,
  firestoreUsersKey,
  initLevelRow,
  emailRow,
  familyNameRow,
  firstNameRow,
} from "../common/Constants";
import LoadingOverlay from "../common/LoadingOverlay";
import { user } from "firebase-functions/lib/providers/auth";

const parse = require("csv-parse");
const stringify = require("csv-stringify");

export default class InputFile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCorrectFile: false,
      fileContents: [],
      csvTitleRow: null,
      isLoading: false,
    };
  }

  render() {
    return (
      <>
        <LoadingOverlay isLoading={this.state.isLoading} />
        <InputFileArea>
          <Title>クライアントの登録</Title>
          <Text>
            所定のCSVファイルを選択し、
            <br />
            「メール送信」をクリックしてください。
          </Text>
          <br />
          <Input
            type="file"
            accept=".csv"
            id="file"
            onChange={this.onChange.bind(this)}
          />
          <SendButton
            disabled={!this.state.isCorrectFile}
            onClick={this.onClick.bind(this)}
          >
            メール送信
          </SendButton>
          <SendButton onClick={this.onClickResendEmail.bind(this)}>
            メールの再送信
          </SendButton>
        </InputFileArea>
      </>
    );
  }

  onClickResendEmail() {
    const result = confirm(
      "テストを受験していないユーザーにテストを受験するリンクを送信します。よろしいでしょうか？"
    );
    if (result) {
      this.setState({ isLoading: true });
      const clientId = firebase.auth().currentUser.uid;
      this.getCSVFromStorage().then((storageCsv) => {
        parse(storageCsv, {}, (_, parsedCsv) => {
          firebase
            .firestore()
            .collection(firestoreClientsKey)
            .doc(clientId)
            .collection(firestoreUsersKey)
            .get()
            .then((querySnapshot) => {
              const users = querySnapshot.docs
                .map((doc) => {
                  const email = parsedCsv.filter((csv) => {
                    return (
                      doc.data().name == csv[familyNameRow] + csv[firstNameRow]
                    );
                  })[0][emailRow];
                  return {
                    uid: doc.id,
                    name: doc.data().name,
                    init_level: doc.data().init_level,
                    determined_level: doc.data().determined_level,
                    index: doc.data().index,
                    email: email,
                  };
                })
                .filter((user) => {
                  return user.determined_level == "0" && user.email;
                });

              users.sort((lhs, rhs) => {
                if (lhs.index < rhs.index) {
                  return -1;
                }
                if (lhs.index > rhs.index) {
                  return 1;
                }
                return 0;
              });

              if (users.length == 0) {
                this.setState({ isLoading: false });
                alert("レベル判定テストを受験していないユーザーはいません。");
                return;
              }

              const promises = users.map((user) => {
                //ユーザー作成
                return function () {
                  const text =
                    "以下のURLから初期レベルを決定するためのテストを受験してください。\n\n" +
                    `https://level-determination-test.web.app?${clientIdKey}=${clientId}&uid=${user.uid}\n\n` +
                    "ご不明点などありましたら、お通いの立志館ゼミナールにお問合せください。";
                  const content = {
                    to: decodeURIComponent(user.email),
                    subject:
                      "(立志館)TiiFaの初期レベルを決定するためのテスト受験をお願いします",
                    text: text,
                  };
                  return fetch(
                    "https://us-central1-level-determination-test.cloudfunctions.net/sendEmail",
                    {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(content),
                    }
                  );
                };
              });
              // gmailを並列で送るとエラーになるので直列で送る
              promises
                .reduce((acc, cur) => acc.then(cur), Promise.resolve())
                .then((_) => {
                  this.setState({ isLoading: false });
                  alert("メールを送信しました");
                });
            });
        });
      });
    }
  }

  //選択したファイルが正しいかを判定し、正しい場合はCSVの内容を読み込む
  onChange() {
    const inputFile = document.getElementById("file");
    if (!inputFile.value.toUpperCase().match(/\.(CSV)$/i)) {
      inputFile.value = "";
      alert("CSVファイルを選択してください。");
      return;
    }

    const fileReader = new FileReader();
    const file = inputFile.files[0];
    fileReader.readAsArrayBuffer(file);

    fileReader.onload = (e) => {
      const uint8Array = new Uint8Array(e.target.result);
      const unicodeArray = Encoding.convert(uint8Array, "UNICODE");
      parse(
        Encoding.codeToString(unicodeArray),
        { fromLine: 1 },
        (_, parsedCsv) => {
          const csvTitleRow = parsedCsv.shift();
          this.setState({
            isCorrectFile: true,
            fileContents: parsedCsv,
            csvTitleRow: csvTitleRow,
          });
        }
      );
    };
  }

  getCSVFromStorage() {
    const clientId = firebase.auth().currentUser.uid;
    if (!clientId) {
      return Promise.reject(new Error("not client id"));
    }

    return new Promise((resolve, reject) => {
      firebase
        .storage()
        .ref()
        .child(`${clientId}.csv`)
        .getDownloadURL()
        .then((url) => {
          const request = new XMLHttpRequest();
          request.open("GET", url, true);
          request.overrideMimeType("text/plain");
          request.onreadystatechange = function () {
            // success
            if (request.readyState === 4) {
              resolve(request.responseText);
            }
          };
          request.send();
        })
        .catch((_) => {
          reject("not storage object");
        });
    });
  }

  createUsers(firstIndex, storageCsv) {
    const clientId = firebase.auth().currentUser.uid;
    const client = firebase
      .firestore()
      .collection(firestoreClientsKey)
      .doc(clientId);
    var index = firstIndex;
    var validFileContents = [];
    var invalidFileContents = [];
    const promises = this.state.fileContents.map((fileContent) => {
      //ユーザー作成
      return function () {
        return fetch(
          "https://us-central1-level-determination-test.cloudfunctions.net/createUser",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: fileContent[emailRow],
            }),
          }
        )
          .then((res) => res.json())
          .then((userRecord) => {
            if (!userRecord.uid) {
              // メールアドレスがauthで重複してる場合
              invalidFileContents.push(fileContent);
              return;
            }

            const text =
              "以下のURLから初期レベルを決定するためのテストを受験してください。\n\n" +
              `https://level-determination-test.web.app?${clientIdKey}=${clientId}&uid=${userRecord.uid}\n\n` +
              "ご不明点などありましたら、お通いの立志館ゼミナールにお問合せください。";
            const content = {
              to: decodeURIComponent(fileContent[emailRow]),
              subject:
                "(立志館)TiiFaの初期レベルを決定するためのテスト受験をお願いします",
              text: text,
            };
            return fetch(
              "https://us-central1-level-determination-test.cloudfunctions.net/sendEmail",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(content),
              }
            ).then(() => {
              return client
                .collection(firestoreUsersKey)
                .doc(userRecord.uid)
                .set(
                  {
                    index: index,
                    init_level: fileContent[initLevelRow],
                    determined_level: "0",
                    name:
                      fileContent[familyNameRow] + fileContent[firstNameRow],
                    is_downloaded: false,
                    is_solved: false,
                  },
                  { merge: true }
                )
                .then((_) => {
                  index++;
                  validFileContents.push(fileContent);
                });
            });
          });
      };
    });

    // gmailを並列で送るとエラーになるので直列で送る
    promises
      .reduce((acc, cur) => acc.then(cur), Promise.resolve())
      .then((_) => {
        const saveContents =
          storageCsv.length == 0
            ? [this.state.csvTitleRow].concat(validFileContents)
            : storageCsv.concat(validFileContents);
        if (saveContents.length == 0) {
          return;
        }
        return new Promise((resolve, _) => {
          stringify(saveContents, (_, csvString) => {
            return firebase
              .storage()
              .ref()
              .child(clientId + ".csv")
              .putString(csvString)
              .then(() => {
                resolve();
              });
          });
        });
      })
      .then((_) => {
        this.setState({ isLoading: false });
        if (invalidFileContents.length == 0) {
          alert("メールを送信しました");
        } else {
          const errorMessage = invalidFileContents
            .map(function (e) {
              return (
                "- " +
                e[familyNameRow] +
                " " +
                e[firstNameRow] +
                ", email: " +
                e[emailRow]
              );
            })
            .join("\n");
          alert(
            "メールを送信しました。以下のユーザーの登録は失敗しました。既に登録ずみのメールアドレスの可能性があります。\n\n" +
              errorMessage
          );
        }
      });
  }

  setDownloadNum() {
    const clientId = firebase.auth().currentUser.uid;
    const client = firebase
      .firestore()
      .collection(firestoreClientsKey)
      .doc(clientId);

    return new Promise(() => {
      client.set({
        download_num: 0,
      });
    });
  }

  onClick() {
    this.setState({ isLoading: true });

    this.getCSVFromStorage()
      .then((storageCsv) => {
        parse(storageCsv, {}, (_, parsedCsv) => {
          this.createUsers(parsedCsv.length - 1, parsedCsv);
        });
      })
      .catch((e) => {
        // Storageにcsvがない場合。ファイルの初回アップロード
        this.createUsers(0, []);
        this.setDownloadNum();
      });
  }
}
