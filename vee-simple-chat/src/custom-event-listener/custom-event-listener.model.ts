export interface ISubscription {
    callbackFunction(imessage: IMessage): any,
    id: string
}

export interface IMessage {
    id: string,
    message: string
}