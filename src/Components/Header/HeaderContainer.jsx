import axios from 'axios';
import React from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import { setAuthUserData } from '../../redux/authReducer';

class HeaderContainer extends React.Component {
    componentDidMount() {
        axios
            .get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
                withCredentials: true,
            })
            .then((res) => {
                if (res.data.resultCode === 0) {
                    let { login, id, email } = res.data.data;
                    this.props.setAuthUserData(id, email, login);
                }
            });
    }
    render() {
        return <Header {...this.props} />;
    }
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login,
        id: state.auth.id,
        email: state.auth.email,
    };
};

export default connect(mapStateToProps, { setAuthUserData })(HeaderContainer);
