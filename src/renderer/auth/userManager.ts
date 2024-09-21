import { UserManager, Log } from 'oidc-client-ts';
import { oidcConfig } from './oidcConfig';

Log.setLevel(Log.DEBUG);
Log.setLogger(console);
console.log('userManager::', oidcConfig);
export const userManager = new UserManager(oidcConfig);

userManager.events.addSilentRenewError((err) => {
  console.warn('SilentRenewError::', err);
});

userManager.events.addAccessTokenExpiring(() => {
  console.log('token expiring');
  userManager
    .signinSilent()
    .then((user) => {
      console.log(
        'Token refreshed::expires at',
        user ? new Date((user.expires_at || 0) * 1000) : 'N/A'
      );
    })
    .catch((e) => {
      console.error('signinSilent Error::', e);
    });
});
