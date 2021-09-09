import React from 'react';

import Avatar from '@components/Avatar';
import StarIcon from '@components/StarIcon';

import styles from './RepoTile.module.scss';
import { RepoItem } from '@/store/GitHubStore/types';
import { formatUpdatedAtField } from '@/utils/formatUpdatedAtField';

export type RepoItemProps = {
    repoItem: RepoItem;
    onClick: (e: React.MouseEvent) => void;
};

const RepoTile: React.FC<RepoItemProps> = ({ repoItem, onClick }) => {
    return (
        <div className={styles['git-repo-tile']} onClick={onClick}>
            <Avatar src={repoItem.owner.avatar_url} alt={repoItem.name} letter={repoItem.name[0]} />
            <div className={styles['git-repo-tile__info-block']}>
                <h3 className={styles['git-repo-tile__title']}>
                    <a
                        href={repoItem.html_url}
                        className={styles['git-repo-tile__title-link']}
                        target="_blank"
                        rel="noreferrer"
                    >
                        {repoItem.name}
                    </a>
                </h3>
                <a
                    href={repoItem.owner.html_url}
                    className={styles['git-repo-tile__org-link']}
                    target="_blank"
                    rel="noreferrer"
                >
                    {repoItem.owner.login}
                </a>
                <div className={styles['git-repo-tile__bottom-info']}>
                    <div className={styles['git-repo-tile__stars']}>
                        <StarIcon />
                        <span className={styles['git-repo-tile__stars-count']}>{repoItem.stargazers_count}</span>
                    </div>
                    <div className={styles['git-repo-tile__updated']}>
                        Updated {formatUpdatedAtField(repoItem.updated_at)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default React.memo(RepoTile);
