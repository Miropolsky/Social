import { profileReducer } from './profileReducer';
import { dialogReducer } from './diaglogReducer';

const store = {
    _state: {
        profilePage: {
            newPostText: '',
            posts: [
                { id: 1, message: 'Привет! Как дела?', likesCount: 0 },
                { id: 2, message: 'Это мой первый пост', likesCount: 23 },
            ],
        },
        dialogsPage: {
            dialogs: [
                {
                    name: 'Andrey',
                    id: 1,
                    imgUrl: 'https://shutniks.com/wp-content/uploads/2019/12/Avatarki_paren_6_07164309.jpg',
                },
                {
                    name: 'Alexey',
                    id: 2,
                    imgUrl: 'https://i.ytimg.com/vi/_EVvJeClXtI/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGHggISh_MA8=&rs=AOn4CLDSY4Cw7ELBJFRs1jFEYaVO6kmxWA',
                },
                {
                    name: 'Sergey',
                    id: 3,
                    imgUrl: 'https://coolsen.ru/wp-content/uploads/2021/06/15-8.jpg',
                },
                {
                    name: 'Vasya',
                    id: 4,
                    imgUrl: 'https://pixelbox.ru/wp-content/uploads/2021/09/avatar-boys-vk-46.jpg',
                },
                {
                    name: 'Ivan',
                    id: 5,
                    imgUrl: 'https://cdn1.ozone.ru/s3/multimedia-c/6156836316.jpg',
                },
            ],

            messages: [
                { id: 1, message: 'Привет! Как дела?' },
                { id: 2, message: 'Привет, у меня отлично, у тебя как?' },
                { id: 3, message: 'Хорошо' },
            ],
            newMessageText: '',
        },
        siteBar: {
            friends: [
                {
                    name: 'Andrey',
                    id: 1,
                    imgUrl: 'https://shutniks.com/wp-content/uploads/2019/12/Avatarki_paren_6_07164309.jpg',
                },
                {
                    name: 'Alexey',
                    id: 2,
                    imgUrl: 'https://i.ytimg.com/vi/_EVvJeClXtI/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGHggISh_MA8=&rs=AOn4CLDSY4Cw7ELBJFRs1jFEYaVO6kmxWA',
                },
                {
                    name: 'Sergey',
                    id: 3,
                    imgUrl: 'https://coolsen.ru/wp-content/uploads/2021/06/15-8.jpg',
                },
            ],
        },
    },
    _callSubscriber() {
        console.log('State changed');
    },
    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },
    dispatch(action) {
        this._state.profilePage = profileReducer(
            this._state.profilePage,
            action
        );
        this._state.dialogsPage = dialogReducer(
            this._state.dialogsPage,
            action
        );
        this._callSubscriber();
    },
};

export default store;
