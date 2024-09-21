import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
export default function Index() {
  const { pKey = 'A' } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    navigate(`/dashboard/${pKey}`);
  }, []);

  return (
    <p id="zero-state">
      This is a demo for React Router.
      <br />
      Check out{' '}
      <a href="https://reactrouter.com">the docs at reactrouter.com</a>.
    </p>
  );
}
