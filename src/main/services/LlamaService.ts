import { AssistantMessage, UserMessage } from "../../types";
import ApiService from "./ApiService";

export class LlamaService {

    private apiService

    constructor() {
        this.apiService = ApiService.getClient("http://localhost:11434");
    }

    async handleUserPrompt(message: UserMessage): Promise<AssistantMessage | null> {
        try {
            const payload = {
                model: "deepseek-r1:32b",
                prompt: message.text,
                stream: false
            }

            const response = await this.apiService.post("/api/generate", payload)

            console.log(response.data);
            return {
                role: "assistant",
                text: response.data.response
            }
        } catch (e) {
            console.error(e);
        }
    }
}