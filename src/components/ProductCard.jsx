import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Plus, Check } from 'lucide-react';
import { formatINR } from '../utils/currency';
import { useCart } from '../hooks/useCart';
import { ImageWithFallback } from './ImageWithFallback';

export const ProductCard = ({ product }) => {
  const { addToCart, getItemQuantity } = useCart();
  const quantityInCart = getItemQuantity(product.id);
  const isOutOfStock = product.stock <= 0;
  const isMaxInCart = quantityInCart >= product.stock;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock || isMaxInCart) return;
    addToCart(product, 1);
  };

  return (
    <article className="product-card" data-product-id={product.id}>
      <Link to={`/products/${product.id}`} className="product-image-container" tabIndex={-1}>
        <ImageWithFallback
          src={product.imageUrl}
          alt={product.name}
          className="product-image"
        />

        {product.badge && (
          <span className="product-badge">{product.badge}</span>
        )}

        {product.stock <= 5 && product.stock > 0 ? (
          <span className="product-stock-tag low-stock">Only {product.stock} left</span>
        ) : product.stock === 0 ? (
          <span className="product-stock-tag low-stock">Out of stock</span>
        ) : null}
      </Link>

      <div className="product-card-body">
        <div className="product-category-row">
          <span className="product-category-label">{product.category}</span>
          <div className="product-rating" title={`${product.rating} out of 5 stars based on ${product.reviewCount} reviews`}>
            <Star size={13} fill="#eab308" stroke="#eab308" />
            <span>{product.rating}</span>
            <span className="product-rating-reviews">({product.reviewCount})</span>
          </div>
        </div>

        <h3 style={{ margin: 0 }}>
          <Link to={`/products/${product.id}`} className="product-title-link">
            {product.name}
          </Link>
        </h3>

        <p className="product-short-desc">{product.shortDescription}</p>

        <div className="product-card-footer">
          <div className="product-price">
            {formatINR(product.price)}
          </div>

          <button
            type="button"
            className={`btn btn-sm ${quantityInCart > 0 ? 'btn-lime' : 'btn-primary'}`}
            onClick={handleAddToCart}
            disabled={isOutOfStock || isMaxInCart}
            aria-label={`Add ${product.name} to cart`}
            title={
              isOutOfStock
                ? 'Out of stock'
                : isMaxInCart
                ? 'Maximum stock already in cart'
                : `Add ${product.name} to cart`
            }
          >
            {quantityInCart > 0 ? (
              <>
                <Check size={14} strokeWidth={2.5} />
                <span>In Cart ({quantityInCart})</span>
              </>
            ) : (
              <>
                <Plus size={14} strokeWidth={2.5} />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
