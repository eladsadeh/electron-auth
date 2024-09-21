import { useRouteLoaderData } from 'react-router-dom';
export const About = () => {
  console.log('About::RouteLoaderData:', useRouteLoaderData());
  return <div className="tab">About the team</div>;
};
