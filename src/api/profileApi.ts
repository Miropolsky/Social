import { ResponseType, instance } from "./api";
import { PhotosType, ProfileType } from '../types/types';

export const profileApi = {
    getUser(userId: number) {
        return instance.get<ProfileType>(`profile/${userId}`).then((res) => res.data);
    },
    getStatus(userId: number) {
        return instance.get<string>(`profile/status/${userId}`).then(res=> res.data);
    },
    updateStatus(status: string) {
        return instance.put<ResponseType>(`profile/status`, { status: status }).then(res => res.data);
    },
    savePhoto(photo: any) {
        let formDate = new FormData();
        formDate.append('image', photo);
        return instance.put<ResponseType<SavePhotoResponseDataType>>(`profile/photo`, formDate, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }).then(res=> res.data);
    },
    saveProfile(profile: ProfileType) {
        return instance.put<ResponseType>(`profile`, profile).then(res=> res.data);
    },
};

type SavePhotoResponseDataType = {
    photos: PhotosType
}