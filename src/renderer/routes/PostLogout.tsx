import React, { Navigate } from 'react-router-dom';
// import { useGLGOAuth } from 'auth';
import { useAuth } from '../auth';
export const PostLogout = () => {
  const auth = useAuth();
  const { isAuthenticated = false, isLoading = false, error } = auth;

  if (isLoading) return <div>Logging you out ...</div>;

  if (isAuthenticated) return <Navigate to={'/'} replace />;

  if (error) {
    const { message } = error;
    console.error('auth.error: ', error);
    return <div>Post Logout: Oops... {message}</div>;
  }

  return <Navigate to={'/'} replace />;
};
