import axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': 'bcba525e-6861-49a2-bdf5-e6811f431bde',
    },
});

export const usersApi = {
    async getUsers(currentPage = 1, pageSize = 10) {
        return await instance
            .get(`users?page=${currentPage}&count=${pageSize}`)
            .then((res) => res.data);
    },
    async follow(id) {
        return await instance.post(`follow/${id}`).then((res) => res.data);
    },
    async unfollow(id) {
        return await instance.delete(`follow/${id}`).then((res) => res.data);
    },
};
