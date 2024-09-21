import React from 'react';

import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  createHashRouter,
} from 'react-router-dom';

import { AuthProvider } from './auth/context/AuthProvider';
// import { oidcConfig } from './auth/oidcConfig';
import { userManager } from './auth/userManager';
import { initUser } from './auth/initUser';

import Root from './routes/root';
import { Page1, loader } from './routes/Page1';
import { Page2 } from './routes/Page2';
import { Page3 } from './routes/Page3';
import { RootA } from './routes/RootA';
import { RootB } from './routes/RootB';
import { Projects } from './routes/Projects';
import { NoNav } from './routes/NoNav';

import ErrorPage from './error-page';

import Index from './routes/index';

import './index.css';
import { About } from './routes/About';
import { TabA } from './routes/TabA';
import { PostLogin } from './routes/PostLogin';
import { PostLogout } from './routes/PostLogout';

const routes = [
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Index /> },
          {
            path: 'dashboard',
            element: <Projects />,
          },
          {
            path: 'dashboard/:pKey/*',
            element: <Page1 />,
            loader: loader,
            children: [
              {
                path: 'team',
                element: <About />,
              },
              {
                path: 'tabA',
                element: <TabA />,
              },
            ],
          },
          {
            path: 'settings/:pKey',
            element: <Page2 />,
          },
          {
            path: 'translations/:pKey',
            element: <Page3 />,
          },
        ],
      },
    ],
  },
  {
    element: <NoNav />,
    children: [
      {
        path: '/rootA',
        element: <RootA />,
      },
      {
        path: '/rootB',
        element: <RootB />,
      },
    ],
  },
  {
    path: '/post_login',
    element: <PostLogin />,
  },
  {
    path: '/post_logout',
    element: <PostLogout />,
  },
];

const root = ReactDOM.createRoot(document.getElementById('root')!);

// Render a loading screen while we initialize the user
root.render(<div>Intitalizing user ....</div>);

initUser().then(() => {
  // Render the app
  root.render(
    // <React.StrictMode>
    <AuthProvider
      userManager={userManager}
      onSigninCallback={() => {
        window.history.replaceState(
          {},
          window.document.title,
          window.location.origin + window.location.pathname
        );
      }}
    >
      <RouterProvider router={createHashRouter(routes)} />
    </AuthProvider>
    // </React.StrictMode>
  );
});
