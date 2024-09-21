import { useRouteError, useNavigate } from 'react-router-dom';

export default function PeopleError() {
  const error = useRouteError();
  console.log(error);
  const navigate = useNavigate();

  return (
    <div id="error-page">
      <h1>Oops! People Error</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <button onClick={() => navigate('/')}>Go Home</button>
    </div>
  );
}
