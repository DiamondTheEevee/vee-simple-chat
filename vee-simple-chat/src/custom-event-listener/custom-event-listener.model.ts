export interface IEventListener {
    addEventListener(arg0: string, arg1: ICallbackFunction): void;
    emit(eventName: string, message: IEvent): void;
}

export interface ICallbackFunction {
    (arg0: any): void;
}

export interface ISubscription {
    eventName: string;
    callbackFunction: (event: IEvent) => any;
}

export interface IEvent {
    data: any
}
