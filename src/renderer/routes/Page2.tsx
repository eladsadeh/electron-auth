import React from 'react';
import { useParams } from 'react-router-dom';

export const Page2 = () => {
  console.log('Page2.params:', useParams());
  const { pKey } = useParams();
  return (
    <div>
      <div>Page2: Project {pKey}</div>
    </div>
  );
};
