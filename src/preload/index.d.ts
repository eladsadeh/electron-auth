import { ElectronAPI } from '@electron-toolkit/preload';

declare global {
  interface Window {
    electron: ElectronAPI;
    api: {
      onSSORedirect: (cb: (url: string) => void) => void;
    };
    sendPing: () => void;
  }
}
