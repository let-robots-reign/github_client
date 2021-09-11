import { useState } from 'react';

import { ReposContext } from './ReposContext';
import GitHubStore from '@/store/GitHubStore';
import { RepoItem } from '@/store/GitHubStore/types';

const gitHubStore = new GitHubStore();

const Provider = ReposContext.Provider;

const ReposProvider: React.FC = ({ children }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [repos, setRepos] = useState<RepoItem[]>([]);

    const performSearch = async (orgName: string): Promise<void> => {
        if (isLoading) {
            return;
        }
        setIsLoading(true);
        const response = await gitHubStore.getOrganizationReposList({
            organizationName: orgName,
        });
        if (response.success) {
            setRepos(response.data);
        } else {
            setRepos([]);
        }
        setIsLoading(false);
    };

    return (
        <Provider
            value={{
                list: repos,
                isLoading,
                load: async (orgName: string) => await performSearch(orgName),
            }}
        >
            {children}
        </Provider>
    );
};

export default ReposProvider;
