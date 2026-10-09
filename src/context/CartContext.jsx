import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { getStorageItem, setStorageItem } from '../utils/storage';

const CART_STORAGE_KEY = 'nova_cart_items_v1';
const FREE_SHIPPING_THRESHOLD = 2000;
const STANDARD_SHIPPING_FEE = 150;

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  // Initialize cart state safely from localStorage
  const [items, setItems] = useState(() => {
    const saved = getStorageItem(CART_STORAGE_KEY, []);
    return Array.isArray(saved) ? saved : [];
  });

  // Feedback Toast system
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success', duration = 3200) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Save to localStorage whenever items change
  useEffect(() => {
    setStorageItem(CART_STORAGE_KEY, items);
  }, [items]);

  /**
   * Add a product to the cart or increment quantity if already present
   */
  const addToCart = useCallback((product, qtyToAdd = 1) => {
    if (!product || !product.id) return { success: false, message: 'Invalid product' };

    const parsedQty = Math.max(1, parseInt(qtyToAdd, 10) || 1);
    let actionResult = { success: true, message: '' };

    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.id === product.id);
      const stockLimit = typeof product.stock === 'number' ? product.stock : 99;

      if (existingIndex > -1) {
        const existingItem = prevItems[existingIndex];
        const currentQty = existingItem.quantity;
        const newTotalQty = currentQty + parsedQty;

        if (newTotalQty > stockLimit) {
          const availableToAdd = stockLimit - currentQty;
          if (availableToAdd <= 0) {
            actionResult = {
              success: false,
              message: `Maximum available stock (${stockLimit}) already in cart.`,
            };
            return prevItems;
          }

          actionResult = {
            success: true,
            message: `Added ${availableToAdd} more to cart (max stock reached).`,
          };
          const updated = [...prevItems];
          updated[existingIndex] = { ...existingItem, quantity: stockLimit };
          return updated;
        }

        actionResult = {
          success: true,
          message: `Added ${parsedQty} more "${product.name}" to cart.`,
        };
        const updated = [...prevItems];
        updated[existingIndex] = { ...existingItem, quantity: newTotalQty };
        return updated;
      } else {
        const finalQty = Math.min(parsedQty, stockLimit);
        actionResult = {
          success: true,
          message: `Added "${product.name}" to your cart.`,
        };
        return [
          ...prevItems,
          {
            id: product.id,
            name: product.name,
            category: product.category,
            price: product.price,
            imageUrl: product.imageUrl,
            stock: stockLimit,
            quantity: finalQty,
          },
        ];
      }
    });

    if (actionResult.message) {
      addToast(actionResult.message, actionResult.success ? 'success' : 'warning');
    }
    return actionResult;
  }, [addToast]);

  /**
   * Explicitly remove an item from the cart
   */
  const removeFromCart = useCallback((productId) => {
    let removedItemName = '';
    setItems((prevItems) => {
      const target = prevItems.find((i) => i.id === productId);
      if (target) removedItemName = target.name;
      return prevItems.filter((i) => i.id !== productId);
    });

    if (removedItemName) {
      addToast(`Removed "${removedItemName}" from your cart.`, 'info');
    }
  }, [addToast]);

  /**
   * Update quantity of an item directly (bounded 1 to stock)
   */
  const updateQuantity = useCallback((productId, nextQty) => {
    const parsed = parseInt(nextQty, 10);
    if (isNaN(parsed) || parsed < 1) {
      return; // Do not decrement below 1; use removeFromCart explicitly
    }

    setItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.id !== productId) return item;
        const stock = typeof item.stock === 'number' ? item.stock : 99;
        const bounded = Math.min(parsed, stock);
        return { ...item, quantity: bounded };
      });
    });
  }, []);

  /**
   * Helper to increase quantity by 1
   */
  const incrementQuantity = useCallback((productId) => {
    setItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.id !== productId) return item;
        const stock = typeof item.stock === 'number' ? item.stock : 99;
        if (item.quantity >= stock) {
          addToast(`Maximum stock limit (${stock}) reached for this item.`, 'warning');
          return item;
        }
        return { ...item, quantity: item.quantity + 1 };
      });
    });
  }, [addToast]);

  /**
   * Helper to decrease quantity by 1 (clamped at 1)
   */
  const decrementQuantity = useCallback((productId) => {
    setItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.id !== productId) return item;
        if (item.quantity <= 1) {
          // Keep at 1 as per requirements; user can use explicit remove button
          return item;
        }
        return { ...item, quantity: item.quantity - 1 };
      });
    });
  }, []);

  /**
   * Clear all items from the cart
   */
  const clearCart = useCallback((showToast = true) => {
    setItems([]);
    if (showToast) {
      addToast('Your cart has been cleared.', 'info');
    }
  }, [addToast]);

  /**
   * Check quantity of a specific item in cart
   */
  const getItemQuantity = useCallback((productId) => {
    const found = items.find((i) => i.id === productId);
    return found ? found.quantity : 0;
  }, [items]);

  // Derived totals calculated on the fly (never stored in raw state)
  const totalItems = useMemo(() => {
    return items.reduce((acc, item) => acc + (item.quantity || 0), 0);
  }, [items]);

  const subtotal = useMemo(() => {
    return items.reduce((acc, item) => acc + ((item.price || 0) * (item.quantity || 0)), 0);
  }, [items]);

  const isEligibleForFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD || items.length === 0;
  const shippingFee = items.length === 0 ? 0 : isEligibleForFreeShipping ? 0 : STANDARD_SHIPPING_FEE;
  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const totalPrice = subtotal + shippingFee;

  const value = useMemo(() => ({
    items,
    totalItems,
    subtotal,
    shippingFee,
    totalPrice,
    isEligibleForFreeShipping,
    amountToFreeShipping,
    freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
    addToCart,
    removeFromCart,
    updateQuantity,
    incrementQuantity,
    decrementQuantity,
    clearCart,
    getItemQuantity,
    toasts,
    addToast,
    removeToast,
  }), [
    items,
    totalItems,
    subtotal,
    shippingFee,
    totalPrice,
    isEligibleForFreeShipping,
    amountToFreeShipping,
    addToCart,
    removeFromCart,
    updateQuantity,
    incrementQuantity,
    decrementQuantity,
    clearCart,
    getItemQuantity,
    toasts,
    addToast,
    removeToast,
  ]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
