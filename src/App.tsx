import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './App.css';
// import DialogsContainer from './Components/Dialogs/DialogsContainer';
// import ProfileContainer from './Components/Profile/ProfileContainer';
import {
    UserOutlined,
    MailOutlined,
    UserSwitchOutlined,
    SettingOutlined,
    GlobalOutlined,
    NotificationOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React, { Suspense } from 'react';
import { connect } from 'react-redux';
import { Login } from './Components/Login/Login';
import MusicContainer from './Components/Music/MusicContainer';
import News from './Components/News/News';
import Setting from './Components/Setting/Setting';
import { UsersPage } from './Components/Users/UsersContainer';
import Preloader from './Components/common/preloader/Preloader';
import { initializeApp } from './redux/appReducer';
import { AppStateType } from './redux/reduxStore';
import AppHeader from './Components/Header/Header';
// import { ChatPage } from './pages/Chat/ChatPage';
const { Content, Footer, Sider } = Layout;

const DialogsContainer = React.lazy(
    () => import('./Components/Dialogs/DialogsContainer')
);
const ProfileContainer = React.lazy(
    () => import('./Components/Profile/ProfileContainer')
);

const ChatPage = React.lazy(() => import('./pages/Chat/ChatPage'));

type MapPropsType = ReturnType<typeof mapStateToProps>;
type DispatchPropsType = {
    initializeApp: () => void;
};

class App extends React.Component<MapPropsType & DispatchPropsType> {
    componentDidMount() {
        this.props.initializeApp();
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader />;
        }
        return (
            <BrowserRouter basename='/'>
                <AppHeader />
                <Layout>
                    <Sider
                        breakpoint='lg'
                        collapsedWidth='0'
                        // onBreakpoint={(broken) => {
                        //     console.log(broken);
                        // }}
                        // onCollapse={(collapsed, type) => {
                        //     console.log(collapsed, type);
                        // }}
                    >
                        <div className='demo-logo-vertical' />
                        <Menu
                            theme='dark'
                            mode='inline'
                            defaultSelectedKeys={['4']}
                            items={[
                                {
                                    icon: UserOutlined,
                                    title: 'Profile',
                                    link: 'profile',
                                },
                                {
                                    icon: MailOutlined,
                                    title: 'Message',
                                    link: 'dialogs',
                                },
                                {
                                    icon: GlobalOutlined,
                                    title: 'News',
                                    link: 'news',
                                },
                                {
                                    icon: NotificationOutlined,
                                    title: 'Music',
                                    link: 'music',
                                },
                                {
                                    icon: SettingOutlined,
                                    title: 'Setting',
                                    link: 'setting',
                                },
                                {
                                    icon: UserSwitchOutlined,
                                    title: 'Users',
                                    link: 'users',
                                },
                                {
                                    icon: MailOutlined,
                                    title: 'Chat',
                                    link: 'chat',
                                },
                            ].map((item, index) => ({
                                key: String(index + 1),
                                icon: React.createElement(item.icon),
                                label: <Link to={item.link}>{item.title}</Link>,
                            }))}
                        />
                    </Sider>
                    <Layout>
                        {/* <HeaderContainer /> */}
                        <Content style={{ margin: '0px 0px 0' }}>
                            <div
                                style={{
                                    padding: 24,
                                    minHeight: 700,
                                    background: 'white',
                                }}
                            >
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
                                            element={<UsersPage />}
                                        />
                                        <Route path='news' element={<News />} />
                                        <Route
                                            path='login'
                                            element={<Login />}
                                        />
                                        <Route
                                            path='chat'
                                            element={<ChatPage />}
                                        />
                                        <Route
                                            path='music'
                                            element={<MusicContainer />}
                                        />
                                        <Route
                                            path='setting'
                                            element={<Setting />}
                                        />
                                    </Routes>
                                </Suspense>
                            </div>
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>
                            Социальная сеть @Miropolsky
                        </Footer>
                    </Layout>
                </Layout>
            </BrowserRouter>
        );
    }
}
// <BrowserRouter basename='/'>
//     <div className='App'>
//         <HeaderContainer />
//         <div className='content'>
//             <NavBarContainer />
//             {/* <Profile className='profile'/> */}
//             <Suspense
//                 fallback={
//                     <div>
//                         <Preloader />
//                     </div>
//                 }
//             >
//                 <Routes>
//                     <Route
//                         path='*'
//                         element={<ProfileContainer />}
//                     />
//                     <Route
//                         path='profile'
//                         element={<ProfileContainer />}
//                     >
//                         <Route
//                             path=':userId'
//                             element={<ProfileContainer />}
//                         />
//                     </Route>
//                     <Route
//                         path='/dialogs/*'
//                         element={<DialogsContainer />}
//                     />
//                     <Route
//                         path='/users/*'
//                         element={<UsersPage />}
//                     />
//                     <Route path='news' element={<News />} />
//                     <Route path='login' element={<Login />} />
//                     <Route
//                         path='music'
//                         element={<MusicContainer />}
//                     />
//                     <Route path='setting' element={<Setting />} />
//                 </Routes>
//             </Suspense>
//         </div>
//     </div>
// </BrowserRouter>

const mapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized,
});

export default connect(mapStateToProps, { initializeApp })(App);
