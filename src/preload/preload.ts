import { contextBridge, ipcRenderer } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';

console.log(process.contextIsolated, electronAPI);
// Custom APIs for renderer
const api = {
  onSSORedirect: (cb: (url: string) => void) => {
    ipcRenderer.on('sso-redirect', (ev, url) => {
      console.log('SSO redirect', url, ev);
      cb(url);
    });
  },
  sendPing: () => ipcRenderer.send('ping'),
};
ipcRenderer.on('authEvent', (_, url) => {
  console.log('authEvent:', url);
  const path = url.split('://')[1];
  console.log(path);
  window.location.href = `http://localhost:5000/${path}`;
});

ipcRenderer.on('main-log', (event, ...args) => {
  console.log('Main::', ...args);
});
// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI);
    contextBridge.exposeInMainWorld('api', api);
  } catch (error) {
    console.error(error);
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI;
  // @ts-ignore (define in dts)
  window.api = api;
}
