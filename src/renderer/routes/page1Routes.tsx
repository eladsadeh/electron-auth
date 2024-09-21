import React from 'react';
import { TabA } from './TabA';
import { About } from './About';

export const routes = [
  {
    path: 'tabA',
    element: <TabA />,
  },
  { path: 'team', element: <About /> },
];
