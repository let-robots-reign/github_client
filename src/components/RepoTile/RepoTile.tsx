import React from 'react';

import Avatar from '@components/Avatar';
import StarIcon from '@components/StarIcon';

import classes from './RepoTile.module.scss';

export type RepoItem = {
    title: string;
    orgName: string;
    avatarSrc?: string;
    stars: number;
    updatedAt: string;
};

export type RepoItemProps = {
    repoItem: RepoItem;
    onClick?: (e: React.MouseEvent) => void;
};

const RepoTile: React.FC<RepoItemProps> = ({ repoItem, onClick }) => {
    return (
        <div className={classes['git-repo-tile']} onClick={onClick}>
            <Avatar
                src={repoItem.avatarSrc}
                alt={repoItem.title}
                letter={repoItem.title[0]}
            ></Avatar>
            <div className={classes['git-repo-tile__info-block']}>
                <h3 className={classes['git-repo-tile__title']}>
                    <a
                        href="/"
                        className={classes['git-repo-tile__title-link']}
                    >
                        {repoItem.title}
                    </a>
                </h3>
                <a href="/" className={classes['git-repo-tile__org-link']}>
                    {repoItem.orgName}
                </a>
                <div className={classes['git-repo-tile__bottom-info']}>
                    <div className={classes['git-repo-tile__stars']}>
                        <StarIcon
                            fillColor={classes['starIconColor']}
                        ></StarIcon>
                        <span className={classes['git-repo-tile__stars-count']}>
                            {repoItem.stars}
                        </span>
                    </div>
                    <div className={classes['git-repo-tile__updated']}>
                        Updated at {repoItem.updatedAt}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RepoTile;
