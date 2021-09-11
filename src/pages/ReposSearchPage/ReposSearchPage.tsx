import React, { useState } from 'react';

import Button from '@components/Button';
import Input from '@components/Input';
import RepoTile from '@components/RepoTile';
import SearchIcon from '@components/SearchIcon';

import styles from './ReposSearchPage.module.scss';
import RepoBranchesDrawer from '@/components/RepoBranchesDrawer';
import { useReposContext } from '@/contexts/ReposContext';
import { RepoItem } from '@/store/GitHubStore/types';

const ReposSearchPage: React.FC = () => {
    const [searchValue, setSearchValue] = useState<string>('');
    const [selectedRepo, setSelectedRepo] = useState<RepoItem | null>(null);
    const [emptyPageText, setEmptyPageText] = useState<string>('Вы еще ничего не искали!');

    const { list, isLoading, load } = useReposContext();

    const search = async () => {
        await load(searchValue);
        if (!list.length) {
            setEmptyPageText('По такому запросу ничего не найдено!');
        }
    };

    const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>): void => setSearchValue(e.target.value);

    const handleKeyUp = async (e: React.KeyboardEvent): Promise<void> => {
        if (e.key === 'Enter' || e.keyCode === 13) {
            search();
        }
    };

    const handleSearchClick = async (e: React.MouseEvent): Promise<void> => search();

    const handleRepoTileClick = (e: React.MouseEvent): void => {
        const selectedRepoID = e.currentTarget.getAttribute('data-id');
        if (selectedRepoID) {
            setSelectedRepo(list.find((repo) => repo.id === parseInt(selectedRepoID)) || null);
        }
    };

    const onDrawerClose = () => setSelectedRepo(null);

    const reposContent = list.length ? (
        <div>
            <div className={styles['repos-page__repos-list']}>
                {list.map((repo) => (
                    <RepoTile repoItem={repo} key={repo.id} onClick={handleRepoTileClick} />
                ))}
            </div>
            <RepoBranchesDrawer selectedRepo={selectedRepo} onClose={onDrawerClose} />
        </div>
    ) : (
        <h1 className={styles['empty-page-text']}>{emptyPageText}</h1>
    );

    return (
        <main className={styles['repos-page']}>
            <div className={styles['repos-page__search-row']}>
                <Input
                    placeholder="Введите название организации"
                    value={searchValue}
                    onChange={handleSearchInput}
                    onKeyUp={handleKeyUp}
                />
                <Button disabled={isLoading} onClick={handleSearchClick}>
                    <SearchIcon />
                </Button>
            </div>
            {reposContent}
        </main>
    );
};

export default ReposSearchPage;
