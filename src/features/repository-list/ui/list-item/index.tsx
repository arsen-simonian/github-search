import React from 'react'
import { GitFork, Star } from 'lucide-react'

import { GitHubRepository } from '../../../../api/types'
import Button, { ButtonVariant } from '../../../../components/button'

import styles from './styles.module.sass'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addViewed } from '../../../../store/slices/recently-viewed'

const ListItem: React.FC<GitHubRepository> = ({
  full_name,
  owner,
  description,
  language,
  stargazers_count,
  forks,
  id
}) => {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const onView = () => {
    dispatch(addViewed({ id, name: full_name }));

    navigate(`/details/${id}`);
  }

  return (
    <div className={styles.repository_list_item}>
      <div className={styles.repository_list_item__header}>
        {owner.avatar_url && <img src={owner.avatar_url} alt={owner.login} />}
        <Button
          onClick={onView}
          variant={ButtonVariant.Link}
        >
          {full_name}
        </Button>

        <Button 
          onClick={onView}
          className={styles.repository_list_item__header__view_btn}>
          View Details
        </Button>
      </div>
      <p>{description}</p>
      <p>{language}</p>
      <div className={styles.repository_list_item__info}>
          <Star />
          <span>{stargazers_count}</span>
        <GitFork />
        <span>{forks}</span>
        </div>
    </div>
  )
}

export default ListItem