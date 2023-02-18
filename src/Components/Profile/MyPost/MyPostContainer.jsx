import { connect } from 'react-redux';
import {
    updateNewPostTextCreator,
    addPostActionCreator,
} from '../../../redux/profileReducer';
import { MyPost } from './MyPost';

const mapStateToProps = (state) => {
    return {
        postsData: state.profilePage.posts,
        newPostText: state.profilePage.newPostText,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateNewPostText: (text) => {
            dispatch(updateNewPostTextCreator(text));
        },
        addPost: () => {
            dispatch(addPostActionCreator());
        },
    };
};

const MyPostContainer = connect(mapStateToProps, mapDispatchToProps)(MyPost);
export default MyPostContainer;
