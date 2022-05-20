import React from "react";
import firebase from "firebase/app";
import "../../config";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import "firebase/auth";

export default class Login extends React.Component {
  render() {
    const uiConfig = {
      signInFlow: "popup",
      signInSuccessUrl: "/client",
      signInOptions: [
        {
          provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        },
      ],
    };
    return (
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    );
  }
}
