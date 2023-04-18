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
};

const authApi = {
    login(email, password, rememberMe = false) {
        return instance.post(`auth/login`, {
            email,
            password,
            rememberMe,
        });
    },
    logout() {
        return instance.delete(`auth/login`);
    },
    getUser() {
        return instance.get('auth/me').then((res) => res.data);
    },
};

export { usersApi, profileApi, authApi };
