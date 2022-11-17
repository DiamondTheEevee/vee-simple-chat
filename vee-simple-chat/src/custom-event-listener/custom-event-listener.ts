import { IMessage, ISubscription } from './custom-event-listener.model';

export class CustomEventListener {
    private subscriptions: ISubscription[]  = [];

    public on(callbackFunction: () => {}): void {
        const subscription: ISubscription = {
            id: String(Math.random()),
            callbackFunction
        }

        this.subscriptions.push(subscription);
    }

    public emit(message: IMessage): void {
        this.subscriptions.forEach(subscription => {
            subscription.callbackFunction(message);
        });
    }
}
