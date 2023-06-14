import axios from 'axios';
import { UserType } from '../types/types';


export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': 'bcba525e-6861-49a2-bdf5-e6811f431bde',
    },
});

export enum ResultCodeEnum {
    Success = 0,
    Error = 1,
}


export type GetItemsType = {
    items: Array<UserType>
    totalCount: number
    error: string | null
}

export enum ResultCodeForCaptchEnum {
    CaptchaIsRequired = 10
}

export type ResponseType<D = {}, RC = ResultCodeEnum> = {
    data: D
    messages: Array<string>
    resultCode: RC
}