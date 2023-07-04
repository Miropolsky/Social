import { BaseThunkType, InferActionsTypes } from './reduxStore';
import { ChatMessageType as ChatMessageApiType, StatusType, chatApi } from '../api/chatApi';
import { Dispatch } from 'redux';
import {v1} from 'uuid'


const initialState = {
    messages: [] as ChatMessageType[],
    status: 'pending' as StatusType
};

type ChatMessageType = ChatMessageApiType & {id: string}

export const actions = {
    messagesReceived: (messages: ChatMessageApiType[]) => ({
        type: 'chat/MESSAGES_RECEIVED',
        payload: messages,
    } as const),
    statusChanged: (status: StatusType) => ({
        type: 'chat/STATUS_CHANGED',
        payload: {status}
    } as const)
};

const chatReducer = (state = initialState, action: ActionsType) : InitialStateType => {
    switch (action.type) {
        case 'chat/MESSAGES_RECEIVED':
            return { ...state, messages: [...state.messages, ...action.payload.map(m => ({...m, id: v1()}))].filter((m,i, arr)=> arr.length - 100 <= i)};
        case 'chat/STATUS_CHANGED':
            return { ...state, status: action.payload.status}
        default:
            return state;
    }
};

let _newMessageHandeler: ((messages: ChatMessageApiType[]) => void) | null = null;

const newMessageHandelerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandeler === null) {
        _newMessageHandeler = (messages: ChatMessageApiType[]) => {
            dispatch(actions.messagesReceived(messages))
        }
    }
    return _newMessageHandeler;
}
let _statusChangedHandeler: ((status: StatusType) => void) | null = null;

const statusChangedHandelerCreator = (dispatch: Dispatch) => {
    if (_statusChangedHandeler === null) {
        _statusChangedHandeler = (status: StatusType) => {
            dispatch(actions.statusChanged(status))
        }
    }
    return _statusChangedHandeler;
}


const startMessagesListening = ():ThunkType => {
    return async (dispatch) => {
        chatApi.start();
        chatApi.subscribe('message-received', newMessageHandelerCreator(dispatch))
        chatApi.subscribe('status-changed', statusChangedHandelerCreator(dispatch))
    };
};
const stopMessagesListening = ():ThunkType => {
    return async (dispatch) => {
        chatApi.unSubscribe('message-received',newMessageHandelerCreator(dispatch))
        chatApi.unSubscribe('status-changed',statusChangedHandelerCreator(dispatch))
    };
};
const sendMessage = (message: string):ThunkType => {
    return async (dispatch) => {
        chatApi.sendMessage(message)
    };
};

export { chatReducer, sendMessage, startMessagesListening, stopMessagesListening};

type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>
