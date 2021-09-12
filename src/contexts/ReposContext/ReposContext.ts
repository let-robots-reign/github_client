import { createContext, useContext } from 'react';

import { RepoItem } from '@/store/GitHubStore/types';

type ReposContextParams = {
    list: RepoItem[];
    isLoading: boolean;
    isChunkEmpty: boolean;
    load: (orgName: string, page: number) => Promise<void>;
};

export const ReposContext = createContext<ReposContextParams>({
    list: [],
    isLoading: false,
    isChunkEmpty: true,
    load: async (orgName: string, page: number) => {},
});

export const useReposContext = () => useContext(ReposContext);
