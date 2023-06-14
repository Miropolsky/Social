import { instance } from './api';

export const securityApi = {
    getCaptchUrl() {
        return instance.get<{url: string}>('/security/get-captcha-url').then(res => res.data);
    },
};

