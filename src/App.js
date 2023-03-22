import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import News from './Components/News/News';
import Setting from './Components/Setting/Setting';
import DialogsContainer from './Components/Dialogs/DialogsContainer';
import NavBarContainer from './Components/NavBar/NavBarContainer';
import UsersContainer from './Components/Users/UsersContainer';
import MusicContainer from './Components/Music/MusicContainer';
import ProfileContainer from './Components/Profile/ProfileContainer';
import HeaderContainer from './Components/Header/HeaderContainer';

function App() {
    return (
        <BrowserRouter>
            <div className='App'>
                <HeaderContainer className='header' />
                <div className='content'>
                    <NavBarContainer className='navBar' />
                    {/* <Profile className='profile'/> */}
                    <Routes>
                        <Route path='profile' element={<ProfileContainer />}>
                            <Route
                                path=':userId'
                                element={<ProfileContainer />}
                            />
                        </Route>
                        <Route
                            path='/dialogs/*'
                            element={<DialogsContainer />}
                        />
                        <Route path='/users/*' element={<UsersContainer />} />
                        <Route path='news' element={<News />} />
                        <Route path='music' element={<MusicContainer />} />
                        <Route path='setting' element={<Setting />} />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
