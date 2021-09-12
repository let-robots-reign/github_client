import { useState } from 'react';

import { ReposContext } from './ReposContext';
import GitHubStore from '@/store/GitHubStore';
import { RepoItem } from '@/store/GitHubStore/types';

const gitHubStore = new GitHubStore();

const Provider = ReposContext.Provider;

const ReposProvider: React.FC = ({ children }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [repos, setRepos] = useState<RepoItem[]>([]);

    const performSearch = async (orgName: string, page: number): Promise<void> => {
        if (isLoading) {
            return;
        }
        setIsLoading(true);

        const response = await gitHubStore.getOrganizationReposList({
            organizationName: orgName,
            page,
        });
        if (response.success) {
            if (page === 1) {
                setRepos(response.data);
            } else {
                setRepos([...repos, ...response.data]);
            }
        }
        setIsLoading(false);
    };

    return (
        <Provider
            value={{
                list: repos,
                isLoading,
                load: async (orgName: string, page: number) => await performSearch(orgName, page),
            }}
        >
            {children}
        </Provider>
    );
};

export default ReposProvider;
