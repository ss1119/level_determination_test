import React from "react";
import Logo from "../common/Logo";
import {
  SmartphoneTextArea,
  SmartphoneText,
  SmartphoneStartButton,
  PCTextArea,
  PCText,
  PCStartButton,
} from "./styles/StartStyle";
import { SmartphoneWrapContent, PCWrapContent } from "../common/WrapContent";
import Error404 from "../common/Error404";
import firebase from "firebase/app";
import "../../config";
import {
  clientIdKey,
  firestoreClientsKey,
  firestoreInitLevelKey,
  firestoreUsersKey,
  levelKey,
  countKey,
  rateKey,
  responsiveMaxWidth,
  responsiveMinWidth,
} from "../common/Constants";
import MediaQuery from "react-responsive";

export default class Start extends React.Component {
  render() {
    const query = new URLSearchParams(this.props.location.search);
    const client = query.get(clientIdKey);
    if (!client) {
      return <Error404 />;
    }
    return (
      <>
        <Logo />
        {this.getContainer()}
      </>
    );
  }

  getContainer() {
    return (
      <>
        <MediaQuery query={"(max-width:" + responsiveMaxWidth + ")"}>
          <SmartphoneWrapContent>
            <SmartphoneTextArea>
              <SmartphoneText>レベル判定テスト</SmartphoneText>
            </SmartphoneTextArea>
            <SmartphoneTextArea>
              <SmartphoneText>制限時間：20分00秒</SmartphoneText>
            </SmartphoneTextArea>
            <SmartphoneTextArea>
              <SmartphoneText>問題数：15問</SmartphoneText>
            </SmartphoneTextArea>
            <SmartphoneStartButton onClick={this.onClick.bind(this)}>
              スタート
            </SmartphoneStartButton>
          </SmartphoneWrapContent>
        </MediaQuery>
        <MediaQuery query={"(min-width:" + responsiveMinWidth + ")"}>
          <PCWrapContent>
            <PCTextArea>
              <PCText>レベル判定テスト</PCText>
            </PCTextArea>
            <PCTextArea>
              <PCText>制限時間：20分00秒</PCText>
            </PCTextArea>
            <PCTextArea>
              <PCText>問題数：15問</PCText>
            </PCTextArea>
            <PCStartButton onClick={this.onClick.bind(this)}>
              スタート
            </PCStartButton>
          </PCWrapContent>
        </MediaQuery>
      </>
    );
  }

  async onClick() {
    const query = new URLSearchParams(this.props.location.search);
    const client = query.get(clientIdKey);
    const uid = query.get("uid");

    //初期レベル取得
    const userDoc = await firebase
      .firestore()
      .collection(firestoreClientsKey)
      .doc(client)
      .collection(firestoreUsersKey)
      .doc(uid)
      .get();
    const level = userDoc.get(firestoreInitLevelKey);
    this.props.history.push(
      `/test?${clientIdKey}=${client}` +
        `&${levelKey}=${level}` +
        `&${countKey}=1&${rateKey}=0&uid=${uid}`
    );
  }
}
