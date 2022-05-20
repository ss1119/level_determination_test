import styled from "styled-components";

export const InputFileArea = styled.div`
  position: absolute;
  width: 450px;
  height: 280px;
  top: 30px;
  left: 50px;
  text-align: center;
  border: solid 2px rgba(112, 112, 112, 1);
`;

export const Text = styled.p`
  position: flex;
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 20px;
`;

export const SendButton = styled.button`
  background: rgba(36, 103, 233, 1);
  border-radius: 8px;
  margin-top: 20px;
  margin-left: 8px;
  width: 200px;
  color: white;
  padding-top: 5px;
  font-size: 25px;
  &:focus {
    outline: 0;
  }
  &:disabled {
    background: rgba(36, 103, 233, 0.5);
    cursor: not-allowed;
  }
  cursor: pointer;
  border: none;
`;

export const Input = styled.input`
  font-size: 20px;
  margin-top: -5px;
  width: 80%;
  text-align: center;
  color: black;
`;

export const AnswerStatusArea = styled.div`
  position: absolute;
  width: 830px;
  height: 680px;
  top: 30px;
  left: 570px;
  text-align: center;
  border: solid 2px rgba(112, 112, 112, 1);
`;

export const AnswerStatusAreaContent = styled.div`
  position: absolute;
  width: 810px;
  height: 600px;
  margin-top: -12px;
  margin-left: 8px;
`;

export const Title = styled.p`
  position: flex;
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 30px;
  border-bottom: double 6px rgba(112, 112, 112, 1);
`;

export const Element = styled.div`
  position: absolute;
  margin-left: 5px;
  padding: 0px 16px 16px 16px;
  &:first-child {
    margin-top: 7px;
  }
  &:nth-child(2) {
    height: 530px;
    overflow-y: scroll;
    margin-top: 47px;
  }
`;

export const Table = styled.table`
  width: 100%;
  table-layout: fixed;
  text-align: center;
  border-spacing: 0px 8px;
`;

export const Th = styled.th`
  background: rgba(112, 112, 112, 1);
  color: white;
  font-size: 18px;
  border-left: solid 5px rgba(229, 229, 229, 1);
  border-right: solid 5px rgba(229, 229, 229, 1);
  border-collapse: separate;
  position: sticky;
  top: 0;
  z-index: 1;
`;

export const Tr = styled.tr`
  background: white;
  width: 100%;
  height: 40px;
  filter: drop-shadow(0 2px 2px rgba(0, 0, 0, 0.3));
`;

export const Td = styled.td`
  word-break: break-all;
  &:first-child {
    border-top-left-radius: 12px;
    border-bottom-left-radius: 12px;
  }
  &:last-child {
    border-top-right-radius: 12px;
    border-bottom-right-radius: 12px;
  }
`;

export const DownloadFileArea = styled.div`
  position: absolute;
  width: 450px;
  height: 380px;
  top: 330px;
  left: 50px;
  text-align: center;
  border: solid 2px rgba(112, 112, 112, 1);
`;

export const DownloadFileContent = styled.div`
  position: absolute;
  width: 224px;
  height: 247px;
  top: 62px;
  text-align: center;
  border-right: solid 2px rgba(112, 112, 112, 1);
  border-bottom: solid 2px rgba(112, 112, 112, 1);
  &:first-child {
    left: 5px;
  }
  &:last-child {
    left: 226px;
  }
`;

export const CSVDownloadButton = styled.button`
  position: absolute;
  background: rgba(36, 103, 233, 1);
  border-radius: 8px;
  left: 27px;
  bottom: 25px;
  width: 170px;
  color: white;
  padding-top: 5px;
  font-size: 25px;
  &:focus {
    outline: 0;
  }
  &:disabled {
    background: rgba(36, 103, 233, 0.5);
    cursor: not-allowed;
  }
  cursor: pointer;
  border: none;
`;

export const DownloadHistoryButton = styled.button`
  position: absolute;
  background: rgba(36, 103, 233, 1);
  border-radius: 8px;
  left: 165px;
  top: 656px;
  width: 220px;
  color: white;
  padding-top: 5px;
  font-size: 25px;
  &:focus {
    outline: 0;
  }
  &:disabled {
    background: rgba(36, 103, 233, 0.5);
    cursor: not-allowed;
  }
  cursor: pointer;
  border: none;
`;

export const DownloadButton = styled.button`
  background: rgba(36, 103, 233, 1);
  border-radius: 8px;
  margin-top: 5px;
  margin-left: 20px;
  width: 130px;
  color: white;
  padding-top: 2px;
  font-size: 18px;
  &:focus {
    outline: 0;
  }
  &:disabled {
    background: rgba(36, 103, 233, 0.5);
    cursor: not-allowed;
  }
  cursor: pointer;
  border: none;
`;
