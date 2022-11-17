import './style.css'
import typescriptLogo from './typescript.svg'
import { setupCounter } from './counter'
import { Socket } from './socket/socket';
import { LoginComponent } from './login-component/login-component';
import { ChatComponent, IUser } from './chat-component';

class Main {
    private chatComponent!: ChatComponent;

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
        this.chatComponent = new ChatComponent(chatContainer);
        this.chatComponent.init('wss://intive.herokuapp.com/', user);
    }

    private appendChatContainer(): HTMLElement {
        const documentBody = <HTMLElement>document.querySelector('body');        
        
        const chatConatiner = document.createElement('div');
        chatConatiner.classList.add('chat-container');

        documentBody.appendChild(chatConatiner);

        return chatConatiner;
    }
}

new Main().init();


// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)

// const socket = new Socket('wss://intive.herokuapp.com/');
// socket.connect();

