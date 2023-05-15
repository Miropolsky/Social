import React from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { AppStateType } from '../redux/reduxStore';

type MapStatePropsType = {
    isAuth: boolean
}
let mapStateToPropsRedirect = (state: AppStateType):MapStatePropsType => ({
    isAuth: state.auth.isAuth,
});

type PropsType = MapStatePropsType;
export const withAuthRedirect = (Component: typeof React.Component) => {
    class RedirectComponent extends React.Component<PropsType> {
        render() {
            if (!this.props.isAuth) {
                return <Navigate to='/login' />;
            }
            return <Component {...this.props} />;
        }
    }
    return connect(mapStateToPropsRedirect)(RedirectComponent);
};
