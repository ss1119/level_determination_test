import React from "react";
import Modal from "react-modal";
import {
  ModalStyle,
  DownloadButton,
  CloseButton,
  CloseButtonImage,
  Title,
  ModalContent,
  Element,
  Table,
  Tr,
  Td,
} from "./styles/DownloadHistoryModalStyle";
import firebase from "firebase/app";
import LoadingOverlay from "../common/LoadingOverlay";
const FileSaver = require("file-saver");

export class DownloadHistoryModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }
  render() {
    let listRows = [];
    for (var i = 1; i <= this.props.downloadNum; i++) {
      listRows.push(
        <Tr key={i}>
          <Td>{"levelList_" + i}</Td>
          <Td>
            <DownloadButton onClick={this.onClick.bind(this, i)}>
              再ダウンロード
            </DownloadButton>
          </Td>
        </Tr>
      );
    }
    return (
      <>
        <LoadingOverlay isLoading={this.state.isLoading} />
        <Modal isOpen={this.props.isOpen} style={ModalStyle}>
          <Title>ダウンロード履歴</Title>
          <CloseButton onClick={this.onClose.bind(this)}>
            <CloseButtonImage src="/CloseButton.png" alt="CloseButton" />
          </CloseButton>
          <ModalContent>
            <Element>
              <Table>{listRows}</Table>
            </Element>
          </ModalContent>
        </Modal>
      </>
    );
  }

  getCSVHistoryFromStorage(downloadNum) {
    const clientId = firebase.auth().currentUser.uid;
    if (!clientId) {
      return Promise.reject(new Error("not client id"));
    }

    return new Promise((resolve, _) => {
      firebase
        .storage()
        .ref()
        .child(`${clientId}_${downloadNum}.csv`)
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

  onClick(downloadNum) {
    this.setState({ isLoading: true });
    this.getCSVHistoryFromStorage(downloadNum)
      .then((csvFromStorage) => {
        const codes = Encoding.stringToCode(csvFromStorage);
        const shiftJisCodeList = Encoding.convert(codes, "SJIS");
        const uInt8List = new Uint8Array(shiftJisCodeList);
        const writeData = new Blob([uInt8List], { type: "text/csv" });
        this.setState({ isLoading: false });
        FileSaver.saveAs(writeData, `levelList_${downloadNum}.csv`);
      })
      .then(() => {
        this.onClose();
      });
  }

  onClose() {
    this.props.onClose();
  }
}
