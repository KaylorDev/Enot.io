import styled from "@emotion/styled";

export const ItemsWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const TitleAndText = styled("div")`
  display: flex;
  flex-direction: column;
`;

type TTitleProps = {
  completed: boolean;
};

export const Title = styled("h3")<TTitleProps>`
  font-size: 24px;
  color: #f4f4f4;
  text-decoration: ${(props) => (props.completed ? "line-through" : "none")};
`;

export const Text = styled("div")`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
`;

type SeparatorProps = {
  color: string;
};

export const Separator = styled("div")<SeparatorProps>`
  border: 2px solid ${(props) => props.color};
  height: max-content;
  margin-right: 14px;
  height: 40px;
  border-radius: 2px;
`;
