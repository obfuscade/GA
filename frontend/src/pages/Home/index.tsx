import { JSX, useCallback, useEffect, useRef, useState } from "react";
import Items from "../../components/Items";
import { getProjects } from "../../libs/http/projects";
import * as Styled from "./styles";
import { AxiosError } from "axios";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { addProjects } from "../../store/slices/projectSlice";
import useErrorHandling from "../../hooks/useErrorHandling";

function Home(): JSX.Element {
  const dispatch = useAppDispatch();
  const { projects } = useAppSelector((state) => state.project);
  const { errorCall } = useErrorHandling();
  const [lastItemId, setLastItemId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const isInitialLoad = useRef(true);

  const fetchMoreData = useCallback(async (): Promise<void> => {
    setIsLoading(true);

    try {
      const { data, hasMore } = await getProjects({ lastItemId, limit: 30 });
      dispatch(addProjects(data));
      setLastItemId(data[data?.length - 1]?.id);
      setHasMore(hasMore);
    } catch (error) {
      errorCall(error as AxiosError<{ message: string }>);
    } finally {
      setIsLoading(false);
    }
  }, [dispatch, errorCall, lastItemId]);

  useEffect(() => {
    if (isInitialLoad.current) {
      fetchMoreData();
      isInitialLoad.current = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Styled.Section>
      <Items
        isLoading={isLoading}
        fetchMoreData={fetchMoreData}
        items={projects}
        hasMore={hasMore}
      />
    </Styled.Section>
  );
}

export default Home;
