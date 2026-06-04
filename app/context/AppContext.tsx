"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { PRODUCTS_DATA } from "../data/products";
import { supabase, hasValidSupabaseConfig } from "../lib/supabase";

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
  products: Product[];
  productsLoading: boolean;
  isDbConnected: boolean;
  refreshProducts: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(() => {
    if (typeof window !== "undefined") {
      const local = localStorage.getItem("beautybooth_local_products");
      if (local) {
        try {
          return JSON.parse(local);
        } catch (e) {
          console.error("Failed to parse local products:", e);
        }
      }
    }
    return hasValidSupabaseConfig ? [] : PRODUCTS_DATA;
  });
  const [productsLoading, setProductsLoading] = useState(true);
  const [isDbConnected, setIsDbConnected] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const [wishlist, setWishlist] = useState<Set<number>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showCartDrawer, setShowCartDrawer] = useState(false);
  const [activeBoishakhiTab, setActiveBoishakhiTab] = useState("Hair Care");
  const [showQuickView, setShowQuickView] = useState<Product | null>(null);

  // Fetch products from Supabase strictly
  const refreshProducts = async () => {
    if (!hasValidSupabaseConfig) {
      if (typeof window !== "undefined") {
        const local = localStorage.getItem("beautybooth_local_products");
        setProducts(local ? JSON.parse(local) : PRODUCTS_DATA);
      } else {
        setProducts(PRODUCTS_DATA);
      }
      setIsDbConnected(false);
      setProductsLoading(false);
      return;
    }

    try {
      setProductsLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("id", { ascending: false });

      if (error) {
        throw error;
      }

      if (data) {
        setProducts(data as Product[]);
        setIsDbConnected(true);
        if (typeof window !== "undefined") {
          localStorage.setItem("beautybooth_local_products", JSON.stringify(data));
        }
      }
    } catch (err: any) {
      console.warn("Failed to fetch products from Supabase:", err.message || err);
      if (typeof window !== "undefined") {
        const local = localStorage.getItem("beautybooth_local_products");
        setProducts(local ? JSON.parse(local) : PRODUCTS_DATA);
      } else {
        setProducts(PRODUCTS_DATA);
      }
      setIsDbConnected(false);
    } finally {
      setProductsLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    if (typeof window !== "undefined" && !localStorage.getItem("beautybooth_local_products")) {
      localStorage.setItem("beautybooth_local_products", JSON.stringify(PRODUCTS_DATA));
    }
    refreshProducts();
  }, []);

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

  const cartTotal = cartItems.reduce((sum, item) => {
    const latestProduct = products.find((p) => p.id === item.product.id) || item.product;
    return sum + latestProduct.price * item.quantity;
  }, 0);

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
        products,
        productsLoading,
        isDbConnected,
        refreshProducts,
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

