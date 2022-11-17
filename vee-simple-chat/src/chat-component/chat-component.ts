import './chat-component.css'
import { IEvent } from '../custom-event-listener';
import { ChatComponentView } from './chat-component.view';
import { IUser, ISocketMessage, messageKindEnum, INewMessage } from './chat-component.model';

export class ChatComponent {
    private chatComponentView!: ChatComponentView; 
    
    private webSocket!: WebSocket;
    private serverUrl!: string;
    private user!: IUser;

    constructor(private container: HTMLElement) {
        this.chatComponentView = new ChatComponentView(container);
    }

    public init(serverUrl: string, user: IUser): void {
        this.serverUrl = serverUrl;
        this.user = user;
        this.webSocket = this.connetToSocket(this.serverUrl);

        this.attachEvents();
    }

    private connetToSocket(url: string): WebSocket {
        return new WebSocket(url);
    }

    private attachEvents(): void {
        this.webSocket.addEventListener("open", (ev) => {
            console.log('open', ev);
            this.onSocketConnected();
        }, { once: true });

        this.webSocket.addEventListener("message", (ev: MessageEvent) => {
            const message: ISocketMessage = JSON.parse(ev.data);

            switch(message.kind) {
                case messageKindEnum.getMessages:
                    this.renderMessages(message.data.messages);
                    break;

                case messageKindEnum.newMessage:
                    this.chatComponentView.renderMessage(message.data);
                    break;
            }
            console.log('message', message);
        });

        this.chatComponentView.events.addEventListener('newMessage', ((event: IEvent) => {
            this.sendMessage(event.data);
        }));
    }
    
    private renderMessages(messages: INewMessage[]): void {
        messages.forEach((message: INewMessage) => {
            this.chatComponentView.renderMessage(message);
        });
    }

    private sendMessage(text: string): void {
        const message: ISocketMessage = {
            kind: messageKindEnum.newMessage,
            data: {
                author: this.user.name,
                text
            }
        }

        this.webSocket.send(JSON.stringify(message));
    }

    private onSocketConnected(): void {
        const message: ISocketMessage = {
            kind: messageKindEnum.getMessages,
            data: null
        };

        this.webSocket.send(JSON.stringify(message));
    }
}
