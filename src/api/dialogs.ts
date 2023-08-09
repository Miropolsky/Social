import { instance } from "./api"


export const DialogsApi = {
    getAllDialogs() {
        return instance.get('dialogs');
    },
    getMessage(userId: number) {
        return instance.get(`dialogs/${userId}/messages`).then(res=> res.data)
    },
    sendMessage(userId: number, text: string) {
        return instance.post(`dialogs/${userId}/messages`, {
            body: text
        }).then(res=> res.data)
    }
}