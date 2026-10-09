import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Info */}
          <div className="footer-brand">
            <div className="footer-logo">
              <span>NOVA</span>
              <span className="brand-badge" />
            </div>
            <p className="footer-tagline">
              Thoughtfully curated everyday essentials, minimalist electronics, handcrafted accessories, and modern home goods.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h4 className="footer-col-title">Categories</h4>
            <ul className="footer-links">
              <li><Link to="/#catalog" className="footer-link">Electronics</Link></li>
              <li><Link to="/#catalog" className="footer-link">Accessories</Link></li>
              <li><Link to="/#catalog" className="footer-link">Home & Living</Link></li>
              <li><Link to="/#catalog" className="footer-link">Lifestyle</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="footer-col-title">Store</h4>
            <ul className="footer-links">
              <li><Link to="/" className="footer-link">Featured Drop</Link></li>
              <li><Link to="/cart" className="footer-link">View Cart</Link></li>
              <li><span className="footer-link" style={{ cursor: 'default' }}>Free Shipping &gt; ₹2,000</span></li>
              <li><span className="footer-link" style={{ cursor: 'default' }}>Secure Checkout</span></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="footer-col-title">Stay Connected</h4>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-inverse-muted)', marginBottom: '12px' }}>
              Subscribe for new release previews and exclusive design archives.
            </p>
            {subscribed ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-lime)', fontSize: '0.88rem', fontWeight: 600 }}>
                <CheckCircle2 size={18} />
                <span>Thank you for subscribing!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="footer-newsletter-form">
                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="footer-newsletter-input"
                  aria-label="Email for newsletter subscription"
                />
                <button type="submit" className="btn btn-lime btn-sm" aria-label="Subscribe to newsletter">
                  <ArrowRight size={16} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} NOVA Minimalist Goods. All rights reserved. Submission-Ready Assessment.</p>
          <p style={{ display: 'flex', gap: '16px' }}>
            <span>Crafted with React & Vite</span>
            <span>•</span>
            <span>INR Pricing</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
