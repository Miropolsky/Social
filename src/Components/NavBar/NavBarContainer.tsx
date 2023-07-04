import { AppStateType } from '../../redux/reduxStore';
import NavBar from './NavBar';
import { connect } from 'react-redux';

const mapStatetoProps = (state: AppStateType) => {
    return {
        frinedsData: state.siteBar.friends,
    };
};

const NavBarContainer = connect(mapStatetoProps)(NavBar);
export default NavBarContainer;
