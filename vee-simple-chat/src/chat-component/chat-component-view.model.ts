import { IMessage } from "./chat-component.model";
import { IEvent } from "../custom-event-listener";

export interface IChatComponentView {
    renderMessage: (arg0: IMessage) => void,
    onNewMessage: (arg0: (arg0: IEvent) => void) => void
}
