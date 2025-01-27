import { AssistantMessage, UserMessage } from "../../types";


export enum IPCChannels {
    SendAssistantMessage = 'send-assistant-message',
    SendUserMessage = 'send-user-message',
    ShowProgressBar = 'show-progress-bar'
}

export interface IPCPayloadMap {
    [IPCChannels.SendUserMessage]: UserMessage;
    [IPCChannels.SendAssistantMessage]: AssistantMessage;
    [IPCChannels.ShowProgressBar]: boolean;
}