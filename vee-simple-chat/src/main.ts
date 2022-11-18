import './style.css'
import { ChatComponent, IUser } from './chat-component';
import { CustomEventListener } from './custom-event-listener';
import { ChatComponentView } from './chat-component/chat-component.view';
class Main {
    private chatComponent!: ChatComponent;

    constructor(private url: string) {

    }

    public init(): void {
        // const loginComponent = new LoginComponent(documentBody);
        // loginComponent.addEventListener
        const user: IUser = {
            name: 'Eevee'
        };
        this.runChat(user);
    }

    private runChat(user: IUser): void {
        const chatContainer = this.appendChatContainer();
        const chatComponentView = new ChatComponentView(chatContainer);
        this.chatComponent = new ChatComponent(chatComponentView);
        this.chatComponent.init(this.url, user);
    }

    private appendChatContainer(): HTMLElement {
        const documentBody = <HTMLElement>document.querySelector('body');        
        
        const chatConatiner = document.createElement('div');
        chatConatiner.classList.add('chat-container');

        documentBody.appendChild(chatConatiner);

        return chatConatiner;
    }
}

const url = 'wss://intive.herokuapp.com/';
new Main(url).init();

const event = new CustomEventListener();
event.addEventListener('abc', (ev) => {
    console.log('Event Kicked', ev);
});

setTimeout(() => {
    event.emit('abc', { data: 'a' });
}, 3000);
