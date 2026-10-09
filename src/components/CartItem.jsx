import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import { formatINR } from '../utils/currency';
import { useCart } from '../hooks/useCart';
import { QuantitySelector } from './QuantitySelector';
import { ImageWithFallback } from './ImageWithFallback';

export const CartItem = ({ item }) => {
  const { incrementQuantity, decrementQuantity, removeFromCart } = useCart();
  const lineSubtotal = item.price * item.quantity;
  const stockLimit = typeof item.stock === 'number' ? item.stock : 99;

  return (
    <div className="cart-item-row" data-item-id={item.id}>
      {/* Thumbnail */}
      <Link to={`/products/${item.id}`} className="cart-item-thumb" tabIndex={-1}>
        <ImageWithFallback
          src={item.imageUrl}
          alt={item.name}
        />
      </Link>

      {/* Item info */}
      <div className="cart-item-info">
        <span className="cart-item-category">{item.category}</span>
        <Link to={`/products/${item.id}`} className="cart-item-name">
          {item.name}
        </Link>
        <span className="cart-item-unit-price">
          Unit Price: <strong>{formatINR(item.price)}</strong>
        </span>
        {item.quantity >= stockLimit && (
          <span style={{ fontSize: '0.75rem', color: 'var(--status-warning)', fontWeight: 600 }}>
            Max stock reached ({stockLimit})
          </span>
        )}
      </div>

      {/* Controls & Subtotal */}
      <div className="cart-item-actions-col">
        <div className="cart-item-subtotal">
          {formatINR(lineSubtotal)}
        </div>

        <div className="cart-item-controls-row">
          <QuantitySelector
            quantity={item.quantity}
            onIncrement={() => incrementQuantity(item.id)}
            onDecrement={() => decrementQuantity(item.id)}
            min={1}
            max={stockLimit}
            size="compact"
            ariaLabel={`Quantity for ${item.name}`}
          />

          <button
            type="button"
            className="btn btn-danger-ghost btn-sm"
            onClick={() => removeFromCart(item.id)}
            aria-label={`Remove ${item.name} from cart`}
            title={`Remove ${item.name}`}
            style={{ padding: '6px 8px' }}
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
