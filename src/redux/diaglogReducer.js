const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT';
const ADD_MESSAGE = 'ADD-MESSAGE';

const initialState = {
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
};

const addMessageActionCreator = () => {
    return {
        type: ADD_MESSAGE,
    };
};

const updateNewMessageTextCreator = (text) => {
    return {
        type: UPDATE_NEW_MESSAGE_TEXT,
        text: text,
    };
};

const dialogReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_NEW_MESSAGE_TEXT: {
            return { ...state, newMessageText: action.text };
        }

        case ADD_MESSAGE: {
            return {
                ...state,
                newMessageText: '',
                messages: [
                    ...state.messages,
                    {
                        id: 4,
                        message: state.newMessageText,
                    },
                ],
            };
        }
        default:
            return state;
    }
};
export { dialogReducer, addMessageActionCreator, updateNewMessageTextCreator };