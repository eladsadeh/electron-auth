import { WebStorageStateStore, UserManagerSettings } from 'oidc-client-ts';
const { protocol, hostname, port } = window.location;
const origin = `${protocol}//${hostname}${port ? `:${port}` : ''}`;

const { VITE_OICD_CLIENT_ID, VITE_AUTH_AUTHORITY, VITE_OIDC_SCOPE } =
  import.meta.env;

export const oidcConfig: UserManagerSettings = {
  authority: `${VITE_AUTH_AUTHORITY}`,
  client_id: `${VITE_OICD_CLIENT_ID}`,
  redirect_uri: `glwebstudio://post_login/`,
  post_logout_redirect_uri: `glwebstudio://post_login/`,
  silent_redirect_uri: `glwebstudio://silent_renew`,
  scope: `${VITE_OIDC_SCOPE}`,
  response_type: 'code',
  automaticSilentRenew: false,
  revokeTokensOnSignout: true,
  filterProtocolClaims: true,
  loadUserInfo: true,
  redirectMethod: 'replace',
  silentRequestTimeoutInSeconds: 59, // seconds needed for renewal to timeout
  onSigninCallback: () => {
    window.history.replaceState(
      {},
      window.document.title,
      window.location.origin + window.location.pathname
    );
  },
  userStore: new WebStorageStateStore({ store: window.localStorage }),
};
