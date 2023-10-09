import styles from './styles.module.sass';
import { useParams } from 'react-router-dom';
import { useGetRepositoryByIdQuery } from '../../../../api';
import Button, { ButtonVariant } from '../../../../components/button';
import { BadgeAlert, Eye, FileCode, GitBranch, Github, Star } from 'lucide-react';
import NotFound from '../not-found';
import Loader from '../../../../components/loader';
import ErrorState from '../error';
import clsx from 'clsx';

const RepositoryDetails = () => {
  const { id } = useParams();

  const { data, isLoading, isFetching, error } = useGetRepositoryByIdQuery({
    id: id || '',
  }, {
    skip: !id
  });

  const viewGithub = () => {
    window.open(`https://github.com/${data?.full_name}`, 'blank')
  }

  if (isFetching || isLoading) {
    return <Loader />
  }

  if (!isFetching && !isLoading && !data) {
    return <NotFound />
  }

  if (error) {
    return <ErrorState />
  }

  return (
    <div
      className={styles.repository_details}
    >
      <div className={styles.repository_details__title}>
        <img className={styles.repository_details__owner_avatar} src={data?.owner.avatar_url} alt={data?.owner.login} />
        <h2>
          {data?.full_name}
        </h2>
        <Button onClick={viewGithub} title='View Github' className={styles.repository_details__title__btn}>
          <Github />
        </Button>
      </div>

      <div className={styles.repository_details__section}>
        <h2 className={styles.title_3}>
          About
        </h2>
        <div className={styles.repository_details__section__row}>
          <span><GitBranch /></span>
          <p>
            Branch: {data?.default_branch}
          </p>
        </div>
        <div className={styles.repository_details__section__row}>
          <span><BadgeAlert /></span>
          <p>
            Issues: {data?.open_issues}
          </p>
        </div>
        <div className={styles.repository_details__section__row}>
          <span><Eye /></span>
          <p>
            Watchers: {data?.watchers}
          </p>
        </div>
        <div className={styles.repository_details__section__row}>
          <span><Star /></span>
          <p>
            Stars: {data?.stargazers_count}
          </p>
        </div>
      </div>
      <div className={styles.repository_details__section}>
        <h2 className={styles.title_3}>
          Owner
        </h2>
        <div className={styles.repository_details__section__row}>
          <img className={styles.repository_details__owner_avatar} src={data?.owner.avatar_url} alt={data?.owner.login} />
          <Button
            onClick={viewGithub}
            variant={ButtonVariant.Link}
          >
            {data?.owner.login}
          </Button>
        </div>
      </div>

      <div className={styles.repository_details__section}>
        <h2 className={styles.title_3}>
          Language
        </h2>
        <div className={styles.repository_details__section__row}>
          <span><FileCode /></span>
          <p>
            {data?.language}
          </p>
        </div>
      </div>
      <div className={
        clsx(styles.repository_details__section, styles.repository_details__section_full)
      }>
        {data?.description && (
          <h2 className={styles.title_3}>
            Description
          </h2>
        )}
        <div className={styles.repository_details__section__row}>
          <p>
            {data?.description}
          </p>
        </div>
      </div>
    </div>
  )
}

export default RepositoryDetails