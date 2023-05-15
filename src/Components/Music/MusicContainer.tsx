import { connect } from 'react-redux';
import Music from './Music';
import { AppStateType } from '../../redux/reduxStore';
import { MusicInitialStateType } from '../../redux/musicReducer';

type MapStatePropsType = MusicInitialStateType;
const mapStatetoProps = (state: AppStateType): MapStatePropsType => {
    return {
        musics: state.musicPage.musics,
    };
};


export default connect(mapStatetoProps)(Music);
