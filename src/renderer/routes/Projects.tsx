import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export const Projects = () => {
  console.log('Projects::params', useParams());
  const { pKey } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (!['A', 'B', 'C'].includes(pKey || '')) {
      navigate('A');
      // try {
      // throw new Response('', { status: 404, statusText: 'Contact Not Found' });
      // } catch {}
    } else {
      navigate(pKey || 'A');
    }
  }, [pKey]);
  return <div>Projects</div>;
};
