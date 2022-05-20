import React from "react";
import Logo from "../common/Logo";
import {
  TextArea,
  Text,
} from "./styles/EndStyle";
import { SmartphoneWrapContent, PCWrapContent } from "../common/WrapContent";
import { responsiveMaxWidth, responsiveMinWidth } from "../common/Constants";
import "../../config";
import MediaQuery from "react-responsive";

export default class End extends React.Component {
  render() {
    return (
      <>
        <Logo />
        <MediaQuery query={"(max-width:" + responsiveMaxWidth + ")"}>
          <SmartphoneWrapContent>
            <TextArea>
              <Text>
                レベルが決定しました。
                <br />
                お疲れさまでした。
                <br /><br />
                翌日または翌々日以降に
                <br />
                <a href="http://tiifa-app.tiifa.jp/">こちら</a>からサインイン
                <br />
                してください。
              </Text>
            </TextArea>
          </SmartphoneWrapContent>
        </MediaQuery>
        <MediaQuery query={"(min-width:" + responsiveMinWidth + ")"}>
          <PCWrapContent>
            <TextArea>
              <Text>
              レベルが決定しました。
                <br />
                お疲れさまでした。
                <br /><br />
                翌日または翌々日以降に
                <br />
                <a href="http://tiifa-app.tiifa.jp/">こちら</a>からサインイン
                <br />
                してください。
              </Text>
            </TextArea>
          </PCWrapContent>
        </MediaQuery>
      </>
    );
  }
}
