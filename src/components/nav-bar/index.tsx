import React from 'react';
import { Github } from 'lucide-react';

import styles from './styles.module.sass';

export type NavBarProps = {
  children?: React.ReactElement | React.ReactElement[]
}

const NavBar:React.FC<NavBarProps> = ({ children }) => {
  return (
    <nav className={styles.nav_bar}>
      <span className={styles.nav_bar__logo}>
        <Github />
      </span>
      {children}
    </nav>
  )
}

export default NavBar