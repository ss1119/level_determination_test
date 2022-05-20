import React from "react";
import { Text } from "./styles/PasswordResetStyle";
import { clientIdKey } from "../common/Constants";
import "../../config";
import "firebase/auth";
import LoadingOverlay from "../common/LoadingOverlay";

export default class PasswordReset extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  componentDidMount() {
    const result = window.confirm(
      "レベル判定テストのリンクが記載されたメールを送信しますか？"
    );
    if (result) {
      this.setState({ isLoading: true });
      this.sendMail();
    }
  }

  render() {
    return (
      <>
        <LoadingOverlay isLoading={this.state.isLoading} />
        <Text>レベル判定テストを受験してください。</Text>
        <Text>
          レベル判定テストのリンクが記載されたメールを受信するにはリロードしてください。
        </Text>
      </>
    );
  }

  sendMail() {
    const query = new URLSearchParams(this.props.location.search);
    const clientId = query.get(clientIdKey);
    const email = query.get("email");
    const text =
      "以下のURLから初期レベルを決定するためのテストを受験してください。\n\n" +
      `https://level-determination-test.web.app?${clientIdKey}=${clientId}\n\n` +
      "ご不明点などありましたら、お通いの立志館ゼミナールにお問合せください。";
    const content = {
      to: decodeURIComponent(email),
      subject: "(立志館)TiiFaの初期レベルを決定するためのテスト受験をお願いします",
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
      this.setState({ isLoading: false });
    });
  }
}
