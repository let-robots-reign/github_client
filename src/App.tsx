import '@styles/theme.scss';
import 'antd/dist/antd.css';

import { BrowserRouter, Route, Redirect } from 'react-router-dom';

import ReposSearchPage from './pages/ReposSearchPage';
import ReposProvider from '@/contexts/ReposContext';

function App() {
    return (
        <ReposProvider>
            <div className="App">
                <BrowserRouter>
                    <Route exact path="/repos" component={ReposSearchPage} />
                    <Redirect to="/repos" />
                </BrowserRouter>
            </div>
        </ReposProvider>
    );
}

export default App;
