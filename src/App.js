import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Components/Header/Header';
import Profile from './Components/Profile/Profile';
import News from './Components/News/News';
import Music from './Components/Music/Music';
import Setting from './Components/Setting/Setting';
import DialogsContainer from './Components/Dialogs/DialogsContainer';
import NavBarContainer from './Components/NavBar/NavBarContainer';

function App({ store }) {
    return (
        <BrowserRouter>
            <div className='App'>
                <Header className='header' />
                <div className='content'>
                    <NavBarContainer className='navBar' store={store} />
                    {/* <Profile className='profile'/> */}
                    <Routes>
                        <Route
                            path='profile'
                            element={<Profile store={store} />}
                        />
                        <Route
                            path='/dialogs/*'
                            element={<DialogsContainer store={store} />}
                        />
                        <Route path='news' element={<News />} />
                        <Route path='music' element={<Music />} />
                        <Route path='setting' element={<Setting />} />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
