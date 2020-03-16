const electron = require('electron');

const { app, BrowserWindow } = electron;
const path = require('path');
const isDev = require('electron-is-dev');

let win;

function createWindow() {
    win = new BrowserWindow({
        width: 900,
        height: 680,
        webPreferences: {
            nodeIntegration: true,
        },
    });
    win.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);

    if (isDev) {
        win.webContents.openDevTools();
    }

    win.on('closed', () => {
        win = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});
