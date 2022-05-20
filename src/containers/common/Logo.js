import React from "react";
import styled from "styled-components";

  const LogoStyle = styled.img`
  height: 70px;
  margin-top: 16px;
  margin-left: 32px;
  cursor: pointer;
`;

  export default class Logo extends React.Component{
    render() {
      return (
        <LogoStyle src="/logo_AI.png" alt="logo" />
      );
    }
  }
