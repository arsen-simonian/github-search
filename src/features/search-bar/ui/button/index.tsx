import { Search } from 'lucide-react';

import Button from '../../../../components/button';
import { registerDialog } from '../../../../atoms/global-dialogs';
import SearchBarDialog from '../dialog';

import styles from './styles.module.sass'
import useKeyDown from '../../../../hooks/use-key-down';

const SearchBarButton = () => {

  const openSearchBar = () => {
    registerDialog({
      Component: SearchBarDialog,
      props: {}
    })
  }

  useKeyDown('/', () => {
    setTimeout(openSearchBar, 50) // this way "/" will not be typed in input 
  });

  return (
    <Button onClick={openSearchBar} className={styles.search_bar_button}>
      <Search fontSize={1} />
      <span>
        Type <kbd>/</kbd> to search
      </span>
    </Button>
  )
}

export default SearchBarButton;