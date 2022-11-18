import './chat-component.css'
import { IEvent } from '../custom-event-listener';
import { IUser, ISocketMessage, messageKindEnum, IMessage, INewSocketMessage } from './chat-component.model';
import { IChatComponentView } from './chat-component-view.model';

export class ChatComponent {    
    private webSocket!: WebSocket;
    private serverUrl!: string;
    private user!: IUser;

    constructor(private chatComponentView: IChatComponentView) {
        
    }

    public init(serverUrl: string, user: IUser): void {
        this.serverUrl = serverUrl;
        this.user = user;
        this.webSocket = this.connetToSocket(this.serverUrl);

        this.attachWebsocketEvents();
        this.attachViewEvents();
    }

    private connetToSocket(url: string): WebSocket {
        return new WebSocket(url);
    }

    private attachWebsocketEvents(): void {
        this.webSocket.addEventListener("open", () => {
            this.fetchAllMessages();
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
        });
    }

    private attachViewEvents(): void {
        this.chatComponentView.onNewMessage((event: IEvent) => {
            this.sendMessage(event.data);
        });
    }
    
    private renderMessages(messages: IMessage[]): void {
        messages.forEach((message: IMessage) => {
            this.chatComponentView.renderMessage(message);
        });
    }

    private sendMessage(text: string): void {
        const message: INewSocketMessage = {
            kind: messageKindEnum.newMessage,
            data: {
                author: this.user.name,
                text
            }
        }

        this.webSocket.send(JSON.stringify(message));
    }

    private fetchAllMessages(): void {
        const message: Partial<ISocketMessage> = {
            kind: messageKindEnum.getMessages
        };

        this.webSocket.send(JSON.stringify(message));
    }
}
