import styled from "styled-components";

export const SmartphoneQuestionCountArea = styled.div`
  position: absolute;
  width: 60%;
  height: 7%;
  top: 4%;
  left: 20%;
  font-size: 20px;
  text-align: center;
  border: solid 2px black;
`;

export const SmartphoneQuestionCount = styled.span`
  font-size: 30px;
`;

export const SmartphoneDerection = styled.div`
  position: absolute;
  width: 96%;
  height: 10%;
  top: 14%;
  left: 2%;
  font-size: 20px;
`;

export const SmartphoneSentence = styled.div`
  position: absolute;
  width: 96%;
  height: 20%;
  top: 24%;
  left: 2%;
  font-size: 20px;
`;

export const SmartphoneNextButton = styled.button`
  position: absolute;
  background: #fff84e;
  border-radius: 8px;
  top: 89%;
  left: 20%;
  width: 60%;
  height: 9%;
  color: black;
  padding-top: 5px;
  font-size: 25px;
  box-shadow: 2px 2px;
  &:focus {
    outline: 0;
  }
  &:disabled {
    background: rgba(255, 248, 38, 0.3);
    cursor: not-allowed;
  }
  cursor: pointer;
  border: none;
`;

export const PCQuestionCountArea = styled.div`
  position: absolute;
  width: 26%;
  height: 7%;
  top: 5%;
  left: 37%;
  font-size: 25px;
  text-align: center;
  border: solid 2px black;
`;

export const PCQuestionCount = styled.span`
  font-size: 35px;
`;

export const PCDerection = styled.div`
  position: absolute;
  width: 80%;
  height: 5%;
  top: 20%;
  left: 10%;
  font-size: 22px;
`;

export const PCSentence = styled.div`
  position: absolute;
  width: 80%;
  height: 18%;
  top: 27%;
  left: 10%;
  font-size: 22px;
`;

export const PCNextButton = styled.button`
  position: absolute;
  background: #fff84e;
  border-radius: 8px;
  top: 84%;
  left: 41%;
  width: 18%;
  height: 9%;
  color: black;
  padding-top: 5px;
  font-size: 25px;
  box-shadow: 2px 2px;
  &:focus {
    outline: 0;
  }
  &:disabled {
    background: rgba(255, 248, 38, 0.3);
    cursor: not-allowed;
  }
  cursor: pointer;
  border: none;
`;
