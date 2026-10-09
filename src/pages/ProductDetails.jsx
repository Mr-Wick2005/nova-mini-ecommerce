import React, { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, ChevronRight, ArrowLeft, Check, ShieldCheck, Truck, RefreshCw, ShoppingBag } from 'lucide-react';
import productsData from '../data/products.json';
import { formatINR } from '../utils/currency';
import { useCart } from '../hooks/useCart';
import { QuantitySelector } from '../components/QuantitySelector';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { EmptyState } from '../components/EmptyState';

export const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, getItemQuantity } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  // Find product by id
  const product = useMemo(() => {
    if (!Array.isArray(productsData)) return null;
    return productsData.find((p) => String(p.id) === String(id));
  }, [id]);

  if (!product) {
    return (
      <div className="container" style={{ paddingTop: '40px', paddingBottom: '80px' }}>
        <EmptyState
          type="search"
          title="Product Not Found"
          message={`We couldn't locate a product with ID "${id}". It might have been moved or removed.`}
          actionLink="/"
          actionText="Back to Collection"
        />
      </div>
    );
  }

  const inCartCount = getItemQuantity(product.id);
  const maxStock = typeof product.stock === 'number' ? product.stock : 99;
  const isOutOfStock = maxStock <= 0;
  const isMaxAlreadyInCart = inCartCount >= maxStock;

  const handleIncrement = () => {
    if (quantity < maxStock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    if (isOutOfStock || isMaxAlreadyInCart) return;
    const res = addToCart(product, quantity);
    if (res.success) {
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 2400);
    }
  };

  return (
    <div className="product-detail-page">
      <div className="container">
        {/* Breadcrumb Navigation */}
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link to="/" className="breadcrumb-link">
            Home
          </Link>
          <ChevronRight size={14} className="breadcrumb-separator" aria-hidden="true" />
          <Link to="/#catalog" className="breadcrumb-link">
            {product.category}
          </Link>
          <ChevronRight size={14} className="breadcrumb-separator" aria-hidden="true" />
          <span className="breadcrumb-current" aria-current="page">
            {product.name}
          </span>
        </nav>

        {/* Product Details Grid */}
        <div className="product-detail-grid">
          {/* Gallery View */}
          <div className="product-gallery">
            <ImageWithFallback
              src={product.imageUrl}
              alt={product.name}
              className="gallery-main-img"
              loading="eager"
            />
          </div>

          {/* Product Information */}
          <div className="product-info-panel">
            <div className="product-header-badge-row">
              <span className="detail-category-badge">{product.category}</span>
              {product.badge && (
                <span className="product-badge" style={{ position: 'static' }}>
                  {product.badge}
                </span>
              )}
            </div>

            <h1 className="detail-title">{product.name}</h1>

            {/* Rating and Reviews */}
            <div className="detail-rating-row">
              <div className="product-rating" style={{ fontSize: '0.95rem' }}>
                <Star size={16} fill="#eab308" stroke="#eab308" />
                <span>{product.rating}</span>
                <span className="product-rating-reviews">({product.reviewCount} verified customer reviews)</span>
              </div>
            </div>

            {/* Price & Stock Indicator */}
            <div className="detail-price-box">
              <div className="detail-price-current">
                {formatINR(product.price)}
              </div>

              {isOutOfStock ? (
                <span className="stock-indicator out-of-stock">
                  <span className="stock-dot" />
                  <span>Out of Stock</span>
                </span>
              ) : maxStock <= 5 ? (
                <span className="stock-indicator low-stock">
                  <span className="stock-dot" />
                  <span>Low Stock: Only {maxStock} left</span>
                </span>
              ) : (
                <span className="stock-indicator in-stock">
                  <span className="stock-dot" />
                  <span>In Stock &amp; Ready to Ship</span>
                </span>
              )}
            </div>

            {/* Detailed Description */}
            <p className="detail-description">{product.description || product.shortDescription}</p>

            {/* Features Specification Card */}
            {product.features && product.features.length > 0 && (
              <div className="features-list-card">
                <h2 className="features-title">Key Specifications &amp; Highlights</h2>
                <ul className="features-list">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="feature-item">
                      <span className="feature-check-icon">
                        <Check size={12} strokeWidth={3} />
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Purchase Control Actions */}
            <div className="purchase-actions-box">
              <QuantitySelector
                quantity={quantity}
                onIncrement={handleIncrement}
                onDecrement={handleDecrement}
                min={1}
                max={maxStock}
                disabled={isOutOfStock}
                ariaLabel={`Select quantity of ${product.name}`}
              />

              <button
                type="button"
                className={`btn btn-lg ${justAdded ? 'btn-lime' : 'btn-primary'}`}
                onClick={handleAddToCart}
                disabled={isOutOfStock || isMaxAlreadyInCart}
                style={{ flex: '1 1 200px' }}
              >
                {justAdded ? (
                  <>
                    <Check size={18} strokeWidth={2.5} />
                    <span>Added to Cart!</span>
                  </>
                ) : isOutOfStock ? (
                  <span>Sold Out</span>
                ) : isMaxAlreadyInCart ? (
                  <span>Max Stock in Cart</span>
                ) : (
                  <>
                    <ShoppingBag size={18} />
                    <span>Add to Cart ({formatINR(product.price * quantity)})</span>
                  </>
                )}
              </button>

              <Link to="/cart" className="btn btn-secondary btn-lg">
                View Bag {inCartCount > 0 ? `(${inCartCount})` : ''}
              </Link>
            </div>

            {/* Guarantees Strip */}
            <div className="guarantees-grid">
              <div className="guarantee-card">
                <Truck size={20} className="guarantee-icon" />
                <div>
                  <div className="guarantee-title">Fast Shipping</div>
                  <div className="guarantee-desc">Dispatched within 24h</div>
                </div>
              </div>

              <div className="guarantee-card">
                <ShieldCheck size={20} className="guarantee-icon" />
                <div>
                  <div className="guarantee-title">2-Year Warranty</div>
                  <div className="guarantee-desc">Official NOVA guarantee</div>
                </div>
              </div>

              <div className="guarantee-card">
                <RefreshCw size={20} className="guarantee-icon" />
                <div>
                  <div className="guarantee-title">Easy Returns</div>
                  <div className="guarantee-desc">30-day trial window</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
