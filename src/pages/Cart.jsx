import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Trash2, ShoppingBag, ShieldCheck, ArrowRight, Sparkles, CheckCircle } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { formatINR } from '../utils/currency';
import { CartItem } from '../components/CartItem';
import { EmptyState } from '../components/EmptyState';
import { DemoCheckoutModal } from '../components/DemoCheckoutModal';

export const Cart = () => {
  const {
    items,
    totalItems,
    subtotal,
    shippingFee,
    totalPrice,
    isEligibleForFreeShipping,
    amountToFreeShipping,
    freeShippingThreshold,
    clearCart,
  } = useCart();

  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // If cart is empty, show polished Empty State
  if (items.length === 0) {
    return (
      <div className="container cart-page">
        <EmptyState
          type="cart"
          title="Your Shopping Bag is Empty"
          message="Discover our carefully curated line of minimalist electronics, accessories, and home goods."
          actionLink="/"
          actionText="Explore NOVA Collection"
        />
      </div>
    );
  }

  const shippingProgressPercentage = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  return (
    <div className="cart-page">
      <div className="container">
        {/* Page Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <Link to="/" className="btn btn-ghost btn-sm" style={{ paddingLeft: 0, marginBottom: '8px', display: 'inline-flex' }}>
              <ArrowLeft size={16} />
              <span>Continue Shopping</span>
            </Link>
            <h1 className="section-title">Shopping Bag ({totalItems} {totalItems === 1 ? 'item' : 'items'})</h1>
          </div>

          <div>
            {showClearConfirm ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--status-danger)', fontWeight: 600 }}>
                  Clear all items?
                </span>
                <button
                  type="button"
                  className="btn btn-sm btn-danger-ghost"
                  onClick={() => {
                    clearCart();
                    setShowClearConfirm(false);
                  }}
                >
                  Yes, Clear
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-secondary"
                  onClick={() => setShowClearConfirm(false)}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                type="button"
                className="btn btn-sm btn-ghost"
                onClick={() => setShowClearConfirm(true)}
              >
                <Trash2 size={15} />
                <span>Clear Bag</span>
              </button>
            )}
          </div>
        </div>

        {/* Layout Grid */}
        <div className="cart-layout-grid">
          {/* Cart Items List Card */}
          <div className="cart-items-card">
            <div className="cart-items-header">
              <h2 className="cart-table-title">Selected Items</h2>
              <span style={{ fontSize: '0.86rem', color: 'var(--text-tertiary)' }}>
                Prices in INR (GST inclusive)
              </span>
            </div>

            <div role="list" aria-label="Items in your shopping bag">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          </div>

          {/* Order Summary Card */}
          <aside className="cart-summary-card" aria-label="Order summary">
            <h2 className="summary-title">Order Summary</h2>

            {/* Free Shipping Meter */}
            <div className="free-shipping-meter">
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 600 }}>
                {isEligibleForFreeShipping ? (
                  <>
                    <CheckCircle size={16} color="var(--status-success)" />
                    <span style={{ color: 'var(--status-success)' }}>You unlocked Free Express Shipping!</span>
                  </>
                ) : (
                  <>
                    <Sparkles size={16} color="var(--accent-lime-text)" />
                    <span>
                      Add <strong>{formatINR(amountToFreeShipping)}</strong> more for Free Shipping
                    </span>
                  </>
                )}
              </div>

              <div className="shipping-progress-track" role="progressbar" aria-valuenow={shippingProgressPercentage} aria-valuemin={0} aria-valuemax={100}>
                <div
                  className="shipping-progress-bar"
                  style={{ width: `${shippingProgressPercentage}%` }}
                />
              </div>
            </div>

            {/* Cost Breakdown */}
            <div className="summary-breakdown">
              <div className="summary-row">
                <span>Items Subtotal ({totalItems})</span>
                <strong>{formatINR(subtotal)}</strong>
              </div>

              <div className="summary-row">
                <span>Estimated Shipping</span>
                <span>
                  {shippingFee === 0 ? (
                    <strong style={{ color: 'var(--status-success)' }}>FREE</strong>
                  ) : (
                    formatINR(shippingFee)
                  )}
                </span>
              </div>

              <div className="summary-row">
                <span>Goods &amp; Services Tax (GST)</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)' }}>Included</span>
              </div>

              <div className="summary-row total">
                <span>Total Amount</span>
                <span>{formatINR(totalPrice)}</span>
              </div>
            </div>

            {/* Checkout CTA */}
            <button
              type="button"
              className="btn btn-lime btn-lg"
              style={{ width: '100%', marginTop: '8px' }}
              onClick={() => setIsCheckoutModalOpen(true)}
            >
              <span>Proceed to Demo Checkout</span>
              <ArrowRight size={18} />
            </button>

            {/* Security Guarantee */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              <ShieldCheck size={16} color="var(--status-success)" />
              <span>Simulated Safe Checkout &amp; Data Protection</span>
            </div>
          </aside>
        </div>
      </div>

      {/* Demo Checkout Modal */}
      <DemoCheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
      />
    </div>
  );
};

export default Cart;
