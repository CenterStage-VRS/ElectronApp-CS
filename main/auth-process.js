// main/auth-process.js

const { BrowserWindow } = require('electron');
const authService = require('../services/auth-service');
//const createAppWindow = require('../main/app-process');

let win = null;

function createAuthWindow() {
  destroyAuthWin();

  win = new BrowserWindow({
    width: 1000,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      enableRemoteModule: false,
      contextIsolation: false,
    },
    fullscreen: false,
    frame: true,
    icon: 'logo.png'
  });
  win.setMenuBarVisibility(false);
  win.loadURL(authService.getAuthenticationURL());

  const {session: {webRequest}} = win.webContents;

  const filter = {
    urls: [
      'http://localhost/callback*'
    ]
  };

  webRequest.onBeforeRequest(filter, async ({url}) => {
    await authService.loadTokens(url);
    //createAppWindow();
    return destroyAuthWin();
  });

  win.on('authenticated', () => {
    destroyAuthWin();
  });

  win.on('closed', () => {
    win = null;
  });
}

function destroyAuthWin() {
  if (!win) return;
  win.close();
  win = null;
}

function createLogoutWindow() {
  const logoutWindow = new BrowserWindow({
    show: true,
  });

  logoutWindow.loadURL(authService.getLogOutUrl());

  logoutWindow.on('ready-to-show', async () => {
    await authService.logout();
    //logoutWindow.close();
  });
}

module.exports = {
  createAuthWindow,
  createLogoutWindow,
};