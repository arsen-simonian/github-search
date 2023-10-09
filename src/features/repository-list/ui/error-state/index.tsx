import React from 'react'
import { ServerCrash } from 'lucide-react'

import styles from './styles.module.sass'; 
import Button from '../../../../components/button';

export type ErrorStateProps = {
  message?: string
  reset?: () => void
} 

const ErrorState: React.FC<ErrorStateProps> = ({ message, reset }) => {
  return (
    <div className={styles.error_state}>
      <ServerCrash />
      <h2>{message || 'Something went wrong!'}</h2>
      <Button onClick={reset}>
        Refresh
      </Button>
    </div>
  )
}

export default ErrorState