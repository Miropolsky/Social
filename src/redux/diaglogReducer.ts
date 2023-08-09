import { BaseThunkType, InferActionsTypes } from "./reduxStore";
import { Dispatch } from "react";
// import { ymessage } from 'antd';
import { DialogsApi } from "../api/dialogs";
import { usersApi } from "../api/usersApi";
import { UserType } from "../types/types";



const initialState = {
    dialogs: [
    ]  as UserType[],
    messages: [
    ],
};

const actions = {
    addMessageActionCreator: (text: string) => ({
        type: 'SN/DIALOGS/ADD-MESSAGE',
        text,
    } as const),
    setMessage: (userId: number, message: []) => ({
        type: 'SN/DIALOGS/GET-MESSAGE',
        userId,
        message
    } as const),
    setDialogs: (friends: UserType[]) => ({
        type: 'SN/DIALOGS/SET-DIALOGS',
        dialogs: friends
    } as const),
}

const dialogReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SN/DIALOGS/ADD-MESSAGE': {
            return {
                ...state,
            };
        }
        case 'SN/DIALOGS/GET-MESSAGE': {
            return {
                ...state,
                messages: action.message
            }
        }
        case 'SN/DIALOGS/SET-DIALOGS': {
            return {
                ...state,
                dialogs: action.dialogs
            }
        }
        default:
            return state;
    }
};

const getMessage = (userId: number): ThunkType => {
    return async (dispatch) => {
        let res = await DialogsApi.getMessage(userId);
        dispatch(actions.setMessage(userId, res.items))
    }
}
const sendMessage = (userId: number, text: string): ThunkType => {
    return async (dispatch) => {
        let res = await DialogsApi.sendMessage(userId, text)
    }
}

const getFriends = (): ThunkType => {
    return async (dispatch) => {
        let res = await usersApi.getUsers(1, 20, '', true);
        dispatch(actions.setDialogs(res.items))
    }
}

export { dialogReducer, actions, sendMessage, getMessage, getFriends };

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsType>
export type DispatchDialogType = Dispatch<ActionsType>
