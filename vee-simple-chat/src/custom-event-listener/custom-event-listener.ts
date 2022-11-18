import { IEventListener, IEvent, ISubscription, ICallbackFunction } from './custom-event-listener.model';

export class CustomEventListener implements IEventListener {
    private subscriptions: ISubscription[] = [];

    public addEventListener(eventName: string, callbackFunction: ICallbackFunction): void {
        const subscription: ISubscription = {
            eventName,
            callbackFunction
        }

        this.subscriptions.push(subscription);
    }

    public emit(eventName: string, message: IEvent): void {
        this.subscriptions.forEach(subscription => {
            if (subscription.eventName === eventName) {
                subscription.callbackFunction(message);
            }
        });
    }
}
