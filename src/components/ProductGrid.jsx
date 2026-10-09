import React from 'react';
import { ProductCard } from './ProductCard';

export const ProductGrid = ({ products = [] }) => {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className="product-grid" role="region" aria-label="Product catalog">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
