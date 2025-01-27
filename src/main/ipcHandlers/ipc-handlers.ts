import { onMainIpc, sendToRenderer } from "./ipc-main";
import { IPCChannels } from "./ipc-types";
import { getAssistantWindow } from "../utils";
import { AssistantMessage } from "../../types";
import { AssistantService } from "../services";

export const registerIpcHandlers = () => {
    userMessageHandler();
}

const userMessageHandler = () => {
    onMainIpc(IPCChannels.SendUserMessage, async (event, request) => {
        new AssistantService().handleUserPrompt(request)
    })
}

export const sendAssistantMessage = async (assistantMessage: AssistantMessage) => {
    const window = getAssistantWindow()
    if (window) {
        await sendToRenderer(window, IPCChannels.SendAssistantMessage, assistantMessage)
    }
}