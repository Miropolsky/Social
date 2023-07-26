import { Link } from 'react-router-dom';
import { Header } from 'antd/es/layout/layout';
import { Row, Col } from 'antd/es/grid';
import { UserOutlined } from '@ant-design/icons';
import Avatar from 'antd/es/avatar/avatar';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectCurrentUserLogin,
    selectIsAuth,
} from '../../redux/authSelectors copy';
import { logout } from '../../redux/authReducer';
import { AnyAction } from 'redux';
import { Button, Space } from 'antd';

export default function AppHeader() {
    const isAuth = useSelector(selectIsAuth);
    const login = useSelector(selectCurrentUserLogin);
    const dispatch = useDispatch();
    const logoutCallback = () => {
        dispatch(logout as unknown as AnyAction);
    };
    return (
        <Header>
            <Row>
                {isAuth ? (
                    <>
                        <Col span={3} offset={20}>
                            <Space size={15}>
                                <div style={{ color: 'white' }}>{login}</div>
                                <Avatar size={50} icon={<UserOutlined />} />
                            </Space>
                        </Col>
                        <Col span={1}>
                            <Button onClick={logoutCallback}>Logout</Button>
                        </Col>
                    </>
                ) : (
                    <Col span={2} offset={22}>
                        <Button>
                            <Link to='/login'>Login</Link>
                        </Button>
                    </Col>
                )}
            </Row>
        </Header>

        // <div className={styles.container}>
        //     <div className={styles.loginBlock}>
        //         {props.isAuth ? (
        //             <div>
        //                 {props.login} -{' '}
        //                 <button onClick={props.logout}>Logout</button>
        //             </div>
        //         ) : (
        //             <NavLink to='/login'>Login</NavLink>
        //         )}
        //     </div>
        // </div>
    );
}
