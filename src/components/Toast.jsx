import React from 'react';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';
import { useCart } from '../hooks/useCart';

export const Toast = () => {
  const { toasts, removeToast } = useCart();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container" aria-live="polite" aria-atomic="true">
      {toasts.map((toast) => {
        const icon =
          toast.type === 'warning' ? (
            <AlertTriangle className="toast-icon" size={18} />
          ) : toast.type === 'info' ? (
            <Info className="toast-icon" size={18} />
          ) : (
            <CheckCircle2 className="toast-icon" size={18} />
          );

        return (
          <div
            key={toast.id}
            className={`toast-card ${toast.type || 'success'}`}
            role="status"
          >
            <div className="toast-content-wrapper">
              {icon}
              <span>{toast.message}</span>
            </div>
            <button
              type="button"
              className="toast-close-btn"
              onClick={() => removeToast(toast.id)}
              aria-label="Dismiss notification"
            >
              <X size={15} />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Toast;
