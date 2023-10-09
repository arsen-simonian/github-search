import { useNavigate, useParams } from "react-router-dom";

import { useGetRepositoriesQuery } from "../../../../api"
import Loader from "../../../../components/loader";
import Pagination from "../../../../components/pagination";
import { useAppDispatch, useAppSelector } from "../../../../store";
import EmptyState, { EmptyStatePageState } from "../empty-state";
import ListItem from "../list-item";

import styles from './styles.module.sass';
import ErrorState from "../error-state";
import { isFetchBaseQueryErrorType } from "../../../../utils";
import { setSearch } from "../../../../store/slices/search";
import { useEffect } from "react";

const RepositoryList = () => {
  const search = useAppSelector(state => state.search);

  const dispatch = useAppDispatch();

  const { page } = useParams(); 

  const navigate = useNavigate();

  const { data, isLoading, isFetching, error, refetch } = useGetRepositoriesQuery({
    page: Number(page) || 1,
    perPage: 10,
    query: search.value,
  }, {
    skip: !search.value,
  });

  const refreshHandler = () => {
    dispatch(setSearch(''));
    refetch()
  }

  useEffect(() => {
    !search.value && navigate('/')
  }, [navigate, search.value])
  
  if (error && isFetchBaseQueryErrorType(error)) {
    return <ErrorState reset={refreshHandler} />
  }

  if (isLoading || isFetching) {
    return <Loader />
  }

  if (!search.value || !data || (data && !data.items.length) && (!isLoading && !isFetching)) {
    return <EmptyState 
      state={
        (!data?.items.length && search.recentlySearched.length) 
          ? EmptyStatePageState.NotFound 
          : EmptyStatePageState.Empty} 
        />
  }

  return (
    <div className={styles.repository_list}>
      {
        data.items.map(item => (<ListItem {...item} key={item.id} />))
      }
      <Pagination
        currentPage={Number(page) || 1}
        itemsPerPage={10}
        totalItems={data.total_count || 0}
        onPageChange={(page) => navigate(`../${page}`)}
      />
    </div>
  )
}

export default RepositoryList