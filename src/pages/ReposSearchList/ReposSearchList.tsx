import React from 'react';

import Button from '@components/Button';
import Input from '@components/Input';
import RepoTile from '@components/RepoTile';
import SearchIcon from '@components/SearchIcon';

import classes from './ReposSearchList.module.scss';

export type ReposSearchListProps = {};

const ReposSearchList: React.FC<ReposSearchListProps> = ({}) => {
    return (
        <main className={classes['repos-page']}>
            <div className={classes['repos-page__search-row']}>
                <Input
                    placeholder="Введите название организации"
                    value=""
                ></Input>
                <Button>
                    <SearchIcon
                        fillColor={classes['searchIconColor']}
                    ></SearchIcon>
                </Button>
            </div>
            <div className={classes['repos-page__repos-list']}>
                <RepoTile
                    repoItem={{
                        title: 'Example',
                        orgName: 'kts',
                        updatedAt: '01.09',
                        stars: 123,
                    }}
                ></RepoTile>
            </div>
        </main>
    );
};

export default ReposSearchList;
