import React, { useState } from 'react';
import { ImageOff } from 'lucide-react';

export const ImageWithFallback = ({
  src,
  alt = 'Product image',
  className = '',
  loading = 'lazy',
  ...props
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`fallback-image-placeholder ${className}`}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f5f3ee',
          color: '#8e929d',
          width: '100%',
          height: '100%',
          minHeight: '180px',
          gap: '8px',
          padding: '16px',
          textAlign: 'center',
        }}
        role="img"
        aria-label={alt}
      >
        <ImageOff size={28} strokeWidth={1.5} />
        <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>Image unavailable</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={loading}
      onError={() => setHasError(true)}
      {...props}
    />
  );
};

export default ImageWithFallback;
