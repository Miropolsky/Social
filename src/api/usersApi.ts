import { GetItemsType, ResponseType, instance } from "./api";


export const usersApi = { 
    getUsers(currentPage = 1, pageSize = 10, term: string = '', friend: null | boolean = null) {
        return instance
            .get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}&term=${term}` + (friend === null ? '' : `&friend=${friend}`))
            .then((res) => res.data);
    },
    // getUsersFriend(currentPage = 1, pageSize = 10, text='', isFriend: boolean | null) {
    //     if (isFriend === false) {
    //         isFriend = null;
    //     }
    //     return instance
    //         .get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}&term=${text}&friend=${isFriend}`)
    //         .then((res) => res.data);
    // },
    follow(id: number) {
        return instance.post<ResponseType>(`follow/${id}`).then((res) => res.data);
    },
    unfollow(id: number) {
        return instance.delete<ResponseType>(`follow/${id}`).then((res) => res.data);
    },
};