import '@styles/theme.scss';
import 'antd/dist/antd.css';
import { useState, createContext } from 'react';

import { BrowserRouter, Route, Redirect } from 'react-router-dom';

import ReposSearchPage from './pages/ReposSearchPage';
import GitHubStore from './store/GitHubStore';
import { RepoItem } from './store/GitHubStore/types';

const gitHubStore = new GitHubStore();

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

const Provider = ReposContext.Provider;

function App() {
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
            <div className="App">
                <BrowserRouter>
                    <Route exact path="/repos" component={ReposSearchPage} />
                    <Redirect to="/repos" />
                </BrowserRouter>
            </div>
        </Provider>
    );
}

export default App;
