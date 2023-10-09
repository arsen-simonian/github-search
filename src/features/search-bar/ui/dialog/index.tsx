import { Search, XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { debounce } from 'lodash';
import { useNavigate } from 'react-router-dom';

import DialogWrapper from '../../../../components/dialog-wrapper'
import Input from '../../../../components/input';
import Button, { ButtonVariant } from '../../../../components/button';

import { useAppDispatch, useAppSelector } from '../../../../store';
import { setSearch } from '../../../../store/slices/search';

import styles from './styles.module.sass';
import useUpdate from '../../../../hooks/use-update';

export type SearchBarDialogProps = {
  onClose: () => void
}

const SearchBarDialog: React.FC<SearchBarDialogProps> = ({ onClose }) => {
  const search = useAppSelector(state => state.search);
  const recentlyViewed = useAppSelector(state => state.recentlyViewed);
  const [searchValue, setSearchValue] = useState(search.value);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  }

  const onClearHandler = () => {
    setSearchValue('');

    if(!searchValue) {
      onClose();
    }
  }

  const onSelectHandler = (value: string) => {
    dispatch(setSearch(value));

    onClose();
  }

  const onViewHandler = (id: number) => {
    navigate(`/details/${id}`);

    onClose();
  }

  useUpdate(() => {
    const debounced = debounce(() => {
      dispatch(setSearch(searchValue));
    }, 400);

    debounced();

    return () => {
      debounced.cancel();
    }
  }, [dispatch, searchValue]);


  useEffect(() => {
    navigate('/')
  }, [navigate, search.value])

  return (
    <DialogWrapper>
      <div className={styles.search_bar_dialog}>
        <div className={styles.search_bar_dialog__content}>
          <Input
            autoFocus
            value={searchValue}
            onChange={onChangeHandler}
            placeholder='Search for repositories'
            startIcon={<Search />}
            endIcon={<XCircle onClick={onClearHandler} />}
            className={styles.search_bar_dialog__input}
          />
          <h3 className={styles.title_3}>Recent searches</h3>
          {
            search.recentlySearched.length ? (
              <ul className={styles.search_bar_dialog__list}>
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
          <hr className={styles.bg_color_gray_light} />
          <h3 className={styles.title_3}>Recently viewed</h3>
          {
            recentlyViewed.values.length ? (
              <ul className={styles.search_bar_dialog__list}>
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
          <hr className={styles.bg_color_gray_light} />
          <div className={styles.search_bar_dialog__actions}>
            <Button onClick={onClose} variant={ButtonVariant.Secondary}>Close</Button>
          </div>
        </div>
      </div>
    </DialogWrapper>
  )
}


export default SearchBarDialog
