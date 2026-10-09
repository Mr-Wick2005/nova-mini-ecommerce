import React from 'react';
import { EmptyState } from '../components/EmptyState';

export const NotFound = () => {
  return (
    <div className="container" style={{ paddingTop: '60px', paddingBottom: '100px' }}>
      <EmptyState
        type="search"
        title="404 — Page Not Found"
        message="The page you are looking for does not exist, was renamed, or is temporarily unavailable."
        actionLink="/"
        actionText="Return to NOVA Home"
      />
    </div>
  );
};

export default NotFound;
