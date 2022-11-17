import './chat-component.css'
import template from './chat-component.html?raw';
import { CustomEventListener } from '../custom-event-listener/custom-event-listener';
import { IUser, ISocketMessage, messageKindEnum, INewMessage } from './chat-component.model';

export class ChatComponent {
    public htmlElement!: HTMLElement;
    
    private messageInputElement!: HTMLInputElement;
    private sendButtonElement!: HTMLButtonElement;
    
    private webSocket!: WebSocket;
    private eventListener = new CustomEventListener();
    private serverUrl!: string;
    private user!: IUser;

    constructor(private container: HTMLElement) {
        const htmlElement = document.createElement('div');
        htmlElement.classList.add('chat-component');
        htmlElement.innerHTML = template;
        container.appendChild(htmlElement);

        this.htmlElement = htmlElement;
        this.sendButtonElement = htmlElement.querySelector('.inputs-container--send-button') as HTMLButtonElement;
        this.messageInputElement = htmlElement.querySelector('.inputs-container--input') as HTMLInputElement;

        console.log(this);
    }

    public init(serverUrl: string, user: IUser): void {
        this.serverUrl = serverUrl;
        this.user = user;
        this.webSocket = new WebSocket(this.serverUrl);

        this.attachEvents();
        this.attachListeners();
    }

    private attachEvents(): void {
        this.webSocket.addEventListener("open", (ev) => {
            // you can continue your logic here
            console.log('open', ev);
            this.onSocketConnected();
        }, { once: true });

        this.webSocket.addEventListener("message", (ev: MessageEvent) => {
            const message: ISocketMessage = JSON.parse(ev.data);

            switch(message.kind) {
                case messageKindEnum.getMessages:
                break;

                case messageKindEnum.newMessage:
                    this.renderNewMessage(message.data);
            }
            console.log('message', message);
        });
    }

    private renderNewMessage(message: INewMessage): void {
        
    }

    private attachListeners() {
        this.sendButtonElement.addEventListener('click', () => {
            const message = this.messageInputElement.value;
            this.messageInputElement.value = '';
            this.sendMessage(message);
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
        console.log('sending message', message);
    }

    private onSocketConnected(): void {
        const message: ISocketMessage = {
            kind: messageKindEnum.getMessages,
            data: null
        };

        this.webSocket.send(JSON.stringify(message));
    }
}
