import React, { useState } from 'react';

import Button from '@components/Button';
import Input from '@components/Input';
import RepoTile from '@components/RepoTile';
import SearchIcon from '@components/SearchIcon';

import styles from './ReposSearchPage.module.scss';
import RepoBranchesDrawer from '@/components/RepoBranchesDrawer';
import GitHubStore from '@/store/GitHubStore';
import { RepoItem } from '@/store/GitHubStore/types';

const gitHubStore = new GitHubStore();

const ReposSearchPage: React.FC = () => {
    const [searchValue, setSearchValue] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [repos, setRepos] = useState<RepoItem[]>([]);
    const [selectedRepo, setSelectedRepo] = useState<RepoItem | null>(null);

    const [emptyPageText, setEmptyPageText] = useState<string>('Вы еще ничего не искали!');

    const performSearch = async (): Promise<void> => {
        if (isLoading) {
            return;
        }
        setIsLoading(true);
        const response = await gitHubStore.getOrganizationReposList({
            organizationName: searchValue,
        });
        if (response.success) {
            const repos: RepoItem[] = response.data.map((item: any) => {
                return {
                    id: item.id,
                    title: item.name,
                    stars: item.stargazers_count,
                    updatedAt: item.updated_at,
                    url: item.html_url,
                    owner: {
                        id: item.owner.id,
                        login: item.owner.login,
                        avatar_url: item.owner.avatar_url,
                        url: item.owner.html_url,
                    },
                };
            });
            setRepos(repos);
        } else {
            setRepos([]);
            setEmptyPageText('По такому запросу ничего не найдено!');
        }
        setIsLoading(false);
    };

    const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>): void => setSearchValue(e.target.value);

    const handleKeyUp = async (e: React.KeyboardEvent): Promise<void> => {
        if (e.key === 'Enter' || e.keyCode === 13) {
            performSearch();
        }
    };

    const handleSearchClick = async (e: React.MouseEvent): Promise<void> => performSearch();

    const handleRepoTileClick = (repo: RepoItem): void => setSelectedRepo(repo);

    const onDrawerClose = () => setSelectedRepo(null);

    const reposContent = repos.length ? (
        <div>
            <div className={styles['repos-page__repos-list']}>
                {repos.map((repo) => (
                    <RepoTile repoItem={repo} key={repo.id} onClick={() => handleRepoTileClick(repo)} />
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
