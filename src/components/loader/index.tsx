import styles from './styles.module.sass'

const Loader = () => {
  return (
    <div className={styles.loader_wrapper}>
      <div className={styles.github_loader} />
    </div>
  )
}

export default Loader