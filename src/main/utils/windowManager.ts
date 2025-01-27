import { app, BrowserWindow, globalShortcut } from 'electron';

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

// Zmienna przechowująca referencję do okna
let progressWindow: BrowserWindow | null = null;

// Tworzenie okna paska postępu
const createAssistantWindow = async (): Promise<void> => {
    if (progressWindow) {
        progressWindow.show()
        progressWindow.focus(); // Jeśli okno istnieje, skup się na nim
        return;
    }

    progressWindow = new BrowserWindow({
        width: 800,
        height: 800,
        vibrancy: 'popover',
        backgroundMaterial: 'acrylic',
        webPreferences: {
            preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
        }
    });

    // HTML treść okna
    await progressWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

    globalShortcut.register('F12', () => {
        progressWindow?.webContents.toggleDevTools(); // Toggles DevTools on F12 key press
    });

};

app.on('window-all-closed', () => {
    progressWindow = null
    globalShortcut.unregister('F12');

})

const getAssistantWindow = (): BrowserWindow | null => {
    return progressWindow;
}

// Eksport funkcji
export { createAssistantWindow, getAssistantWindow };
