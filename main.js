//main.js

//import lib for use une root page
const { BrowserWindow, app, Menu } = require('electron');
const path = require('path');
const fs = require('fs');

//join preload.js and disabled
const p = path.join(__dirname, "preload.js");
const file = path.join(__dirname, "sources/disabled");

//set variable micro
let micro = "";
//use set point micro for check if micro = true
try { micro = fs.readFileSync(path.join(__dirname, "micro.js"), "utf8"); } catch { }

//start server.js
//require('./core/bridge/server.js');

//Check if the file exists.
if (fs.existsSync(file)) {
    //set entry point to the file
    const disables = fs.readFileSync(file, "utf8").split("\n").map(l => l.trim()).filter(l => l !== "");
    disables.forEach(flag => app.commandLine.appendSwitch(flags));
}

//set variable (fenetre)
let fenetre;

//hide menu bar electron
Menu.setApplicationMenu(null);

//set lck to app.request...........
const lck = app.requestSingleInstanceLock();

//check if lck = true
if (!lck) {
    //if lck = true = exit process force
    process.exit(0);
    //if lck = false we excute browser
} else {

    function createIndependentWindow(url) {
        const win = new BrowserWindow({
            width: 1000,
            height: 700,
            minWidth: 700,
            minHeight: 700,
            icon: path.join(__dirname, 'ressources/corex-perchance.png'),
            webPreferences: {
                preload: fs.existsSync(p) ? p : undefined,
                contextIsolation: true,
                webSecurity: true,
                sandbox: false,
                nodeIntegration: false
            }
        });

        win.loadURL(url);

        win.webContents.on('before-input-event', (event, input) => {
            const ctrl = input.control || input.meta;
            if ((ctrl && input.key.toLowerCase() === 'r') || input.key === 'F5') {
                event.preventDefault();
                win.webContents.reload();
            }
        });

        win.webContents.setWindowOpenHandler(({ url: childUrl }) => {
            createIndependentWindow(childUrl);
            return { action: 'deny' };
        });

        return win;
    }

    //create function browser
    function browser() {
        //set (fenetre to new browserwindow)
        fenetre = new BrowserWindow({
            //set icon app
            icon: path.join(__dirname, 'ressources/corex-perchance.png'),

            //set width and height en max-w / max-h
            width: 1000,
            height: 700,
            minWidth: 700,
            minHeight: 700,

            //set webpreferences
            webPreferences: {
                //verif if preload if exist and use preload
                preload: fs.existsSync(p) ? p : undefined,

                //set true 
                contextIsolation: true,
                webSecurity: true,
                backgroundThrottling: true,

                //set false
                sandbox: false,
                nodeIntegration: false,
                enableRemoteModule: false,
                webviewTag: false,
                nodeIntegrationInSubFrames: false,
                allowRunningInsecureContent: false,
                experimentalFeatures: false,
                offscreen: false
            }
        });

        //load website
        fenetre.loadURL("https://perchance.org/corex-perchance");

        fenetre.webContents.setWindowOpenHandler(({ url }) => {
            createIndependentWindow(url);
            return { action: 'deny' };
        });

        //System for page refreshing F5 and Ctrl+R
        fenetre.webContents.on('before-input-event', (event, input) => {
            const ctrl = input.control || input.meta;

            if ((ctrl && input.key.toLowerCase() === 'r') || input.key === 'F5') {
                event.preventDefault();
                if (input.shift) fenetre.webContents.reloadIgnoringCache();
                else fenetre.webContents.reload();
            }
        });

        //system for detect micro
        fenetre.webContents.session.setPermissionRequestHandler((webContents, permission, callback) => {
            if (permission === 'media' || permission === 'audioCapture') {
                callback(false);
                webContents.executeJavaScript(micro).catch(() => { });
            } else {
                callback(true);
            }
        });
    }

    //call function (browser)
    app.whenReady().then(async () => {
        browser();
    });

    app.on('window-all-closed', (e) => {
        app.quit();
    });
}