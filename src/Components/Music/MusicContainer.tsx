import { connect } from 'react-redux';
import Music from './Music';
import { AppStateType } from '../../redux/reduxStore';
import { InitialState } from '../../redux/musicReducer';

type MapStatePropsType = InitialState;
const mapStatetoProps = (state: AppStateType): MapStatePropsType => {
    return {};
};

export default connect(mapStatetoProps)(Music);
