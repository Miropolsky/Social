import { GetItemsType, ResponseType, instance } from "./api";


export const usersApi = { 
    getUsers(currentPage = 1, pageSize = 10) {
        return instance
            .get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}`)
            .then((res) => res.data);
    },
    follow(id: number) {
        return instance.post<ResponseType>(`follow/${id}`).then((res) => res.data);
    },
    unfollow(id: number) {
        return instance.delete<ResponseType>(`follow/${id}`).then((res) => res.data);
    },
};