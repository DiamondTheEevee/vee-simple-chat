import { IEvent, ISubscription } from './custom-event-listener.model';

export class CustomEventListener {
    private subscriptions: ISubscription[]  = [];

    public addEventListener(eventName: string, callbackFunction: any): void {
        const subscription: ISubscription = {
            eventName,
            callbackFunction
        }

        this.subscriptions.push(subscription);
    }

    public emit(eventName: string, message: IEvent): void {
        this.subscriptions.forEach(subscription => {
            console.log('subscription', subscription);
            if (subscription.eventName === eventName) {
                subscription.callbackFunction(message);
            }
        });
    }
}
