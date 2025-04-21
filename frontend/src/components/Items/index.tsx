import { CircularProgress, Grid2 } from "@mui/material";
import { JSX, memo, useCallback, useEffect, useRef } from "react";
import { IProject } from "../../types";
import Item from "../Item";
import { SCROLL_THRESHOLD } from "../../constants";
import * as Styled from "./styles";

type Props = {
  fetchMoreData: () => void;
  items: IProject[];
  hasMore: boolean;
  isLoading: boolean;
};

function Items({
  fetchMoreData,
  items,
  hasMore,
  isLoading,
}: Props): JSX.Element {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleScroll = useCallback((): void => {
    if (!hasMore || isLoading) {
      return;
    }

    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollTop + windowHeight >= documentHeight - SCROLL_THRESHOLD) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        fetchMoreData();
      }, 300);
    }
  }, [fetchMoreData, hasMore, isLoading]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [handleScroll]);

  return (
    <>
      <Grid2 container spacing={{ xs: 2 }} columns={12}>
        {items.map((item) => (
          <Grid2 key={item.id} size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}>
            <Item item={item} />
          </Grid2>
        ))}
      </Grid2>

      {!isLoading && !items.length ? (
        <Styled.EmptyTitle variant="h1">Empty</Styled.EmptyTitle>
      ) : null}

      {isLoading ? (
        <Styled.SpinnerWrapper>
          <CircularProgress />
        </Styled.SpinnerWrapper>
      ) : null}
    </>
  );
}

export default memo(Items);
