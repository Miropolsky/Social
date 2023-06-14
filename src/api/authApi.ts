import { ResponseType, ResultCodeEnum, instance } from './api';

export const authApi = {
    login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<ResponseType<LoginResponseType, ResultCodeEnum | ResultCodeForCaptchEnum>>(`auth/login`, {
            email,
            password,
            rememberMe,
            captcha,
        }).then((res) => res.data);
    },
    logout() {
        return instance.delete(`auth/login`).then(res => res.data);
    },
    getUser() {
        return instance.get<ResponseType<GetUserResponseDataType>>('auth/me').then((res) => res.data);
    },
};

export enum ResultCodeForCaptchEnum {
    CaptchaIsRequired = 10
}

export type GetUserResponseDataType = {
        id: number,
        email: string,
        login: string
}
export type LoginResponseType = {
        userId: number,
}


