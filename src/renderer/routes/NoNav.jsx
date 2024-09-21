import { Outlet } from 'react-router-dom';

export const NoNav = () => {
  return (
    <div style={{ backgroundColor: '#eeeeee', padding: 10 }}>
      <div>No Navigation layout component</div>
      <div style={{ border: '1px solid black' }}>
        <Outlet />
      </div>
    </div>
  );
};
