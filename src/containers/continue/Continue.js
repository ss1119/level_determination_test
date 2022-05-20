import React from "react";
import Logo from "../common/Logo";
import {
  SmartphoneTextArea,
  SmartphoneText,
  SmartphoneStartButton,
  PCTextArea,
  PCText,
  PCStartButton,
} from "./styles/ContinueStyle";
import { SmartphoneWrapContent, PCWrapContent } from "../common/WrapContent";
import { Link } from "react-router-dom";
import {
  clientIdKey,
  countKey,
  levelKey,
  rateKey,
  responsiveMaxWidth,
  responsiveMinWidth,
} from "../common/Constants";
import MediaQuery from "react-responsive";

export default class Continue extends React.Component {
  render() {
    const query = new URLSearchParams(this.props.location.search);
    const level = parseInt(query.get(levelKey));
    const count = parseInt(query.get(countKey)) + 1;
    const preRate = parseInt(query.get(rateKey));
    const client = query.get(clientIdKey);
    const uid = query.get("uid");
    return (
      <>
        <Logo />
        <MediaQuery query={"(max-width:" + responsiveMaxWidth + ")"}>
          <SmartphoneWrapContent>
            <SmartphoneTextArea>
              <SmartphoneText>
                次の問題セットに進みます。
                <br />
                準備ができたら下のボタンを
                <br />
                押して解答を続けてください。
              </SmartphoneText>
            </SmartphoneTextArea>
            <Link
              to={
                `/test?${clientIdKey}=${client}` +
                `&${levelKey}=${level}` +
                `&${countKey}=${count}` +
                `&${rateKey}=${preRate}&uid=${uid}`
              }
            >
              <SmartphoneStartButton>スタート</SmartphoneStartButton>
            </Link>
          </SmartphoneWrapContent>
        </MediaQuery>
        <MediaQuery query={"(min-width:" + responsiveMinWidth + ")"}>
          <PCWrapContent>
            <PCTextArea>
              <PCText>
                次の問題セットに進みます。
                <br />
                準備ができたら下のボタンを押して解答を続けてください。
              </PCText>
            </PCTextArea>
            <Link
              to={
                `/test?${clientIdKey}=${client}` +
                `&${levelKey}=${level}` +
                `&${countKey}=${count}` +
                `&${rateKey}=${preRate}&uid=${uid}`
              }
            >
              <PCStartButton>スタート</PCStartButton>
            </Link>
          </PCWrapContent>
        </MediaQuery>
      </>
    );
  }
}
