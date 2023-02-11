import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Dialogs from './Components/Dialogs/Dialogs';
import Header from './Components/Header/Header';
import NavBar from './Components/NavBar/NavBar';
import Profile from './Components/Profile/Profile';
import News from './Components/News/News';
import Music from './Components/Music/Music';
import Setting from './Components/Setting/Setting';

function App({ AppState }) {
    return (
        <BrowserRouter>
            <div className='App'>
                <Header className='header' />
                <div className='content'>
                    <NavBar className='navBar' state={AppState.siteBar} />
                    {/* <Profile className='profile'/> */}
                    <Routes>
                        <Route
                            path='profile'
                            element={<Profile state={AppState.profilePage} />}
                        />
                        <Route
                            path='/dialogs/*'
                            element={<Dialogs state={AppState.dialogsPage} />}
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
