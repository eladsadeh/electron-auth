import { type User } from 'oidc-client-ts';
// import ReactDOM from 'react-dom/client';

import { userManager } from './userManager';
// import { getSavedProjectKey, LAST_PROJECT_KEY_COOKIE } from 'helpers';

// async function fetchXapisUser(email?: string) {
//   if (!email) return Promise.resolve(null);
//   const data = await Xapis.User.get(email);
//   return data.status === 200 ? data.data : null;
// }

export async function initUser(): Promise<User | null> {
  // await new Promise((res) => setTimeout(res, 1000));
  let authUser = await userManager.getUser();
  if (authUser) {
    console.log('initUser::refreshing token');
    authUser = await userManager
      .signinSilent()
      .then((user) => user)
      .catch((err) => {
        console.log('initUser::Error renewing token:', err);
        return null;
      });
  }

  return Promise.resolve(authUser);
}
