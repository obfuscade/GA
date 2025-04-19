import { enqueueSnackbar } from "notistack";
import { signOut } from "../../libs/http/auth";
import { removeItemStorage } from "../../utils/localStorage";
import { Context } from "../Root";
import { JSX, useCallback, useContext } from "react";
import { Button } from "@mui/material";
import { LogoDev } from "@mui/icons-material";
import { PATH } from "../../constants";
import * as Styled from "./styles";

function Header(): JSX.Element {
  const { isUserLogged, setIsGlobalLoading, setIsUserLogged } =
    useContext(Context);

  const handleLogout = useCallback(async () => {
    setIsGlobalLoading(true);

    try {
      await signOut();
    } catch (error) {
      const { message = "Error" } = error as Error;
      enqueueSnackbar(message, { variant: "error" });
    } finally {
      removeItemStorage("isLogged");
      setIsUserLogged(false);
      setIsGlobalLoading(false);
    }
  }, [setIsGlobalLoading, signOut, removeItemStorage, setIsUserLogged]);

  return (
    <Styled.Header>
      <Styled.Link to={PATH.HOME}>
        <LogoDev fontSize="large" />
      </Styled.Link>

      {isUserLogged ? (
        <Styled.Actions>
          <Button onClick={handleLogout}>New</Button>

          <Button onClick={handleLogout}>Log out</Button>
        </Styled.Actions>
      ) : null}
    </Styled.Header>
  );
}

export default Header;
