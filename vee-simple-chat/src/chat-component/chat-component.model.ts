export interface IUser {
    name: string;
}

export enum messageKindEnum {
    getMessages = 'getMessages',
    newMessage = 'newMessage'
}

export interface ISocketMessage {
    kind: messageKindEnum;
    data: any;
}
export interface INewSocketMessage extends ISocketMessage {
    data: IMessage;
}

export interface IMessage {
    author: string;
    text: string;
}