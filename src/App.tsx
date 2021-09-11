import '@styles/theme.scss';
import 'antd/dist/antd.css';

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import RepoBranchesDrawer from './components/RepoBranchesDrawer';
import ReposSearchPage from './pages/ReposSearchPage';
import ReposProvider from '@/contexts/ReposContext';

function App() {
    return (
        <ReposProvider>
            <div className="App">
                <BrowserRouter>
                    <Switch>
                        <Route path="/repos/:id">
                            <>
                                <ReposSearchPage />
                                <RepoBranchesDrawer />
                            </>
                        </Route>
                        <Route path="/repos" component={ReposSearchPage} />
                        <Redirect to="/repos" />
                    </Switch>
                </BrowserRouter>
            </div>
        </ReposProvider>
    );
}

export default App;
