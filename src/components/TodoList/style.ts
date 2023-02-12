import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

export const Main = styled("div")`
  display: flex;
  justify-content: center;
  background: black;
  height: 100vh;
  @media (max-width: 768px) {
    background: #222222;
  }
`;

export const ContentWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  padding: 15px 20px;
  background: #222222;
  width: 390px;
  border-radius: 30px;
  gap: 30px;
  margin: 50px 0;
  box-sizing: border-box;
`;

export const ScrollableContent = styled("div")`
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Header = styled("header")`
  display: flex;
  justify-content: space-between;
`;

export const HeaderTitle = styled("h1")`
  font-size: 36px;
  color: #f4f4f4;
`;

export const Marquee = styled("div")`
  line-height: 30px;
  color: white;
  white-space: nowrap;
  overflow: hidden;
  box-sizing: border-box;
`;

const marquee = keyframes`
from  { transform: translate(0, 0); }
to { transform: translate(-100%, 0); }
`;

export const Article = styled("div")`
  display: inline-block;
  padding-left: 100%;
  padding-bottom: 20px;
  animation: ${marquee} 15s linear infinite;
`;
