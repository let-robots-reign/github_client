import React, { useState } from 'react';

import Button from '@components/Button';
import Input from '@components/Input';
import RepoTile from '@components/RepoTile';
import SearchIcon from '@components/SearchIcon';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useHistory } from 'react-router-dom';

import styles from './ReposSearchPage.module.scss';
import { useReposContext } from '@/contexts/ReposContext';

const ReposSearchPage: React.FC = () => {
    const [searchValue, setSearchValue] = useState<string>('');
    const [emptyPageText, setEmptyPageText] = useState<string>('Вы еще ничего не искали!');
    const [currentPage, setCurrentPage] = useState<number>(1);

    const history = useHistory();

    const { list, isLoading, load } = useReposContext();

    const startSearch = async () => {
        setCurrentPage(1);
        await search(1);
    };

    const search = async (page: number = 0) => {
        // загрузка следующей страницы для infinite scroll
        setEmptyPageText('Идет поиск...');
        await load(searchValue, page ? page : currentPage);
        setCurrentPage((prevPage) => prevPage + 1);
        if (!list.length) {
            setEmptyPageText('По такому запросу ничего не найдено!');
        }
    };

    const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>): void => setSearchValue(e.target.value);

    const handleKeyUp = async (e: React.KeyboardEvent): Promise<void> => {
        if (e.key === 'Enter' || e.keyCode === 13) {
            startSearch();
        }
    };

    const handleSearchClick = async (e: React.MouseEvent): Promise<void> => startSearch();

    const handleRepoTileClick = (e: React.MouseEvent): void => {
        const selectedRepoID = e.currentTarget.getAttribute('data-id');
        if (selectedRepoID) {
            history.push(`/repos/${selectedRepoID}`);
        }
    };

    const reposContent = list.length ? (
        <InfiniteScroll
            dataLength={list.length}
            next={search}
            hasMore={!!list.length}
            loader={<h2>Loading...</h2>}
            endMessage={
                <p style={{ textAlign: 'center' }}>
                    <b>Yay! You have seen it all</b>
                </p>
            }
        >
            <div>
                <div className={styles['repos-page__repos-list']}>
                    {list.map((repo) => (
                        <RepoTile repoItem={repo} key={repo.id} onClick={handleRepoTileClick} />
                    ))}
                </div>
            </div>
        </InfiniteScroll>
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
