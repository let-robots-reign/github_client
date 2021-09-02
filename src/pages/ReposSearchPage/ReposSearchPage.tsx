import React, { useState } from 'react';

import Button from '@components/Button';
import Input from '@components/Input';
import RepoTile, { RepoItem } from '@components/RepoTile';
import SearchIcon from '@components/SearchIcon';

import styles from './ReposSearchPage.module.scss';
import GitHubStore from '@/store/GitHubStore';

const ReposSearchPage: React.FC = () => {
    const [searchValue, setSearchValue] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [repos, setRepos] = useState<RepoItem[]>([]);

    const gitHubStore = new GitHubStore();

    const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>): void =>
        setSearchValue(e.target.value);

    const handleSearchClick = async (e: React.MouseEvent): Promise<void> => {
        if (isLoading) {
            return;
        }
        setIsLoading(true);
        const response = await gitHubStore.getOrganizationReposList({
            organizationName: searchValue,
        });
        if (response.success) {
            const res: RepoItem[] = response.data.map((item: any) => {
                return {
                    id: item.id,
                    title: item.name,
                    orgName: searchValue,
                    stars: item.stargazers_count,
                    updatedAt: item.updated_at,
                };
            });
            setRepos(res);
        }
        setIsLoading(false);
    };

    const handleRepoTileClick = (repo: RepoItem): void => {
        // eslint-disable-next-line no-console
        console.log(`clicked on repo ${repo.title}`);
    };

    return (
        <main className={styles['repos-page']}>
            <div className={styles['repos-page__search-row']}>
                <Input
                    placeholder="Введите название организации"
                    value={searchValue}
                    onChange={handleSearchInput}
                />
                <Button disabled={isLoading} onClick={handleSearchClick}>
                    <SearchIcon fillColor={styles['searchIconColor']} />
                </Button>
            </div>
            <div className={styles['repos-page__repos-list']}>
                {repos.map((repo) => (
                    <RepoTile
                        repoItem={repo}
                        key={repo.id}
                        onClick={() => handleRepoTileClick(repo)}
                    />
                ))}
            </div>
        </main>
    );
};

export default ReposSearchPage;
