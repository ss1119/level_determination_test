import React from "react";
import Logo from "../common/Logo";
import {
  SmartphoneQuestionCountArea,
  SmartphoneQuestionCount,
  SmartphoneNextButton,
  SmartphoneDerection,
  SmartphoneSentence,
  PCQuestionCountArea,
  PCQuestionCount,
  PCNextButton,
  PCDerection,
  PCSentence,
} from "./styles/QuestionStyle";
import { Choices } from "./Choices";
import { SmartphoneWrapContent, PCWrapContent } from "../common/WrapContent";
import {
  Level1,
  Level2,
  Level3,
  Level4,
  Level5,
  Level6,
  Level7,
  Level8,
  Level9,
  Level10,
} from "../../levels/Levels";
import Error404 from "../common/Error404";
import {
  clientIdKey,
  countKey,
  levelKey,
  rateKey,
  preRateKey,
  firestoreClientsKey,
  firestoreUsersKey,
  maxA,
  maxB,
  maxC,
  maxD,
  responsiveMaxWidth,
  responsiveMinWidth,
} from "../common/Constants";
import firebase from "firebase/app";
import MediaQuery from "react-responsive";

export default class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionCount: 1,
      correctCount: 0,
      selectedAnswer: null,
      answerStatus: [],
    };
  }

  render() {
    const query = new URLSearchParams(this.props.location.search);
    const questions = this.getQuestions(query.get(levelKey));
    if (!questions) {
      return Error404;
    }
    return (
      <>
        <Logo />
        <MediaQuery query={"(max-width:" + responsiveMaxWidth + ")"}>
          <SmartphoneWrapContent>
            <SmartphoneQuestionCountArea>
              <SmartphoneQuestionCount>
                第{this.state.questionCount}問
              </SmartphoneQuestionCount>
              /15問
            </SmartphoneQuestionCountArea>
            <SmartphoneDerection>
              {questions[this.state.questionCount - 1].instruction}
            </SmartphoneDerection>
            <SmartphoneSentence>
              {questions[this.state.questionCount - 1].sentence}
            </SmartphoneSentence>
            <Choices
              level={questions[this.state.questionCount - 1]}
              onClick={this.onClickChoice.bind(this)}
            />
            {questions[this.state.questionCount] != null ? (
              <SmartphoneNextButton
                onClick={this.onClickNextButton.bind(this)}
                disabled={this.state.selectedAnswer === null ? true : false}
              >
                次の問題
              </SmartphoneNextButton>
            ) : (
              <SmartphoneNextButton
                onClick={this.onClickEndButton.bind(this)}
                disabled={this.state.selectedAnswer === null ? true : false}
              >
                終了
              </SmartphoneNextButton>
            )}
          </SmartphoneWrapContent>
        </MediaQuery>
        <MediaQuery query={"(min-width:" + responsiveMinWidth + ")"}>
          <PCWrapContent>
            <PCQuestionCountArea>
              <PCQuestionCount>第{this.state.questionCount}問</PCQuestionCount>
              /15問
            </PCQuestionCountArea>
            <PCDerection>
              {questions[this.state.questionCount - 1].instruction}
            </PCDerection>
            <PCSentence>
              {questions[this.state.questionCount - 1].sentence}
            </PCSentence>
            <Choices
              level={questions[this.state.questionCount - 1]}
              onClick={this.onClickChoice.bind(this)}
            />
            {questions[this.state.questionCount] != null ? (
              <PCNextButton
                onClick={this.onClickNextButton.bind(this)}
                disabled={this.state.selectedAnswer === null ? true : false}
              >
                次の問題
              </PCNextButton>
            ) : (
              <PCNextButton
                onClick={this.onClickEndButton.bind(this)}
                disabled={this.state.selectedAnswer === null ? true : false}
              >
                終了
              </PCNextButton>
            )}
          </PCWrapContent>
        </MediaQuery>
      </>
    );
  }

  onClickChoice(i) {
    this.setState({
      selectedAnswer: i,
    });
  }

  onClickNextButton() {
    //正誤判定
    const query = new URLSearchParams(this.props.location.search);
    const questions = this.getQuestions(query.get(levelKey));
    let correctCount = this.state.correctCount;
    if (
      this.state.selectedAnswer ===
      questions[this.state.questionCount - 1].correct_answer
    ) {
      correctCount++;
    }

    document.getElementById("choice1").style.backgroundColor = "transparent";
    document.getElementById("choice2").style.backgroundColor = "transparent";
    document.getElementById("choice3").style.backgroundColor = "transparent";
    document.getElementById("choice4").style.backgroundColor = "transparent";

    //解答を保存
    const choices = questions[this.state.questionCount - 1].choices;
    const listRow = {
      question: questions[this.state.questionCount - 1].sentence,
      selected_answer: choices[this.state.selectedAnswer - 1],
      correct_answer:
        choices[questions[this.state.questionCount - 1].correct_answer - 1],
    };
    const tmp = Object.assign([], this.state.answerStatus);
    tmp.push(listRow);

    this.setState({
      questionCount: this.state.questionCount + 1,
      selectedAnswer: null,
      correctCount: correctCount,
      answerStatus: tmp,
    });
  }

  onClickEndButton() {
    const query = new URLSearchParams(this.props.location.search);
    const questions = this.getQuestions(query.get(levelKey));
    let level = parseInt(query.get(levelKey));
    const count = parseInt(query.get(countKey));
    const preRate = parseInt(query.get(rateKey));

    //正誤判定
    let correctCount = this.state.correctCount;
    const rate = Math.round((correctCount / 15) * 100);
    if (
      this.state.selectedAnswer ===
      questions[this.state.questionCount - 1].correct_answer
    ) {
      correctCount++;
    }

    //解答を保存
    const choices = questions[this.state.questionCount - 1].choices;
    const listRow = {
      question: questions[this.state.questionCount - 1].sentence,
      selected_answer: choices[this.state.selectedAnswer - 1],
      correct_answer:
        choices[questions[this.state.questionCount - 1].correct_answer - 1],
    };
    const tmp = Object.assign([], this.state.answerStatus);
    tmp.push(listRow);
    this.setState({ answerStatus: tmp }, () => {
      //Firestoreに生徒の解答を追加
      const client = query.get(clientIdKey);
      const uid = query.get("uid");
      const userRef = firebase
        .firestore()
        .collection(firestoreClientsKey)
        .doc(client)
        .collection(firestoreUsersKey)
        .doc(uid);

      if (count === 1) {
        userRef.set(
          {
            answer_status_1: this.state.answerStatus,
            answer_status_2: null,
            answer_status_3: null,
          },
          { merge: true }
        );
      } else if (count === 2) {
        userRef.set(
          { answer_status_2: this.state.answerStatus },
          { merge: true }
        );
      } else {
        userRef.set(
          { answer_status_3: this.state.answerStatus },
          { merge: true }
        );
      }

      //レベル判定
      //１回目
      if (count === 1) {
        //Aの場合
        if (this.isA(rate)) {
          level = level - 2;
          this.toContinue(level, count, rate, null);
        }
        //Bの場合
        else if (this.isB(rate)) {
          level = level - 1;
          this.toContinue(level, count, rate, null);
        }
        //Cの場合
        else if (this.isC(rate)) {
          this.toEnd(level);
        }
        //Dの場合
        else if (this.isD(rate)) {
          level = level + 1;
          this.toContinue(level, count, rate, null);
        }
        //Eの場合
        else if (this.isE(rate)) {
          level = level + 2;
          this.toContinue(level, count, rate, null);
        }
      }

      //２回目
      else if (count === 2) {
        //Aの場合
        if (this.isA(rate)) {
          //１回目がDかEの場合→levelを-1してレベル決定
          if (this.isD(preRate) || this.isE(preRate)) {
            level = level - 1;
            this.toEnd(level);
          }
          //１回目がAかBの場合→levelを-2して再テスト
          else {
            level = level - 2;
            this.toContinue(level, count, rate, preRate);
          }
        }
        //Bの場合
        else if (this.isB(rate)) {
          //１回目がDの場合→Cとの境界に近い方を採用してレベル決定
          if (this.isD(preRate)) {
            if (maxB - rate > preRate - maxC) {
              level = level - 1;
            }
            this.toEnd(level);
          }
          //１回目がD以外の場合→levelを-1して再テスト
          else {
            level = level - 1;
            this.toContinue(level, count, rate, preRate);
          }
        }
        //Cの場合
        else if (this.isC(rate)) {
          this.toEnd(level);
        }
        //Dの場合
        else if (this.isD(rate)) {
          //１回目がBの場合→Cとの境界に近い方を採用してレベル決定
          if (this.isB(preRate)) {
            if (rate - maxC > maxB - preRate) {
              level = level + 1;
            }
            this.toEnd(level);
          }
          //１回目がB以外の場合→levelを+1して再テスト
          else {
            level = level + 1;
            this.toContinue(level, count, rate, preRate);
          }
        }
        //Eの場合
        else if (this.isE(rate)) {
          //１回目がAかBの場合→levelを+1してレベル決定
          if (this.isA(preRate) || this.isB(preRate)) {
            level = level + 1;
            this.toEnd(level);
          }
          //１回目がDかEの場合→levelを+2して再テスト
          else {
            level = level + 2;
            this.toContinue(level, count, rate, preRate);
          }
        }
      }

      //３回目
      else if (count === 3) {
        const firstRate = parseInt(query.get("preRate")); //１回目の正答率
        const secondRate = preRate; //２回目の正答率
        //Aの場合
        if (this.isA(rate)) {
          //１回目がEかつ２回目がBの場合→levelを+0してレベル決定
          if (this.isE(firstRate) && this.isB(secondRate)) {
            this.toEnd(level);
          }
          //１回目がAかDかEかつ２回目がDかEの場合→levelを-1してレベル決定
          else if (
            this.isA(firstRate) ||
            this.isD(firstRate) ||
            this.isE(firstRate)
          ) {
            if (this.isD(secondRate) || this.isE(secondRate)) {
              level = level - 1;
              this.toEnd(level);
            }
          }
          //それ以外の場合→levelを-2してレベル決定
          else {
            level = level - 2;
            this.toEnd(level);
          }
        }
        //Bの場合
        else if (this.isB(rate)) {
          //２回目がDの場合→Cとの境界に近い方を採用してレベル決定
          if (this.isD(secondRate)) {
            if (maxB - rate > secondRate - maxC) {
              level = level - 1;
            }
            this.toEnd(level);
          }
          //1回目がEかつ２回目がBの場合→levelを+0してレベル決定
          else if (this.isE(firstRate) && this.isB(secondRate)) {
            this.toEnd(level);
          }
          //それ以外の場合→levelを-1してレベル決定
          else {
            level = level - 1;
            this.toEnd(level);
          }
        }
        //Cの場合
        else if (this.isC(rate)) {
          this.toEnd(level);
        }
        //Dの場合
        else if (this.isD(rate)) {
          //２回目がBの場合→Cとの境界に近い方を採用してレベル決定
          if (this.isB(secondRate)) {
            if (rate - maxC > maxB - secondRate) {
              level = level + 1;
            }
            this.toEnd(level);
          }
          //１回目がAかつ２回目がDの場合→levelを+0してレベル決定
          else if (this.isA(firstRate) && this.isD(secondRate)) {
            this.toEnd(level);
          }
          //それ以外の場合→levelを+1してレベル決定
          else {
            level = level + 1;
            this.toEnd(level);
          }
        }
        //Eの場合
        if (this.isE(rate)) {
          //２回目がAかBの場合→levelを+1してレベル決定
          if (this.isA(secondRate) || this.isB(secondRate)) {
            level = level + 1;
            this.toEnd(level);
          }
          //１回目がAかつ２回目がDの場合→levelを+0してレベル決定
          else if (this.isA(firstRate) && this.isD(secondRate)) {
            this.toEnd(level);
          }
          //それ以外の場合→levelを+2してレベル決定
          else {
            level = level + 2;
            this.toEnd(level);
          }
        }
      }
    });
  }

  toContinue(level, count, rate, preRate) {
    const query = new URLSearchParams(this.props.location.search);
    const client = query.get(clientIdKey);
    const uid = query.get("uid");
    //levelが1を下回った時
    if (level < 1) {
      level = 1;
      this.toEnd(level);
      return;
    }
    //levelが10を超えた時
    if (level > 10) {
      level = 10;
      this.toEnd(level);
      return;
    }
    this.props.history.push(
      `/continue?${clientIdKey}=${client}` +
        `&${levelKey}=${level}` +
        `&${countKey}=${count}` +
        `&${rateKey}=${rate}&uid=${uid}` +
        (preRate ? `&${preRateKey}=${preRate}` : "")
    );
  }

  isA(rate) {
    if (rate >= 0 && rate < maxA) {
      return true;
    }
    return false;
  }

  isB(rate) {
    if (rate >= maxA && rate < maxB) {
      return true;
    }
    return false;
  }

  isC(rate) {
    if (rate >= maxB && rate <= maxC) {
      return true;
    }
    return false;
  }

  isD(rate) {
    if (rate > maxC && rate <= maxD) {
      return true;
    }
    return false;
  }

  isE(rate) {
    if (rate > maxD && rate <= 100) {
      return true;
    }
    return false;
  }

  toEnd(level) {
    const query = new URLSearchParams(this.props.location.search);
    const client = query.get(clientIdKey);
    const uid = query.get("uid");
    //levelが1を下回った時
    if (level < 1) {
      level = 1;
    }
    //levelが10を超えた時
    if (level > 10) {
      level = 10;
    }
    //Firestoreのレベルを決定したレベルに書き換え
    const userRef = firebase
      .firestore()
      .collection(firestoreClientsKey)
      .doc(client)
      .collection(firestoreUsersKey)
      .doc(uid);

    userRef
      .set({ determined_level: level, is_solved: true }, { merge: true })
      .then((_) => {
        this.props.history.push("/end");
      });
  }

  getQuestions(level) {
    if (level === "1") {
      return Level1;
    } else if (level === "2") {
      return Level2;
    } else if (level === "3") {
      return Level3;
    } else if (level === "4") {
      return Level4;
    } else if (level === "5") {
      return Level5;
    } else if (level === "6") {
      return Level6;
    } else if (level === "7") {
      return Level7;
    } else if (level === "8") {
      return Level8;
    } else if (level === "9") {
      return Level9;
    } else if (level === "10") {
      return Level10;
    }
  }
}
