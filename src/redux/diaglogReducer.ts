import { ThunkAction } from "redux-thunk";
import { AppStateType } from "./reduxStore";

const ADD_MESSAGE = 'ADD-MESSAGE';

export type DialogType = {
    name: string,
    id: number,
    imgUrl: string
}
export type MessageType = {
    message: string,
    id: number,
}

type DialogInitialStateType = {
    dialogs: Array<DialogType>,
    messages: Array<MessageType>
}
type AddMessageActionCreatorType = {
    type: typeof ADD_MESSAGE,
    text: string,
}

const initialState: DialogInitialStateType = {
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
};




const addMessageActionCreator = (text: string): AddMessageActionCreatorType => {
    return {
        type: ADD_MESSAGE,
        text,
    };
};

type ActionsType = AddMessageActionCreatorType;

const dialogReducer = (state = initialState, action: ActionsType): DialogInitialStateType => {
    switch (action.type) {
        case ADD_MESSAGE: {
            return {
                ...state,
                messages: [
                    ...state.messages,
                    {
                        id: 4,
                        message: action.text,
                    },
                ],
            };
        }
        default:
            return state;
    }
};

type ThunkType = ThunkAction<void, AppStateType, unknown,ActionsType>

const addMessage = (text: string):ThunkType => (dispatch) => {
    dispatch(addMessageActionCreator(text));
}

export { dialogReducer, addMessageActionCreator, addMessage };
