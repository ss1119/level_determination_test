import React from "react";
import {
  DownloadFileArea,
  DownloadFileContent,
  Title,
  Text,
  CSVDownloadButton,
  DownloadHistoryButton,
} from "./styles/ClientStyle";
import { DownloadHistoryModal } from "../modal/DownloadHistoryModal";
import firebase from "firebase/app";
import "../../config";
import {
  firestoreClientsKey,
  firestoreUsersKey,
  initLevelRow,
} from "../common/Constants";
import LoadingOverlay from "../common/LoadingOverlay";
const parse = require("csv-parse");
const stringify = require("csv-stringify/lib/sync");
const FileSaver = require("file-saver");

export default class DownloadFile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      downloadNum: 0,
      isOpenDownloadHistory: false,
      isLoading: false,
    };
  }

  componentDidMount() {
    this.getDownloadNum().then((downloadNum) => {
      this.setState({
        downloadNum: parseInt(downloadNum),
      });
    });
  }

  render() {
    return (
      <>
        <LoadingOverlay isLoading={this.state.isLoading} />
        <DownloadFileArea>
          <Title>解答状況のダウンロード</Title>
          <DownloadFileContent>
            <Text>
              過去にダウンロード
              <br />
              していないユーザーの
              <br />
              なかで、問題を解いた
              <br />
              ユーザーのみを
              <br />
              ダウンロードできます
            </Text>
            <CSVDownloadButton
              onClick={this.onClickDownloadSpecificUser.bind(this)}
            >
              ダウンロード
            </CSVDownloadButton>
          </DownloadFileContent>
          <DownloadFileContent>
            <Text>
              <br />
              過去にダウンロード
              <br />
              していないユーザー
              <br />
              すべてをダウンロード
              <br />
              できます
            </Text>
            <CSVDownloadButton onClick={this.onClickDownloadAllUser.bind(this)}>
              ダウンロード
            </CSVDownloadButton>
          </DownloadFileContent>
        </DownloadFileArea>
        {this.state.downloadNum === 0 ? (
          <DownloadHistoryButton disabled={true}>
            ダウンロード履歴
          </DownloadHistoryButton>
        ) : (
          <DownloadHistoryButton
            onClick={this.onClickDownloadHistory.bind(this)}
          >
            ダウンロード履歴
          </DownloadHistoryButton>
        )}
        {this.state.isOpenDownloadHistory && (
          <DownloadHistoryModal
            isOpen={true}
            onClose={this.onDownloadHistoryModalClose.bind(this)}
            downloadNum={this.state.downloadNum}
          ></DownloadHistoryModal>
        )}
      </>
    );
  }

  getCSVFromStorage() {
    const clientId = firebase.auth().currentUser.uid;
    if (!clientId) {
      return Promise.reject(new Error("not client id"));
    }

    return new Promise((resolve, _) => {
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
        });
    });
  }

  getChangedCsv(csv, isAllUser) {
    const clientId = firebase.auth().currentUser.uid;
    if (!clientId) {
      return Promise.reject(new Error("not client id"));
    }
    const client = firebase
      .firestore()
      .collection(firestoreClientsKey)
      .doc(clientId);

    return new Promise((resolve, _) => {
      parse(csv, {}, (_, parsedCsv) => {
        firebase
          .firestore()
          .collection(firestoreClientsKey)
          .doc(clientId)
          .collection(firestoreUsersKey)
          .get()
          .then((querySnapshot) => {
            const userData = querySnapshot.docs.map((doc) => {
              return {
                uid: doc.id,
                determined_level: doc.data().determined_level,
                index: doc.data().index,
                is_downloaded: doc.data().is_downloaded,
                is_solved: doc.data().is_solved,
              };
            });
            userData.sort((lhs, rhs) => {
              if (lhs.index < rhs.index) {
                return -1;
              }
              if (lhs.index > rhs.index) {
                return 1;
              }
              return 0;
            });

            // 1行目はtitle追加、それ以降はレベルを追加
            for (let i = 1; i < parsedCsv.length; i++) {
              // レベル判定テストを受けたユーザーのみcsvのレベルの値を書き換える
              if (userData[i - 1].determined_level != "0") {
                parsedCsv[i][initLevelRow] = userData[i - 1].determined_level;
              }
            }

            //条件に合わないユーザーを削除
            let index = 1;
            if (!isAllUser) {
              for (let i = 0; i < userData.length; i++) {
                if (userData[i].is_downloaded || !userData[i].is_solved) {
                  parsedCsv.splice(index, 1);
                } else {
                  client
                    .collection(firestoreUsersKey)
                    .doc(userData[i].uid)
                    .set({ is_downloaded: true }, { merge: true });
                  index++;
                }
              }
            } else {
              for (let i = 0; i < userData.length; i++) {
                if (userData[i].is_downloaded) {
                  parsedCsv.splice(index, 1);
                } else {
                  client
                    .collection(firestoreUsersKey)
                    .doc(userData[i].uid)
                    .set({ is_downloaded: true }, { merge: true });
                  index++;
                }
              }
            }
            if (parsedCsv.length == 1) {
              this.setState({ isLoading: false });
              alert("現在ダウンロードできるユーザーはいません");
              return;
            } else {
              resolve(parsedCsv);
            }
          });
      });
    });
  }

  getDownloadNum() {
    const clientId = firebase.auth().currentUser.uid;
    const client = firebase
      .firestore()
      .collection(firestoreClientsKey)
      .doc(clientId);

    let downloadNum;
    return new Promise((resolve, _) => {
      client
        .get()
        .then((doc) => {
          downloadNum = doc.data().download_num;
        })
        .then(() => {
          resolve(downloadNum);
        });
    });
  }

  addDownloadNum(downloadNum) {
    const clientId = firebase.auth().currentUser.uid;
    const client = firebase
      .firestore()
      .collection(firestoreClientsKey)
      .doc(clientId);

    return new Promise((resolve, _) => {
      client
        .set(
          {
            download_num: parseInt(downloadNum) + 1,
          },
          { merge: true }
        )
        .then(() => {
          this.setState({
            downloadNum: this.state.downloadNum + 1,
          });
          resolve();
        });
    });
  }

  saveCsv(downloadNum, parsedCsv) {
    const clientId = firebase.auth().currentUser.uid;
    return new Promise((resolve, _) => {
      return firebase
        .storage()
        .ref()
        .child(clientId + "_" + downloadNum + ".csv")
        .putString(stringify(parsedCsv))
        .then(() => {
          resolve();
        });
    });
  }

  onClickDownloadSpecificUser() {
    this.setState({ isLoading: true });
    this.getCSVFromStorage()
      .then((csvFromStorage) => {
        return this.getChangedCsv(csvFromStorage, false);
      })
      .then((csv) => {
        this.addDownloadNum(this.state.downloadNum).then(() => {
          this.saveCsv(this.state.downloadNum, csv).then(() => {
            const codes = Encoding.stringToCode(stringify(csv));
            const shiftJisCodeList = Encoding.convert(codes, "SJIS");
            const uInt8List = new Uint8Array(shiftJisCodeList);
            const writeData = new Blob([uInt8List], { type: "text/csv" });
            this.setState({ isLoading: false });
            FileSaver.saveAs(
              writeData,
              `levelList_${this.state.downloadNum}.csv`
            );
          });
        });
      });
  }

  onClickDownloadAllUser() {
    this.setState({ isLoading: true });
    this.getCSVFromStorage()
      .then((csvFromStorage) => {
        return this.getChangedCsv(csvFromStorage, true);
      })
      .then((csv) => {
        this.addDownloadNum(this.state.downloadNum).then(() => {
          this.saveCsv(this.state.downloadNum, csv).then(() => {
            const codes = Encoding.stringToCode(stringify(csv));
            const shiftJisCodeList = Encoding.convert(codes, "SJIS");
            const uInt8List = new Uint8Array(shiftJisCodeList);
            const writeData = new Blob([uInt8List], { type: "text/csv" });
            this.setState({ isLoading: false });
            FileSaver.saveAs(
              writeData,
              `levelList_${this.state.downloadNum}.csv`
            );
          });
        });
      });
  }

  onClickDownloadHistory() {
    this.setState({
      isOpenDownloadHistory: true,
    });
  }

  onDownloadHistoryModalClose() {
    this.setState({
      isOpenDownloadHistory: false,
    });
  }
}
