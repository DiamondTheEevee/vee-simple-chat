import './chat-component.css'
import { IEvent } from '../custom-event-listener';
import { ChatComponentView } from './chat-component.view';
import { IUser, ISocketMessage, messageKindEnum, IMessage, INewSocketMessage } from './chat-component.model';
import { AbstractComponent } from '../component/abstract.component';

export class ChatComponent extends AbstractComponent {
    private chatComponentView!: ChatComponentView; 
    
    private webSocket!: WebSocket;
    private serverUrl!: string;
    private user!: IUser;

    constructor(container: HTMLElement) {
        super(container);
        this.chatComponentView = new ChatComponentView(container);
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
        this.chatComponentView.events.addEventListener('newMessage', ((event: IEvent) => {
            this.sendMessage(event.data);
        }));
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
