import { connect } from 'react-redux';
import { DispatchProfileType, actions } from '../../../redux/profileReducer';
import { MyPost } from './MyPost';
import { AppStateType } from '../../../redux/reduxStore';
import { PostType } from '../../../types/types';

type MapStatePropsType = {
    postsData: Array<PostType>
}
const mapStateToProps = (state: AppStateType):MapStatePropsType => {
    return {
        postsData: state.profilePage.posts,
    };
};

type MapDispatchPropsType = {
    addPost: (text: string) => void
}

const mapDispatchToProps = (dispatch:DispatchProfileType):MapDispatchPropsType => {
    return {
        addPost: (textPost: string) => {
            dispatch(actions.addPostActionCreator(textPost));
        },
    };
};

const MyPostContainer = connect(mapStateToProps, mapDispatchToProps)(MyPost);
export default MyPostContainer;
