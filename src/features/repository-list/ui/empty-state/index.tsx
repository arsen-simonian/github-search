/* eslint-disable react-refresh/only-export-components */
import { Github } from 'lucide-react';
import React from 'react';

import { SearchBarButton, SearchBarDialog } from '../../../search-bar';
import { useAppDispatch, useAppSelector } from '../../../../store';
import Button, { ButtonVariant } from '../../../../components/button';
import { registerDialog } from '../../../../atoms/global-dialogs';
import { setSearch } from '../../../../store/slices/search';

import styles from './styles.module.sass';
import { useNavigate } from 'react-router-dom';

export enum EmptyStatePageState {
  NotFound = 'not-found',
  Empty = 'empty',
}

export type EmptyStateProps = {
  state: EmptyStatePageState
}

const EmptyState: React.FC<EmptyStateProps> = ({ state }) => {
  const search = useAppSelector(state => state.search);
  const recentlyViewed = useAppSelector(state => state.recentlyViewed);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const onSelectHandler = (value: string) => {
    dispatch(setSearch(value));

    registerDialog({
      Component: SearchBarDialog,
      props: {}
    });
  }

  const onViewHandler = (id: number) => {
    navigate(`/details/${id}`);
  }

  let text: string;

  switch (state) {
    case EmptyStatePageState.Empty:
      text = 'No values searched yet';
      break;
    case EmptyStatePageState.NotFound:
      text = 'No values found';
      break;
    default:
      text = 'No values searched yet';
  }

  return (
    <div className={styles.empty_state}>
      <Github width={128} height={128} />
      <h2>
        {text}
      </h2>
      <SearchBarButton />


      <h3 className={styles.title_3}>Recent searches</h3>
      {
        search.recentlySearched.length ? (
          <ul>
            {
              search.recentlySearched.map(item => (
                <li key={item}>
                  <Button
                    variant={ButtonVariant.Link}
                    onClick={() => onSelectHandler(item)}
                  >
                    {item}
                  </Button>
                </li>
              ))
            }
          </ul>

        ) :
          <p className={styles.title_4}>No searches</p>
      }
      <h3 className={styles.title_3}>Recently viewed</h3>
      {
        recentlyViewed.values.length ? (
          <ul>
            {
              recentlyViewed.values.map(item => (
                <li key={item.id}>
                  <Button
                    variant={ButtonVariant.Link}
                    onClick={() => onViewHandler(item.id)}
                  >
                    {item.name}
                  </Button>
                </li>
              ))
            }
          </ul>

        ) :
          <p className={styles.title_4}>No views</p>
      }
    </div>
  )
}

export default EmptyState