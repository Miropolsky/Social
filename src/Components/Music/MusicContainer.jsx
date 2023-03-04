import { connect } from 'react-redux';
import Music from './Music';

const mapStatetoProps = (state) => {
    return {
        musics: state.musicPage.musics,
    };
};

const mapStateToDispatch = (dispatch) => {
    return {};
};

export default connect(mapStatetoProps, mapStateToDispatch)(Music);
