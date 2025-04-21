import { JSX, useState } from "react";
import { Button } from "@mui/material";
import { LogoDev } from "@mui/icons-material";
import { PATH } from "../../constants";
import Modal from "../Modal";
import { useAppSelector } from "../../hooks/useRedux";
import * as Styled from "./styles";
import ProjectForm from "../ProjectForm";
import useAuth from "../../hooks/useAuth";

function Header(): JSX.Element {
  const { handleSignOut, isLoading } = useAuth();
  const { isLogged } = useAppSelector((state) => state.user);

  const [isModal, setIsModal] = useState(false);

  const handleCloseModal = (): void => {
    setIsModal(false);
  };

  const handleOpenModal = (): void => {
    setIsModal(true);
  };

  return (
    <>
      <Styled.Header>
        <Styled.Link to={PATH.HOME}>
          <LogoDev fontSize="large" />
        </Styled.Link>

        {isLogged ? (
          <Styled.Actions>
            <Button onClick={handleOpenModal}>New Project</Button>

            <Button onClick={handleSignOut} loading={isLoading}>
              Log out
            </Button>
          </Styled.Actions>
        ) : null}
      </Styled.Header>

      <Modal
        isOpen={isModal}
        handleClose={handleCloseModal}
        title="Add a new project"
      >
        <ProjectForm handleCloseModal={handleCloseModal} />
      </Modal>
    </>
  );
}

export default Header;
