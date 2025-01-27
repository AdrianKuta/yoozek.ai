import { UserMessage } from "../../types";
import { LlamaService } from "./LlamaService";
import { sendAssistantMessage } from "../ipcHandlers";


export class AssistantService {

    async handleUserPrompt(message: UserMessage) {
        const service = new LlamaService()
        const response = await service.handleUserPrompt(message)
        await sendAssistantMessage(response)
    }
}