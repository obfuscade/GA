import { Modal as MUIModal } from "@mui/material";
import { JSX, memo, ReactNode } from "react";
import * as Styled from "./styles";

type Props = {
  isOpen: boolean;
  title: string;
  handleClose: () => void;
  children: ReactNode;
};

function Modal({ isOpen, title, children, handleClose }: Props): JSX.Element {
  return (
    <MUIModal open={isOpen} onClose={handleClose} disableRestoreFocus>
      <Styled.Wrapper>
        <Styled.Title variant="h2">{title}</Styled.Title>

        {children}
      </Styled.Wrapper>
    </MUIModal>
  );
}

export default memo(Modal);
