export interface IUser {
    name: string
}

export enum messageKindEnum {
    getMessages = 'getMessages',
    newMessage = 'newMessage'
}

export interface ISocketMessage {
    kind: messageKindEnum,
    data: any
}

export interface INewMessage {
    author: string;
    text: string;
}