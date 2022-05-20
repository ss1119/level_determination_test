import React from "react";
import {
  SmartphoneChoice,
  SmartphoneChoicesArea,
  PCChoice,
  PCChoicesArea,
} from "./styles/ChoicesStyle";
import { responsiveMaxWidth, responsiveMinWidth } from "../common/Constants";
import MediaQuery from "react-responsive";

export class Choices extends React.Component {
  render() {
    return (
      <>
        <MediaQuery query={"(max-width:" + responsiveMaxWidth + ")"}>
          <SmartphoneChoicesArea>
            <SmartphoneChoice
              id="choice1"
              type="button"
              onClick={this.onClick.bind(this, "1")}
              value={"1. " + this.props.level.choices[0]}
            />
            <SmartphoneChoice
              id="choice2"
              type="button"
              onClick={this.onClick.bind(this, "2")}
              value={"2. " + this.props.level.choices[1]}
            />
            <SmartphoneChoice
              id="choice3"
              type="button"
              onClick={this.onClick.bind(this, "3")}
              value={"3. " + this.props.level.choices[2]}
            />
            <SmartphoneChoice
              id="choice4"
              type="button"
              onClick={this.onClick.bind(this, "4")}
              value={"4. " + this.props.level.choices[3]}
            />
          </SmartphoneChoicesArea>
        </MediaQuery>
        <MediaQuery query={"(min-width:" + responsiveMinWidth + ")"}>
          <PCChoicesArea>
            <PCChoice
              id="choice1"
              type="button"
              onClick={this.onClick.bind(this, "1")}
              value={"1. " + this.props.level.choices[0]}
            />
            <PCChoice
              id="choice2"
              type="button"
              onClick={this.onClick.bind(this, "2")}
              value={"2. " + this.props.level.choices[1]}
            />
            <PCChoice
              id="choice3"
              type="button"
              onClick={this.onClick.bind(this, "3")}
              value={"3. " + this.props.level.choices[2]}
            />
            <PCChoice
              id="choice4"
              type="button"
              onClick={this.onClick.bind(this, "4")}
              value={"4. " + this.props.level.choices[3]}
            />
          </PCChoicesArea>
        </MediaQuery>
      </>
    );
  }
  onClick(i) {
    document.getElementById("choice1").style.backgroundColor = "transparent";
    document.getElementById("choice2").style.backgroundColor = "transparent";
    document.getElementById("choice3").style.backgroundColor = "transparent";
    document.getElementById("choice4").style.backgroundColor = "transparent";

    const id = "choice" + i;
    document.getElementById(id).style.backgroundColor = "rgba(0, 0, 0, 0.3)";
    this.props.onClick(i);
  }
}
