import { useEffect } from 'react';
import {
  Outlet,
  useNavigate,
  useParams,
  NavLink,
  useLocation,
} from 'react-router-dom';
import { Log } from 'oidc-client-ts';
import { useAuth } from '../auth';

const links = [
  {
    to: 'dashboard',
  },
  {
    to: 'settings',
  },
  {
    to: 'translations',
  },
];

export default function Root() {
  const navigate = useNavigate();
  const auth = useAuth();

  const { pKey } = useParams();
  const pageName = useLocation().pathname.split('/')[1];

  const { isAuthenticated, isLoading, activeNavigator } = auth;
  console.log('Root::auth', {
    isAuthenticated,
    isLoading,
    activeNavigator,
    user: auth.user,
    events: auth.events,
  });

  const login = () => {
    auth.signinRedirect().catch((e) => {
      console.error('error signing in::', e);
    });
  };

  const logout = () => {
    auth.signoutRedirect().catch((e) => {
      console.error('error signing out::', e);
    });
  };

  const refresh = () => {
    auth
      .signinSilent()
      .then((user) => {
        console.log(
          'Token refreshed::expired at',
          user ? new Date((user.expires_at || 0) * 1000) : 'N/A'
        );
      })
      .catch((e) => {
        console.error('error refreshing token::', e);
      });
  };

  const showAuthInfo = () => {
    const { user } = auth;
    console.log({
      email: user?.profile?.email,
      expired: user?.expired,
      expireAt: new Date((user?.expires_at || 0) * 1000).toString(),
      authenticated: auth.isAuthenticated,
    });
  };
  useEffect(() => {
    window.api &&
      window.api.onSSORedirect((url: string) => {
        navigate(url);
      });
  }, [navigate]);
  // useEffect(() => {
  //   // the `return` is important - addAccessTokenExpiring() returns a cleanup function
  //   return auth.events.addAccessTokenExpiring(() => {
  //     console.log('token expiring');
  //     auth
  //       .signinSilent()
  //       .then((user) => {
  //         console.log(
  //           'Token refreshed::expires at',
  //           user ? new Date((user.expires_at || 0) * 1000) : 'N/A'
  //         );
  //       })
  //       .catch((e) => {
  //         console.error('error refreshing token::', e);
  //       });
  //   });
  // }, [auth.events, auth.signinSilent]);

  if (!isAuthenticated && !isLoading) {
    return (
      <div>
        <p>Not authenticated</p>
        <button onClick={login}>Login</button>
      </div>
    );
  }

  if (isLoading && !auth.isSigninSilent) {
    return (
      <div>
        <p>Root::Loading...</p>
        <p>{auth.activeNavigator}</p>
      </div>
    );
  }

  return (
    <div className="content">
      <div id="sidebar">
        <nav>
          <h2>Pages</h2>
          <ul>
            {links.map((p) => (
              <li key={p.to}>
                <NavLink
                  to={`${p.to}/${pKey || 'A'}`}
                  className={({ isActive, isPending }) =>
                    isActive ? 'active' : isPending ? 'pending' : ''
                  }
                >
                  {p.to}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <h4>Pages without navigation</h4>
        <ul style={{ paddingLeft: 20 }}>
          <li>
            <NavLink
              to={`/rootA`}
              className={({ isActive, isPending }) =>
                isActive ? 'active' : isPending ? 'pending' : ''
              }
            >
              rootA
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/rootB`}
              className={({ isActive, isPending }) =>
                isActive ? 'active' : isPending ? 'pending' : ''
              }
            >
              rootB
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="body">
        <div className="header">
          <div className="pageName">{pageName}</div>
          <select
            defaultValue={pKey}
            className="selector"
            onChange={(ev) => {
              navigate(`dashboard/${ev.target.value}`);
            }}
          >
            <option value="A" label="Project A" />
            <option value="B" label="Project B" />
            <option value="C" label="Project C" />
          </select>
          <button onClick={logout}>Logout</button>
          <button onClick={refresh}>Refresh</button>
          <button onClick={showAuthInfo}>Auth</button>
          <button onClick={auth.removeUser}>remove User</button>
        </div>
        <div id="detail">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
