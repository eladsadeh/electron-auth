import { app, shell, BrowserWindow, ipcMain, safeStorage } from 'electron';
import os from 'os';
// import keytar from 'keytar';
import { join } from 'path';
import { electronApp, optimizer, is } from '@electron-toolkit/utils';
import icon from '../../resources/icon.png?asset';

console.log('user::', os.userInfo());

function logInRenderer(win: BrowserWindow, ...log: string[]) {
  win.webContents.send('main-log', ...log);
}

const encripted = safeStorage.encryptString(
  JSON.stringify({ name: 'John Doe' })
);
const decripted = safeStorage.decryptString(encripted);

console.log('encripted::', encripted.toString());
console.log('decripted::', decripted);

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1100,
    height: 970,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/preload.js'),
      sandbox: false,
      // devTools: true,
    },
  });

  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
    mainWindow.webContents.openDevTools({ mode: 'bottom' });
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    console.log('openExternal::', details);
    shell.openExternal(details.url);
    return { action: 'deny' };
  });

  // const filter = {
  //   urls: ['glwebstudio://post_login/'],
  // };

  // const {
  //   session: { webRequest },
  // } = mainWindow.webContents;

  // webRequest.onBeforeRequest(filter, ({ url }) => {
  //   console.log('main::', url);
  //   mainWindow.webContents.send('authEvent', url);
  // });
  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
  }

  return mainWindow;
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron');

  app.setAsDefaultProtocolClient('glwebstudio');

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  // IPC test
  ipcMain.on('ping', () => console.log('pong'));

  const win = createWindow();

  win.webContents.on('will-navigate', (event, url) => {
    logInRenderer(win, 'will-navigate::', url);
    console.log('will-navigate', event);
    if (url.includes('sso') && url.includes('transperfect.com')) {
      // open external
      event.preventDefault();
      shell.openExternal(url);
    }
  });
  app.on('open-url', (_, url) => {
    console.log('main::open-url:', url);
    if (url.includes('post_login')) {
      win.webContents.send('sso-redirect', url.replace('glwebstudio:/', ''));
    }
  });
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
