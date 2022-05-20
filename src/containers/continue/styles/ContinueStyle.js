import styled from "styled-components";

export const SmartphoneTextArea = styled.div`
  background: white;
  position: absolute;
  width: 92%;
  height: 25%;
  top: 15%;
  left: 4%;
  border: solid 2px rgba(112, 112, 112, 1);
`;

export const SmartphoneText = styled.p`
  position: flex;
  margin-top: 15px;
  margin-left: 5px;
  font-size: 21px;
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
  background: white;
  position: absolute;
  width: 70%;
  height: 16%;
  top: 30%;
  left: 15%;
  text-align: center;
  border: solid 2px rgba(112, 112, 112, 1);
`;

export const PCText = styled.p`
  position: flex;
  margin-top: 1.5%;
  font-size: 30px;
`;

export const PCStartButton = styled.button`
  position: absolute;
  background: #2467e9;
  border-radius: 8px;
  top: 70%;
  left: 36%;
  width: 28%;
  color: white;
  padding-top: 5px;
  font-size: 45px;
  &:focus {
    outline: 0;
  }
  cursor: pointer;
  border: none;
`;
