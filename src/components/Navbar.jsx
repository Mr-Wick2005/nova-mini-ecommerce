import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ShoppingBag, ArrowUpRight } from 'lucide-react';
import { useCart } from '../hooks/useCart';

export const Navbar = () => {
  const { totalItems } = useCart();

  return (
    <header className="navbar-wrapper">
      <div className="container navbar-inner">
        {/* Brand Wordmark */}
        <Link to="/" className="brand-logo" aria-label="NOVA Home">
          <span>NOVA</span>
          <span className="brand-badge" aria-hidden="true" />
        </Link>

        {/* Navigation Links */}
        <nav aria-label="Main Navigation">
          <ul className="nav-links">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                end
              >
                Collection
              </NavLink>
            </li>
            <li>
              <Link to="/#catalog" className="nav-link">
                All Products
              </Link>
            </li>
            <li>
              <span className="nav-link" style={{ cursor: 'default', opacity: 0.55 }}>
                About
              </span>
            </li>
          </ul>
        </nav>

        {/* Cart Trigger */}
        <div className="nav-actions">
          <Link
            to="/cart"
            className="cart-button-link"
            aria-label={`Shopping cart with ${totalItems} items`}
          >
            <ShoppingBag size={18} strokeWidth={2} />
            <span style={{ fontSize: '0.88rem' }}>Cart</span>
            {totalItems > 0 && (
              <span className="cart-count-badge" aria-label={`${totalItems} total items`}>
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
