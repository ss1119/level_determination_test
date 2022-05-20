import styled from "styled-components";

export const SmartphoneTextArea = styled.div`
  background: #eee85d;
  position: absolute;
  width: 80%;
  height: 13%;
  left: 10%;
  text-align: center;
  border: solid 2px rgba(112, 112, 112, 1);
  &:first-child {
    top: 15%;
  }
  &:nth-child(2) {
    top: 28%;
  }
  &:nth-child(3) {
    top: 41%;
  }
`;

export const SmartphoneText = styled.p`
  position: flex;
  margin-top: 18px;
  font-size: 28px;
  font-weight: 500;
`;

export const SmartphoneStartButton = styled.button`
  position: absolute;
  background: #2467e9;
  border-radius: 8px;
  top: 70%;
  left: 15%;
  width: 70%;
  color: white;
  padding-top: 5px;
  font-size: 40px;
  &:focus {
    outline: 0;
  }
  cursor: pointer;
  border: none;
`;

export const PCTextArea = styled.div`
  background: #eee85d;
  position: absolute;
  width: 40%;
  height: 14%;
  left: 30%;
  text-align: center;
  border: solid 2px rgba(112, 112, 112, 1);
  &:first-child {
    top: 17%;
  }
  &:nth-child(2) {
    top: 31%;
  }
  &:nth-child(3) {
    top: 44%;
  }
`;

export const PCText = styled.p`
  position: flex;
  margin-top: 18px;
  font-size: 50px;
  font-weight: 500;
`;

export const PCStartButton = styled.button`
  position: absolute;
  background: #2467e9;
  border-radius: 8px;
  top: 70%;
  left: 30%;
  width: 40%;
  color: white;
  padding-top: 5px;
  font-size: 40px;
  &:focus {
    outline: 0;
  }
  cursor: pointer;
  border: none;
`;
