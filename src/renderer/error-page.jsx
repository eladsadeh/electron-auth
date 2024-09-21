import { useRouteError, useNavigate } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();
  console.log('ErrorPage::', error);
  const navigate = useNavigate();
  const { DEV } = import.meta.env;

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{DEV ? error.data || error.statusText : error.statusText}</i>
      </p>
      <button onClick={() => navigate(-1)}>Go Back</button>
    </div>
  );
}
