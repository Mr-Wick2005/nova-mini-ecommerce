import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, AlertCircle, ShoppingBag } from 'lucide-react';
import { formatINR } from '../utils/currency';
import { useCart } from '../hooks/useCart';

export const DemoCheckoutModal = ({ isOpen, onClose }) => {
  const { items, totalItems, totalPrice, clearCart, addToast } = useCart();
  const [isCompleted, setIsCompleted] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [formData, setFormData] = useState({
    name: 'Alex Morgan',
    email: 'alex.morgan@example.com',
    address: '402 Skyline Boulevard, Indiranagar',
    city: 'Bengaluru, Karnataka',
  });

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleConfirmDemoOrder = (e) => {
    e.preventDefault();
    const demoId = 'NOVA-' + Math.floor(100000 + Math.random() * 900000);
    setOrderNumber(demoId);
    setIsCompleted(true);
    clearCart(false); // clear cart quietly
    addToast(`Demo order #${demoId} successfully placed!`, 'success', 5000);
  };

  const handleCloseModal = () => {
    setIsCompleted(false);
    onClose();
  };

  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-modal-title"
      onClick={handleCloseModal}
    >
      <div
        className="modal-card"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h3 id="checkout-modal-title" className="modal-title">
            {isCompleted ? 'Demo Order Confirmed' : 'Demo Checkout Experience'}
          </h3>
          <button
            type="button"
            className="btn-ghost"
            onClick={handleCloseModal}
            aria-label="Close modal"
            style={{ padding: '6px', borderRadius: '50%' }}
          >
            <X size={20} />
          </button>
        </div>

        {isCompleted ? (
          <div>
            <div className="modal-body" style={{ textAlign: 'center', alignItems: 'center' }}>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'var(--accent-lime-subtle)',
                  color: 'var(--accent-lime-text)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '8px',
                }}
              >
                <CheckCircle2 size={36} />
              </div>

              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 800 }}>
                Thank You for Your Demo Order!
              </h4>

              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '380px' }}>
                Your simulated purchase was received. A mock confirmation has been dispatched to{' '}
                <strong>{formData.email}</strong>.
              </p>

              <div
                style={{
                  background: 'var(--bg-surface-subtle)',
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-md)',
                  padding: '16px 24px',
                  width: '100%',
                  textAlign: 'left',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  fontSize: '0.9rem',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Order Number:</span>
                  <strong>{orderNumber}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Deliver To:</span>
                  <span>{formData.name}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Destination:</span>
                  <span>{formData.city}</span>
                </div>
              </div>

              <div className="demo-notice-box" style={{ width: '100%' }}>
                <strong>Assessment Note:</strong> No payment was processed and no physical goods will be shipped.
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                style={{ width: '100%' }}
                onClick={handleCloseModal}
              >
                Continue Browsing NOVA
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleConfirmDemoOrder}>
            <div className="modal-body">
              <div className="demo-notice-box">
                <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                  <AlertCircle size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong>Demonstration Mode:</strong> Backend services, live payment gateways, and order persistence are out of scope.
                  </div>
                </div>
              </div>

              {/* Order Quick Summary */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: 'var(--bg-surface-subtle)',
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-light)',
                }}
              >
                <div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 700 }}>
                    Order Total ({totalItems} items)
                  </div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 800 }}>
                    {formatINR(totalPrice)}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--status-success)', fontSize: '0.85rem', fontWeight: 600 }}>
                  <ShieldCheck size={18} />
                  <span>Secure Demo</span>
                </div>
              </div>

              {/* Mock Shipping Details */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <h4 style={{ fontSize: '0.92rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Shipping Information
                </h4>

                <div>
                  <label htmlFor="demo-name" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '4px' }}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="demo-name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="search-input"
                    style={{ borderRadius: 'var(--radius-md)', padding: '8px 12px' }}
                  />
                </div>

                <div>
                  <label htmlFor="demo-email" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '4px' }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="demo-email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="search-input"
                    style={{ borderRadius: 'var(--radius-md)', padding: '8px 12px' }}
                  />
                </div>

                <div>
                  <label htmlFor="demo-address" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '4px' }}>
                    Delivery Address
                  </label>
                  <input
                    type="text"
                    id="demo-address"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    className="search-input"
                    style={{ borderRadius: 'var(--radius-md)', padding: '8px 12px' }}
                  />
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-ghost"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-lime"
                disabled={items.length === 0}
              >
                Place Demo Order ({formatINR(totalPrice)})
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default DemoCheckoutModal;
