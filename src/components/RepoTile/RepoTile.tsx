import React from 'react';

import Avatar from '@components/Avatar';
import StarIcon from '@components/StarIcon';

import styles from './RepoTile.module.scss';
import { RepoItem } from '@/store/GitHubStore/types';
import { formatUpdatedAtField } from '@/utils/formatUpdatedAtField';

export type RepoItemProps = {
    repoItem: RepoItem;
    onClick?: (e: React.MouseEvent) => void;
};

const RepoTile: React.FC<RepoItemProps> = ({ repoItem, onClick }) => {
    return (
        <div className={styles['git-repo-tile']} onClick={onClick}>
            <Avatar src={repoItem.owner.avatar_url} alt={repoItem.title} letter={repoItem.title[0]} />
            <div className={styles['git-repo-tile__info-block']}>
                <h3 className={styles['git-repo-tile__title']}>
                    <a
                        href={repoItem.url}
                        className={styles['git-repo-tile__title-link']}
                        target="_blank"
                        rel="noreferrer"
                    >
                        {repoItem.title}
                    </a>
                </h3>
                <a
                    href={repoItem.owner.url}
                    className={styles['git-repo-tile__org-link']}
                    target="_blank"
                    rel="noreferrer"
                >
                    {repoItem.owner.login}
                </a>
                <div className={styles['git-repo-tile__bottom-info']}>
                    <div className={styles['git-repo-tile__stars']}>
                        <StarIcon fillColor={styles['starIconColor']} />
                        <span className={styles['git-repo-tile__stars-count']}>{repoItem.stars}</span>
                    </div>
                    <div className={styles['git-repo-tile__updated']}>
                        Updated {formatUpdatedAtField(repoItem.updatedAt)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RepoTile;
