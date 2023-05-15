import React from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import { logout } from '../../redux/authReducer';
import { AppStateType } from '../../redux/reduxStore';

type PropsType = {
    isAuth: boolean,
    login: string | null,
    logout: () => void
}
class HeaderContainer extends React.Component<PropsType> {
    render() {
        return <Header {...this.props} />;
    }
}


const mapStateToProps = (state: AppStateType) => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login,
        id: state.auth.id,
        email: state.auth.email,
    };
};

export default connect(mapStateToProps, { logout })(HeaderContainer);
