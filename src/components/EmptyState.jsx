import React from 'react';
import { SearchX, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const EmptyState = ({
  type = 'search',
  title,
  message,
  actionText,
  onAction,
  actionLink,
}) => {
  const isCart = type === 'cart';

  const defaultTitle = isCart ? 'Your Cart is Empty' : 'No matching products found';
  const defaultMessage = isCart
    ? 'Looks like you haven’t added any items to your bag yet. Explore our curated catalog to get started.'
    : 'We couldn’t find any products matching your active filters. Try changing keywords or resetting filters.';
  const defaultActionText = isCart ? 'Start Shopping' : 'Clear Filters';

  return (
    <div className="state-container" role="status">
      <div className="state-icon-wrapper">
        {isCart ? <ShoppingBag size={32} /> : <SearchX size={32} />}
      </div>
      <h3 className="state-title">{title || defaultTitle}</h3>
      <p className="state-message">{message || defaultMessage}</p>

      {actionLink ? (
        <Link to={actionLink} className="btn btn-primary">
          <span>{actionText || defaultActionText}</span>
          <ArrowRight size={16} />
        </Link>
      ) : onAction ? (
        <button type="button" className="btn btn-primary" onClick={onAction}>
          <span>{actionText || defaultActionText}</span>
        </button>
      ) : null}
    </div>
  );
};

export default EmptyState;
