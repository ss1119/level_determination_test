import React from "react";
import {
  AnswerStatusArea,
  AnswerStatusAreaContent,
  Title,
  Element,
  Table,
  Tr,
  Th,
  Td,
  DownloadButton,
} from "./styles/ClientStyle";
import {
  firestoreClientsKey,
  firestoreUsersKey,
  numberOfQuestions,
} from "../common/Constants";
import firebase from "firebase/app";
import "../../config";

export default class AnswerStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }

  render() {
    if (this.state.users.length === 0) {
      this.getUsers();
    }
    const listRows = this.state.users.map((user, index) => {
      return (
        <Tr key={index}>
          <Td>{user.name}</Td>
          <Td>{user.init_level}</Td>
          <Td>{user.determined_level}</Td>
          <Td>
            {user.answer_status_1 ? (
              <DownloadButton onClick={this.onClick.bind(this, user)}>
                ダウンロード
              </DownloadButton>
            ) : (
              <DownloadButton disabled={true}>ダウンロード</DownloadButton>
            )}
          </Td>
        </Tr>
      );
    });

    return (
      <>
        <AnswerStatusArea>
          <Title>生徒の解答状況</Title>
          <AnswerStatusAreaContent>
            <Element>
              <Table>
                <thead>
                  <tr>
                    <Th>名前</Th>
                    <Th>初期レベル</Th>
                    <Th>確定レベル</Th>
                    <Th>解答ダウンロード</Th>
                  </tr>
                </thead>
              </Table>
            </Element>
            <Element>
              <Table>
                <tbody>{listRows}</tbody>
              </Table>
            </Element>
          </AnswerStatusAreaContent>
        </AnswerStatusArea>
      </>
    );
  }

  onClick(user) {
    let formatCSV = "";
    formatCSV +=
      "第1回問題文, 第1回解答, 第1回答え, 第2回問題文, 第2回解答, 第2回答え, 第3回問題文, 第3回解答, 第3回答え\n";

    const escapeForCSV = (s) => {
      return `"${s.replace(/\"/g, '""')}"`;
    };

    for (let i = 0; i < numberOfQuestions; i++) {
      const innerValue = user.answer_status_1[i];
      formatCSV += escapeForCSV(innerValue.question) + ",";
      formatCSV += escapeForCSV(innerValue.selected_answer) + ",";
      formatCSV += escapeForCSV(innerValue.correct_answer);
      if (user.answer_status_2 !== null) {
        const innerValue = user.answer_status_2[i];
        formatCSV += "," + escapeForCSV(innerValue.question);
        formatCSV += "," + escapeForCSV(innerValue.selected_answer);
        formatCSV += "," + escapeForCSV(innerValue.correct_answer);
      }
      if (user.answer_status_3 !== null) {
        const innerValue = user.answer_status_3[i];
        formatCSV += "," + escapeForCSV(innerValue.question);
        formatCSV += "," + escapeForCSV(innerValue.selected_answer);
        formatCSV += "," + escapeForCSV(innerValue.correct_answer);
      }
      formatCSV += "\n";
    }
    const bom = new Uint8Array([0xef, 0xbb, 0xbf]);
    const blob = new Blob([bom, formatCSV], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "answerList.csv";
    link.click();
  }

  getUsers() {
    const clientId = firebase.auth().currentUser.uid;
    if (!clientId) {
      return;
    }
    firebase
      .firestore()
      .collection(firestoreClientsKey)
      .doc(clientId)
      .collection(firestoreUsersKey)
      .get()
      .then((querySnapshot) => {
        const users = querySnapshot.docs.map((doc) => {
          return {
            name: doc.data().name,
            init_level: doc.data().init_level,
            determined_level: doc.data().determined_level,
            index: doc.data().index,
            answer_status_1: doc.data().answer_status_1,
            answer_status_2: doc.data().answer_status_2,
            answer_status_3: doc.data().answer_status_3,
          };
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
        this.setState({ users: users });
      });
  }
}
