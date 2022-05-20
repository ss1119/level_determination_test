import styled from "styled-components";

export const SmartphoneChoicesArea = styled.div`
  position: absolute;
  width: 90%;
  height: 35%;
  top: 47%;
  margin-left: 5%;
`;

export const SmartphoneChoice = styled.input`
  position: absolute;
  width: 80%;
  height: 20%;
  font-size: 20px;
  text-align: center;
  border: solid 2px black;
  border-radius: 8px;
  background-color: transparent;
  :after {
    background-color: transparent;
  }
  :hover {
    background-color: rgba(255, 255, 255, 0.8);
  }
  &:focus {
    outline: 0;
  }
  cursor: pointer;
  &:first-child {
    top: 0%;
    left: 10%;
  }
  &:nth-child(2) {
    top: 30%;
    left: 10%;
  }
  &:nth-child(3) {
    top: 60%;
    left: 10%;
  }
  &:nth-child(4) {
    top: 90%;
    left: 10%;
  }
`;

export const PCChoicesArea = styled.div`
  position: absolute;
  width: 90%;
  height: 35%;
  top: 45%;
  margin-left: 5%;
`;

export const PCChoice = styled.input`
  position: absolute;
  width: 33%;
  height: 29%;
  font-size: 25px;
  text-align: center;
  border: solid 2px black;
  border-radius: 8px;
  background-color: transparent;
  :after {
    background-color: transparent;
  }
  :hover {
    background-color: rgba(255, 255, 255, 0.8);
  }
  &:focus {
    outline: 0;
  }
  cursor: pointer;
  &:first-child {
    top: 10%;
    left: 10%;
  }
  &:nth-child(2) {
    top: 10%;
    left: 57%;
  }
  &:nth-child(3) {
    top: 55%;
    left: 10%;
  }
  &:nth-child(4) {
    top: 55%;
    left: 57%;
  }
`;
