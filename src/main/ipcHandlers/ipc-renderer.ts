import { ipcRenderer, IpcRendererEvent } from "electron";
import { IPCChannels, IPCPayloadMap } from "../../types";

declare global {
    interface Window {
        api: {
            send<T extends IPCChannels>(
                channel: T,
                payload: IPCPayloadMap[T]
            ): void,
            receive<T extends IPCChannels>(
                channel: T,
                callback: (event: IpcRendererEvent, response: IPCPayloadMap[T]) => void
            ): void;
        }
    }
}

type RendererHandler<T extends IPCChannels> = (
    event: IpcRendererEvent,
    request: IPCPayloadMap[T]
) => Promise<void>

export const onRendererIpc = <T extends IPCChannels>(channel: T, handler: RendererHandler<T>) => {
    window.api.receive(channel, handler)
}