import styled from "styled-components";

export const ModalStyle = {
  overlay: {
    zIndex: 99,
  },
  content: {
    top: "50%",
    left: "50%",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    width: "600px",
    height: "400px",
    border: "solid 2px rgba(112, 112, 112, 1)",
    borderRadius: "48px",
  },
};

export const DownloadButton = styled.button`
  background: rgba(36, 103, 233, 1);
  border-radius: 8px;
  margin-top: 5px;
  margin-bottom: 5px;
  margin-left: 20px;
  width: 150px;
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

export const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 32px;
  height: 32px;
  background: rgba(0, 0, 0, 0);
  border: none;
  padding: 0;
  &:focus {
    outline: 0;
  }
  cursor: pointer;
`;

export const CloseButtonImage = styled.img`
  width: 32px;
  height: 32px;
`;

export const ModalContent = styled.div`
  position: absolute;
  top: 100px;
  width: 580px;
  height: 320px;
  overflow-y: scroll;
`;

export const Element = styled.div`
  position: absolute;
  padding: 0px 16px 16px 16px;
  margin-top: 5px;
`;

export const Title = styled.p`
  position: flex;
  margin-top: 10px;
  font-size: 30px;
  text-align: center;
  border-bottom: double 6px rgba(112, 112, 112, 1);
`;

export const Table = styled.table`
  width: 100%;
  table-layout: fixed;
  text-align: center;
  border-spacing: 0px 8px;
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
