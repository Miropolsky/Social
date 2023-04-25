import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import News from './Components/News/News';
import Setting from './Components/Setting/Setting';
// import DialogsContainer from './Components/Dialogs/DialogsContainer';
import NavBarContainer from './Components/NavBar/NavBarContainer';
import UsersContainer from './Components/Users/UsersContainer';
import MusicContainer from './Components/Music/MusicContainer';
// import ProfileContainer from './Components/Profile/ProfileContainer';
import HeaderContainer from './Components/Header/HeaderContainer';
import Login from './Components/Login/Login';
import React, { Suspense } from 'react';
import { connect } from 'react-redux';
import { initializeApp } from './redux/appReducer';
import Preloader from './Components/common/preloader/Preloader';

const DialogsContainer = React.lazy(() =>
    import('./Components/Dialogs/DialogsContainer')
);
const ProfileContainer = React.lazy(() =>
    import('./Components/Profile/ProfileContainer')
);

class App extends React.Component {
    componentDidMount() {
        this.props.initializeApp();
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader />;
        }
        return (
            <BrowserRouter basename='/'>
                <div className='App'>
                    <HeaderContainer className='header' />
                    <div className='content'>
                        <NavBarContainer className='navBar' />
                        {/* <Profile className='profile'/> */}
                        <Suspense
                            fallback={
                                <div>
                                    <Preloader />
                                </div>
                            }
                        >
                            <Routes>
                                <Route
                                    path='*'
                                    element={<ProfileContainer />}
                                />
                                <Route
                                    path='profile'
                                    element={<ProfileContainer />}
                                >
                                    <Route
                                        path=':userId'
                                        element={<ProfileContainer />}
                                    />
                                </Route>
                                <Route
                                    path='/dialogs/*'
                                    element={<DialogsContainer />}
                                />
                                <Route
                                    path='/users/*'
                                    element={<UsersContainer />}
                                />
                                <Route path='news' element={<News />} />
                                <Route path='login' element={<Login />} />
                                <Route
                                    path='music'
                                    element={<MusicContainer />}
                                />
                                <Route path='setting' element={<Setting />} />
                            </Routes>
                        </Suspense>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized,
});

export default connect(mapStateToProps, { initializeApp })(App);
