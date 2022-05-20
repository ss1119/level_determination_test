import React from "react";
import Logo from "../common/Logo";
import { PCWrapContent } from "../common/WrapContent";
import { firestoreClientsKey } from "../common/Constants";
import InputFile from "./InputFile";
import AnswerStatus from "./AnswerStatus";
import DownloadFile from "./DownloadFile";
import Login from "./Login";
import firebase from "firebase/app";

export default class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      client: null,
      isAuthStateChanged: false,
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((client) => {
      this.setState({
        isAuthStateChanged: true,
      });
      if (client) {
        //生徒アカウントはadminで作成するためdisplayNameがnullなのに対し、クライアントアカウントはdisplayNameが必須なので、displayNameの有無でアカウントを判別
        if (client.displayName) {
          this.setState({
            client: client,
          });
          //Firestoreにクライアント情報を登録
          const clients = firebase.firestore().collection(firestoreClientsKey);
          clients.doc(client.uid).set({}, { merge: true });
        } else {
          firebase.auth().signOut();
        }
      }
    });
  }

  render() {
    return (
      <>
        <Logo />
        {this.getContainer()}
      </>
    );
  }

  getContainer() {
    if (!this.state.isAuthStateChanged) {
      return <></>;
    }
    return !this.state.client ? (
      <Login />
    ) : (
      <PCWrapContent>
        <InputFile />
        <DownloadFile />
        <AnswerStatus />
      </PCWrapContent>
    );
  }
}
