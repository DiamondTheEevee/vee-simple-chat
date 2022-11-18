import template from './chat-component.html?raw';
import { CustomEventListener, IEvent } from '../custom-event-listener';
import { messageKindEnum, IMessage } from './chat-component.model';
import { IChatComponentView } from './chat-component-view.model';

export class ChatComponentView implements IChatComponentView {
    public htmlElement!: HTMLElement;
    public events = new CustomEventListener();

    private messageInputElement!: HTMLInputElement;
    private messageTemplateElement!: HTMLTemplateElement;
    private chatWindowMessages!: HTMLDivElement;
    private formElement!: HTMLFormElement;
 
    constructor(private container: HTMLElement) {
        this.appendChatToContainer();

        this.attachListeners();
        console.log(this);
    }

    public renderMessage(message: IMessage): void {
        const clone = this.messageTemplateElement.content.cloneNode(true) as DocumentFragment;        
        const authorDiv = clone.querySelector('.message--author') as HTMLDivElement;
        const messageDiv = clone.querySelector('.message-text') as HTMLDivElement;

        authorDiv.innerText = message.author;
        messageDiv.innerText = message.text;

        this.chatWindowMessages.appendChild(clone);
        this.srollChatToBottom();
    }

    public onNewMessage(callbackFunction: (arg0: IEvent) => void) {
        this.events.addEventListener('newMessage', ((event: IEvent) => {
            callbackFunction(event);
        }));
    }

    private appendChatToContainer(): void {
        const htmlElement = document.createElement('div');
        htmlElement.classList.add('chat-component');
        htmlElement.innerHTML = template;
        this.container.appendChild(htmlElement);

        this.htmlElement = htmlElement;
        this.messageInputElement = htmlElement.querySelector('.inputs-container--input') as HTMLInputElement;
        this.messageTemplateElement = htmlElement.querySelector('[name="message-template"]') as HTMLTemplateElement;
        this.chatWindowMessages = htmlElement.querySelector('.chat-window--messages') as HTMLDivElement;
        this.formElement = htmlElement.querySelector('.chat-window--inputs-container') as HTMLFormElement;
    }

    private attachListeners(): void {
        this.formElement.onsubmit = (ev) => {
            ev.preventDefault();
            const message = this.messageInputElement.value;
            this.messageInputElement.value = '';
            this.events.emit(messageKindEnum.newMessage, {
                data: message
            });
        }
    }

    private srollChatToBottom(): void {
        this.chatWindowMessages.scrollTop = this.chatWindowMessages.scrollHeight;
    }
}
