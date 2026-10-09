import React from 'react';

export const LoadingState = ({ count = 6, type = 'grid' }) => {
  if (type === 'detail') {
    return (
      <div className="container product-detail-page">
        <div className="skeleton-box" style={{ width: '200px', height: '20px', marginBottom: '32px' }} />
        <div className="product-detail-grid">
          <div className="skeleton-box" style={{ width: '100%', aspectRatio: '1/1', borderRadius: '24px' }} />
          <div>
            <div className="skeleton-box" style={{ width: '120px', height: '24px', marginBottom: '16px' }} />
            <div className="skeleton-box" style={{ width: '85%', height: '48px', marginBottom: '20px' }} />
            <div className="skeleton-box" style={{ width: '160px', height: '28px', marginBottom: '24px' }} />
            <div className="skeleton-box" style={{ width: '100%', height: '120px', marginBottom: '32px' }} />
            <div className="skeleton-box" style={{ width: '240px', height: '52px' }} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="product-grid" aria-label="Loading products" aria-busy="true">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="product-card"
          style={{ padding: 0 }}
        >
          <div className="skeleton-box" style={{ width: '100%', aspectRatio: '1/1' }} />
          <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div className="skeleton-box" style={{ width: '40%', height: '14px' }} />
            <div className="skeleton-box" style={{ width: '90%', height: '22px' }} />
            <div className="skeleton-box" style={{ width: '70%', height: '16px' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
              <div className="skeleton-box" style={{ width: '35%', height: '26px' }} />
              <div className="skeleton-box" style={{ width: '30%', height: '36px', borderRadius: '8px' }} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingState;
