import React from 'react';
import {
  useParams,
  useRoutes,
  NavLink,
  Outlet,
  useLoaderData,
  useNavigation,
} from 'react-router-dom';

import { routes } from './page1Routes.jsx';

const projectsNames = {
  A: 'ProjectA',
  B: 'ProjectB',
  C: 'ProjectC',
};

export async function loader({ params }) {
  const project = projectsNames[params.pKey];
  await new Promise((res) => {
    setTimeout(res, Math.random() * 800);
  });
  if (!project) {
    throw new Response(`Project ${params.pKey} Not Found`, {
      status: 404,
      statusText: `Project Not Found`,
    });
  }
  return { project };
}

export const Page1 = () => {
  const { pKey } = useParams();
  const { state } = useNavigation();
  // const { project } = useLoaderData();

  if (state !== 'idle') return <div>Loading</div>;

  return (
    <div>
      <div>Page1: Project {pKey}</div>
      <nav className="tabs">
        {routes.map((r) => (
          <NavLink
            key={r.path}
            to={r.path}
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            {r.path}
          </NavLink>
        ))}
      </nav>
      <Outlet />
      {useRoutes(routes)}
    </div>
  );
};
