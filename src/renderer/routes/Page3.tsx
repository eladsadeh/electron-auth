import React from 'react';
import { useParams } from 'react-router-dom';

export const Page3 = () => {
  console.log('Page3.params:', useParams());
  const { pKey } = useParams();
  return (
    <div>
      <div>Page3: Project {pKey}</div>
    </div>
  );
};
