import './login-component.css'
import template from './login-component.html?raw';
import { CustomEventListener } from '../custom-event-listener/custom-event-listener';
import { AbstractComponent } from '../component/abstract.component';

export class LoginComponent extends AbstractComponent {
    public htmlElement!: HTMLElement;
    private eventListener = new CustomEventListener();

    constructor(container: HTMLElement) {
        super(container);
        const htmlElement = document.createElement('div');
        htmlElement.innerHTML = template;
        container.appendChild(htmlElement);
    }
}
