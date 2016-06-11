"use strict";
const electron = require('electron');
const app = electron.app;
const menu = electron.Menu;
const menuitem = electron.MenuItem;
const BrowserWindow = electron.BrowserWindow;
class BlobbyVolley {
    static main() {
        app.on('window-all-closed', function () {
            if (process.platform != 'darwin') {
                app.quit();
            }
        });
        app.on('ready', function () {
            var mainWindow;
            mainWindow = BlobbyVolley.initializeMainWindow();
        });
    }
    static initializeMainWindow() {
        const mainWindowWidth = 1280;
        const mainWindowHeight = 768;
        var mainWindow = new BrowserWindow({
            width: mainWindowWidth,
            height: mainWindowHeight
        });
        mainWindow.loadURL(BlobbyVolley.SourcesDirectory + '/views/screens/menus/main/content.html');
        mainWindow.webContents.openDevTools();
        mainWindow.on('closed', function () {
            mainWindow = null;
        });
        return mainWindow;
    }
}
BlobbyVolley.SourcesDirectory = 'file://' + __dirname;
;
BlobbyVolley.main();
