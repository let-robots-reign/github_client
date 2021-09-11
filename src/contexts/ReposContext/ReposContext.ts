import { createContext, useContext } from 'react';

import { RepoItem } from '@/store/GitHubStore/types';

type ReposContextParams = {
    list: RepoItem[];
    isLoading: boolean;
    load: (orgName: string) => Promise<void>;
};

export const ReposContext = createContext<ReposContextParams>({
    list: [],
    isLoading: false,
    load: async (orgName: string) => {},
});

export const useReposContext = () => useContext(ReposContext);
