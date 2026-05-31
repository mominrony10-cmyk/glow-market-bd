"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

// Reuse the Product interface
export interface Product {
  id: number;
  brand: string;
  name: string;
  category: string;
  skinType: string;
  rating: number;
  price: number;
  originalPrice: number;
  discount: number;
  imageColor: string;
  imageUrl: string;
  isBogo: boolean;
  bogoLabel?: string;
  isFlashSale: boolean;
  isFlatPercentage: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

interface AppContextType {
  cartItems: CartItem[];
  cartCount: number;
  wishlist: Set<number>;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  toastMessage: string | null;
  setToastMessage: (msg: string | null) => void;
  showCartDrawer: boolean;
  setShowCartDrawer: (show: boolean) => void;
  addToCart: (product: Product, e?: React.MouseEvent) => void;
  removeFromCart: (productId: number) => void;
  toggleWishlist: (productId: number, e: React.MouseEvent) => void;
  cartTotal: number;
  activeBoishakhiTab: string;
  setActiveBoishakhiTab: (tab: string) => void;
  clearCart: () => void;
  showQuickView: Product | null;
  setShowQuickView: (product: Product | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const [wishlist, setWishlist] = useState<Set<number>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showCartDrawer, setShowCartDrawer] = useState(false);
  const [activeBoishakhiTab, setActiveBoishakhiTab] = useState("Hair Care");
  const [showQuickView, setShowQuickView] = useState<Product | null>(null);

  // Sync cart count
  useEffect(() => {
    const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(totalCount);
  }, [cartItems]);

  const addToCart = (product: Product, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.product.id === product.id);
      if (existing) {
        return prevItems.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { product, quantity: 1 }];
      }
    });

    setToastMessage(`"${product.name.substring(0, 30)}..." added to cart!`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const removeFromCart = (productId: number) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.product.id === productId);
      if (!existing) return prevItems;
      if (existing.quantity === 1) {
        return prevItems.filter((item) => item.product.id !== productId);
      } else {
        return prevItems.map((item) =>
          item.product.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
    });
  };

  const toggleWishlist = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setWishlist((prev) => {
      const copy = new Set(prev);
      if (copy.has(id)) {
        copy.delete(id);
      } else {
        copy.add(id);
        setToastMessage("Product added to your wishlist!");
        setTimeout(() => setToastMessage(null), 3000);
      }
      return copy;
    });
  };

  const cartTotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <AppContext.Provider
      value={{
        cartItems,
        cartCount,
        wishlist,
        searchQuery,
        setSearchQuery,
        toastMessage,
        setToastMessage,
        showCartDrawer,
        setShowCartDrawer,
        addToCart,
        removeFromCart,
        toggleWishlist,
        cartTotal,
        activeBoishakhiTab,
        setActiveBoishakhiTab,
        clearCart,
        showQuickView,
        setShowQuickView,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
