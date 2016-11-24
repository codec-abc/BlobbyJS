/// <reference path="../typings/electron/electron.d.ts"/>
/// <reference path="../typings/node/node.d.ts"/>
"use strict";
const electron = require('electron');
// Module to control application life.
const app = electron.app;
const menu = electron.Menu;
const menuitem = electron.MenuItem;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;
/**
 * @brief   Main class of the application, initializing the windows and their
 *          contents.
 * @author  Denis CARLUS
 * @version 1.0     2016/05
 */
class BlobbyVolley {
    /**
     * @brief   Instantiation of the Animation Editor application.
     */
    static main() {
        app.on('window-all-closed', function () {
            if (process.platform != 'darwin') {
                app.quit();
            }
        });
        // This method will be called when Electron has finished initialization
        // and is ready to create browser windows.
        app.on('ready', function () {
            // Initialize main window.
            var mainWindow = BlobbyVolley.initializeMainWindow();
        });
    }
    /**
     * @brief   Initialization of the main window of Animation Editor
     *          application.
     */
    static initializeMainWindow() {
        const mainWindowWidth = 1024;
        const mainWindowHeight = 640;
        // Create the browser window.
        var mainWindow : Electron.BrowserWindow | null = new BrowserWindow({
            width: mainWindowWidth,
            height: mainWindowHeight
        });
        // Load the main.html of the app.
        mainWindow.loadURL('file://' + __dirname + '/index.html');
        // Open the DevTools.
        //mainWindow.webContents.openDevTools();
        // Unable resizing.
        mainWindow.setResizable(false);
        // Emitted when the window is closed.
        mainWindow.on('closed', function () {
            // Dereference the window object, usually you would store windows
            // in an array if your app supports multi windows, this is the time
            // when you should delete the corresponding element.
            mainWindow = null;
        });
        return mainWindow;
    }
}
/**
 * @brief   Path to the source files of the Animation Editor application.
 */
;
// Create the Animation Editor instance.
BlobbyVolley.main();
