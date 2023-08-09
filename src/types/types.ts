export type PostType = {
    id: number,
    message: string,
    likesCount: number
}

export type ContactsType = {
    github: string | null
    vk: string | null
    facebook:string | null
    instagram:string | null
    twitter: string | null
    website:string | null
    youtube: string | null
    mainLink: string | null
}
export type PhotosType ={
    small: string | null
    large: string | null
}
export type ProfileType = {
    userId: number
    lookingForAJob: boolean | null
    lookingForAJobDescription: string | null
    fullName: string | null
    contacts: ContactsType
    photos: PhotosType | null
    aboutMe: string
}
export type UserType = {
    id: number
    name: string
    status: string
    photos: PhotosType
    followed: boolean
}

export type DialogType = {
    id: number,
    name: string
    photos: PhotosType
}

export type MessageType = {
    id: number,
    body: string
    addedAt: string,
    recipientId: number,
    senderId: number,
    senderName: string,
}

export type MusicType = {
    id: number,
    track: string,
    author: string
}

export type FriendType = {
    name: string,
    imgUrl: string;
    id: number
}