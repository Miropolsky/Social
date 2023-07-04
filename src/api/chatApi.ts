let subscribers = {
    'message-received':[] as Array<ReceivedMessageSubscriberType>,
    'status-changed': [] as Array<StatusChangedSubscriberType>,
}

let ws: WebSocket | null;
const notifySubscribersAboutStatus = (status: StatusType) => {
    subscribers["status-changed"].forEach(s=>s(status));
}
const closeHandler = () => {
    console.log('close ws')
    notifySubscribersAboutStatus('pending')
    setTimeout(createChannel, 4000);
};
const messageHandler = (e: MessageEvent) => {
        const newMasseges = JSON.parse(e.data);
        subscribers["message-received"].forEach(s => s(newMasseges))
}
const openHandler = () => {
    notifySubscribersAboutStatus('ready');
}
const errorHandler = () => {
    notifySubscribersAboutStatus('error');
    console.error('RESTART PAGE')
}

const cleanUp = () => {
    ws?.removeEventListener('close', closeHandler);
    ws?.removeEventListener('message', messageHandler);
    ws?.removeEventListener('open', openHandler);
    ws?.removeEventListener('error', errorHandler);
}
function createChannel() {
    cleanUp();
    ws?.close();
    ws = new WebSocket(
        'wss://social-network.samuraijs.com/handlers/ChatHandler.ashx'
    );
    notifySubscribersAboutStatus('pending')
    ws.addEventListener('close', closeHandler);
    ws.addEventListener('message', messageHandler);
    ws.addEventListener('open', openHandler);
    ws.addEventListener('error', errorHandler);
}

export const chatApi = {
    start() {
        createChannel();
    },
    stop() {
        subscribers["message-received"] = [];
        subscribers["status-changed"] = [];
        cleanUp();
        ws?.close();
    },
    subscribe(eventName: EventNames,
        callback: ReceivedMessageSubscriberType | StatusChangedSubscriberType) {
        //@ts-ignore
        subscribers[eventName].push(callback)
        return () => {
            //@ts-ignore
            subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
        }  
    },
    unSubscribe(eventName: EventNames,callback: ReceivedMessageSubscriberType | StatusChangedSubscriberType) {
        //@ts-ignore
        subscribers[eventName] = subscribers[eventName].filter(s=> s !== callback)
    },
    sendMessage(message:string) {
        ws?.send(message)
    }
}

type EventNames = 'message-received' | 'status-changed'; 
type ReceivedMessageSubscriberType = (message: ChatMessageType[]) => void
type StatusChangedSubscriberType = (status: StatusType) => void
export type ChatMessageType = {
    message: string;
    photo: string;
    userId: number;
    userName: string;
};
export type StatusType = 'pending' | 'ready' | 'error'