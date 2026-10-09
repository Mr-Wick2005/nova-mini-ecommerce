import React from 'react';
import { Minus, Plus } from 'lucide-react';

export const QuantitySelector = ({
  quantity = 1,
  onIncrement,
  onDecrement,
  min = 1,
  max = 99,
  disabled = false,
  size = 'default',
  ariaLabel = 'Product quantity',
}) => {
  const isMin = quantity <= min;
  const isMax = quantity >= max;

  return (
    <div
      className={`quantity-control ${size === 'compact' ? 'compact' : ''}`}
      role="group"
      aria-label={ariaLabel}
    >
      <button
        type="button"
        className="qty-btn"
        onClick={onDecrement}
        disabled={disabled || isMin}
        aria-label="Decrease quantity"
        title={isMin ? `Minimum quantity is ${min}` : 'Decrease quantity'}
      >
        <Minus size={size === 'compact' ? 14 : 16} strokeWidth={2.2} />
      </button>

      <span className="qty-display" aria-live="polite" aria-atomic="true">
        {quantity}
      </span>

      <button
        type="button"
        className="qty-btn"
        onClick={onIncrement}
        disabled={disabled || isMax}
        aria-label="Increase quantity"
        title={isMax ? `Maximum available stock is ${max}` : 'Increase quantity'}
      >
        <Plus size={size === 'compact' ? 14 : 16} strokeWidth={2.2} />
      </button>
    </div>
  );
};

export default QuantitySelector;
