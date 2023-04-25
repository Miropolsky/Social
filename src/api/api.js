import axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': 'bcba525e-6861-49a2-bdf5-e6811f431bde',
    },
});

const usersApi = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance
            .get(`users?page=${currentPage}&count=${pageSize}`)
            .then((res) => res.data);
    },
    follow(id) {
        return instance.post(`follow/${id}`).then((res) => res.data);
    },
    unfollow(id) {
        return instance.delete(`follow/${id}`).then((res) => res.data);
    },
};

const profileApi = {
    getUser(userId) {
        return instance.get(`profile/${userId}`).then((res) => res.data);
    },
    getStatus(userId) {
        return instance.get(`profile/status/${userId}`);
    },
    updateStatus(status) {
        return instance.put(`profile/status`, { status: status });
    },
    savePhoto(photo) {
        let formDate = new FormData();
        formDate.append('image', photo);
        return instance.put(`profile/photo`, formDate, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },
    saveProfile(profile) {
        return instance.put(`profile`, profile);
    },
};

const authApi = {
    login(email, password, rememberMe = false, captcha = null) {
        return instance.post(`auth/login`, {
            email,
            password,
            rememberMe,
            captcha,
        });
    },
    logout() {
        return instance.delete(`auth/login`);
    },
    getUser() {
        return instance.get('auth/me').then((res) => res.data);
    },
};

const securityApi = {
    getCaptchUrl() {
        return instance.get('/security/get-captcha-url');
    },
};

export { usersApi, profileApi, authApi, securityApi };
