import { XCircle } from 'lucide-react';
import styles from './styles.module.sass';

const ErrorState = () => {
  return (
    <div className={styles.error_state}>
      <XCircle /> 

      <h2>
        Something went wrong!
      </h2>
    </div>
  )
}

export default ErrorState