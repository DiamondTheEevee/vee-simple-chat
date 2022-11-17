import './chat-component.css'
import template from './chat-component.html?raw';
import { CustomEventListener } from '../custom-event-listener/custom-event-listener';
import { IUser } from './chat-component.model';

export class ChatComponent {
    public htmlElement!: HTMLElement;
    
    private webSocket!: WebSocket;
    private eventListener = new CustomEventListener();
    private serverUrl!: string;
    private user!: IUser;

    constructor(private container: HTMLElement) {
        const htmlElement = document.createElement('div');
        htmlElement.innerHTML = template;
        container.appendChild(htmlElement);
    }

    public init(serverUrl: string, user: IUser): void {
        this.serverUrl = serverUrl;
        this.user = user;
        this.webSocket = new WebSocket(this.serverUrl);

        this.attachEvents();
    }

    private attachEvents(): void {
        this.webSocket.addEventListener("open", (ev) => {
            // you can continue your logic here
            console.log('open', ev);
        }, { once: true });

        this.webSocket.addEventListener("message", (ev) => {
            // you can continue your logic here
            console.log('message', ev);
        }, { once: true });
    }
    
}
