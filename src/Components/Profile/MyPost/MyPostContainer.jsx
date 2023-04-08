import { connect } from 'react-redux';
import { addPostActionCreator } from '../../../redux/profileReducer';
import { MyPost } from './MyPost';

const mapStateToProps = (state) => {
    return {
        postsData: state.profilePage.posts,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addPost: (textPost) => {
            dispatch(addPostActionCreator(textPost));
        },
    };
};

const MyPostContainer = connect(mapStateToProps, mapDispatchToProps)(MyPost);
export default MyPostContainer;
