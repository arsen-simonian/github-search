import styles from './styles.module.sass';
import { AlertOctagon } from 'lucide-react';

const NotFound = () => {
  return (
    <div className={styles.not_found}>
      <AlertOctagon />

      <h2>
        Repository is not found!
      </h2>
    </div>
  )
}

export default NotFound