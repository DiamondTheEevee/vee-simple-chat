import './login-component.css'
import template from './login-component.html?raw';
import { CustomEventListener } from '../custom-event-listener/custom-event-listener';

export class LoginComponent {
    public htmlElement!: HTMLElement;
    private eventListener = new CustomEventListener();

    constructor(container: HTMLElement) {
        const htmlElement = document.createElement('div');
        htmlElement.innerHTML = template;
        container.appendChild(htmlElement);
    }
}
