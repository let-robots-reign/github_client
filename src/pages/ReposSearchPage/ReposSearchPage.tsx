import React, { useState } from 'react';

import Button from '@components/Button';
import Input from '@components/Input';
import RepoTile, { RepoItem } from '@components/RepoTile';
import SearchIcon from '@components/SearchIcon';

import classes from './ReposSearchPage.module.scss';

const ReposSearchPage: React.FC = () => {
    const [searchValue, setSearchValue] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [repos, setRepos] = useState<RepoItem[]>([]);

    const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>): void =>
        setSearchValue(e.target.value);

    const handleSearchClick = (e: React.MouseEvent): void => {
        if (isLoading) {
            return;
        }
        setIsLoading(true);
        const repos: RepoItem[] = [
            {
                title: 'Example',
                orgName: 'kts',
                updatedAt: '01.09',
                stars: 123,
            },
            {
                title: 'kts-studio-frontend-and-very-long-name',
                orgName: 'kts-studio',
                updatedAt: '01.09',
                stars: 123,
            },
            {
                title: 'oge_eng_web',
                orgName: 'edumage',
                updatedAt: '01.09',
                stars: 500,
            },
        ];
        setRepos(repos);
        setIsLoading(false);
    };

    const handleRepoTileClick = (repo: RepoItem): void => {
        // eslint-disable-next-line no-console
        console.log(`clicked on repo ${repo.title}`);
    };

    return (
        <main className={classes['repos-page']}>
            <div className={classes['repos-page__search-row']}>
                <Input
                    placeholder="Введите название организации"
                    value={searchValue}
                    onChange={handleSearchInput}
                ></Input>
                <Button disabled={isLoading} onClick={handleSearchClick}>
                    <SearchIcon
                        fillColor={classes['searchIconColor']}
                    ></SearchIcon>
                </Button>
            </div>
            <div className={classes['repos-page__repos-list']}>
                {repos.map((repo) => (
                    <RepoTile
                        repoItem={repo}
                        key={repo.title}
                        onClick={() => handleRepoTileClick(repo)}
                    ></RepoTile>
                ))}
            </div>
        </main>
    );
};

export default ReposSearchPage;
