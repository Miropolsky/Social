import React from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import { logout } from '../../redux/authReducer.ts';

class HeaderContainer extends React.Component {
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

export default connect(mapStateToProps, { logout })(HeaderContainer);
