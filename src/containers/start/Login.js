import React from "react";
import firebase from "firebase/app";
import "../../config";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import "firebase/auth";
import { clientIdKey } from "../common/Constants";

export default class Login extends React.Component {
  render() {
    const uiConfig = {
      signInFlow: "popup",
      signInSuccessUrl: `/?${clientIdKey}=${this.props.client}`,
      signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
    };
    return (
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    );
  }
}
