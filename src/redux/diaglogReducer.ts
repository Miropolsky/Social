import { InferActionsTypes } from "./reduxStore";
import { Dispatch } from "react";

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
};

const actions = {
    addMessageActionCreator: (text: string) => ({
        type: 'SN/DIALOGS/ADD-MESSAGE',
        text,
    } as const),
}

const dialogReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SN/DIALOGS/ADD-MESSAGE': {
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

export { dialogReducer, actions };

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>;
// type ThunkType = BaseThunkType<ActionsType>
export type DispatchDialogType = Dispatch<ActionsType>
