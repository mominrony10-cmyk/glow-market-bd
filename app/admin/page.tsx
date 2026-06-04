"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useApp } from "../context/AppContext";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ShoppingBag01Icon,
  ArrowRight01Icon,
  Coins01Icon,
  GridIcon,
} from "@hugeicons/core-free-icons";
import { supabase } from "../lib/supabase";

interface OrderItem {
  name: string;
  qty: number;
  price: number;
}

interface Order {
  id: string;
  customer: string;
  phone: string;
  address: string;
  date: string;
  items: OrderItem[];
  shipping: number;
  status: "Pending" | "Processing" | "Shipped" | "Delivered";
}

const INITIAL_MOCK_ORDERS: Order[] = [
  {
    id: "BB-9204",
    customer: "Farhana Yasmin",
    phone: "+8801712345678",
    address: "House 12, Road 4, Banani, Dhaka",
    date: "May 24, 2026 02:40 PM",
    items: [
      { name: "Anua Heartleaf 77% Soothing Toner (250ml)", qty: 1, price: 2100 }
    ],
    shipping: 60,
    status: "Delivered"
  },
  {
    id: "BB-9203",
    customer: "Imran Khan",
    phone: "+8801912987654",
    address: "Plot 3, Sector 7, Uttara, Dhaka",
    date: "May 24, 2026 01:15 PM",
    items: [
      { name: "AGE-R Booster Pro Facial Device Glow Treatment Pink", qty: 1, price: 24500 }
    ],
    shipping: 60,
    status: "Pending"
  },
  {
    id: "BB-9202",
    customer: "Nusrat Jahan",
    phone: "+8801643998877",
    address: "House 362, East Rampura, Dhaka 1219",
    date: "May 24, 2026 11:20 AM",
    items: [
      { name: "Niacinamide Brightening Essence (120ml)", qty: 2, price: 1850 }
    ],
    shipping: 60,
    status: "Processing"
  },
  {
    id: "BB-9201",
    customer: "Sajid Hasan",
    phone: "+8801811223344",
    address: "Moghbazar Outer Circular Rd, Dhaka 1217",
    date: "May 23, 2026 06:45 PM",
    items: [
      { name: "Sunsilk Power Shot Treatment For Damage Repair (20ml)", qty: 4, price: 160 }
    ],
    shipping: 60,
    status: "Delivered"
  },
  {
    id: "BB-9200",
    customer: "Ayesha Siddiqua",
    phone: "+8801555667788",
    address: "Block C, Lalmatia, Dhaka 1207",
    date: "May 23, 2026 04:30 PM",
    items: [
      { name: "L'Oréal Paris Elvive Bond Repair Shampoo (200ml)", qty: 1, price: 2350 }
    ],
    shipping: 60,
    status: "Processing"
  }
];

export default function AdminDashboardOverview() {
  const { products, isDbConnected } = useApp();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      let liveOrders: Order[] = [];
      if (isDbConnected) {
        try {
          const { data, error } = await supabase
            .from("orders")
            .select("*")
            .order("date", { ascending: false });
          if (error) throw error;
          if (data) {
            liveOrders = data as Order[];
          }
        } catch (err) {
          console.error("Failed to fetch live orders from Supabase:", err);
        }
      }
      
      let localOrders: Order[] = [];
      if (typeof window !== "undefined") {
        const localOrdersStr = localStorage.getItem("beautybooth_local_orders");
        localOrders = localOrdersStr ? JSON.parse(localOrdersStr) : [];
      }
      
      let mergedOrders = [...liveOrders];
      const liveIds = new Set(liveOrders.map(o => o.id));
      
      localOrders.forEach((o: any) => {
        if (!liveIds.has(o.id)) {
          mergedOrders.push(o);
        }
      });
      
      if (mergedOrders.length === 0) {
        mergedOrders = INITIAL_MOCK_ORDERS;
      }
      
      // Chronological sorting
      mergedOrders.sort((a, b) => {
        const timeA = new Date(a.date).getTime();
        const timeB = new Date(b.date).getTime();
        if (isNaN(timeA) || isNaN(timeB)) {
          return b.date.localeCompare(a.date);
        }
        return timeB - timeA;
      });

      setOrders(mergedOrders);
      setLoading(false);
    };

    fetchOrders();
  }, [isDbConnected]);

  // Dynamic calculations
  const totalRevenue = orders.reduce((sum, order) => {
    const subtotal = order.items.reduce((acc, curr) => acc + (curr.price * curr.qty), 0);
    return sum + subtotal + order.shipping;
  }, 0);

  const activeOrdersCount = orders.filter(o => o.status !== "Delivered").length;
  const pendingShipmentCount = orders.filter(o => o.status === "Pending").length;
  const categoryCount = new Set(products.map(p => p.category)).size;

  const metrics = [
    {
      title: "Total Revenue",
      value: `৳${totalRevenue.toLocaleString("en-US")}`,
      change: `${orders.length} order(s) processed`,
      icon: Coins01Icon,
      color: "text-[#FF1A58] bg-[#FF1A58]/10"
    },
    {
      title: "Active Orders",
      value: activeOrdersCount.toString(),
      change: `${pendingShipmentCount} pending shipment`,
      icon: ShoppingBag01Icon,
      color: "text-amber-600 bg-amber-50"
    },
    {
      title: "Product Catalog",
      value: products.length.toString(),
      change: `Across ${categoryCount} categories`,
      icon: GridIcon,
      color: "text-sky-600 bg-sky-50"
    }
  ];

  const recentOrders = orders.slice(0, 5).map(o => {
    const subtotal = o.items.reduce((acc, curr) => acc + (curr.price * curr.qty), 0);
    const grandTotal = subtotal + o.shipping;
    return {
      id: o.id,
      customer: o.customer,
      amount: `৳${grandTotal.toLocaleString("en-US")}`,
      status: o.status
    };
  });

  if (loading) {
    return (
      <div className="flex flex-col gap-8 animate-pulse">
        {/* Header Hero */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-col gap-2">
            <div className="h-8 w-32 bg-zinc-200 rounded-xl" />
            <div className="h-4 w-64 bg-zinc-100 rounded-xl" />
          </div>
        </div>
        
        {/* Grid metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <div key={n} className="bg-white border border-zinc-100 rounded-2xl p-6 flex items-center justify-between h-32">
              <div className="flex flex-col gap-2.5 w-2/3">
                <div className="h-3 w-16 bg-zinc-100 rounded-md" />
                <div className="h-8 w-24 bg-zinc-200 rounded-md" />
                <div className="h-3 w-28 bg-zinc-100 rounded-md" />
              </div>
              <div className="w-10 h-10 rounded-xl bg-zinc-100 shrink-0" />
            </div>
          ))}
        </div>

        {/* Detailed Data Rows */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white border border-zinc-100 rounded-3xl p-6 flex flex-col gap-6 h-96">
            <div className="h-6 w-32 bg-zinc-200 rounded-md border-b border-zinc-50 pb-4" />
            <div className="flex flex-col gap-4 divide-y divide-zinc-50">
              {[1, 2, 3, 4, 5].map((n) => (
                <div key={n} className="flex justify-between py-4 first:pt-0 last:pb-0">
                  <div className="flex flex-col gap-2">
                    <div className="h-4 w-16 bg-zinc-200 rounded-md" />
                    <div className="h-3 w-24 bg-zinc-100 rounded-md" />
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="h-4 w-12 bg-zinc-200 rounded-md" />
                    <div className="h-6 w-16 bg-zinc-100 rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white border border-zinc-100 rounded-3xl p-6 h-fit w-full">
            <div className="h-6 w-24 bg-zinc-200 rounded-md mb-6" />
            <div className="flex flex-col gap-4">
              <div className="h-12 bg-zinc-100 rounded-2xl" />
              <div className="h-12 bg-zinc-100 rounded-2xl" />
              <div className="h-12 bg-zinc-100 rounded-2xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {/* 1. Header Hero */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-black text-zinc-900 tracking-tight">Overview</h1>
          <p className="text-sm text-zinc-400 font-semibold leading-relaxed">
            Here is a quick snapshot of Glow Market BD storefront operations today.
          </p>
        </div>
      </div>

      {/* 2. Grid metrics (Clean 3-Column Layout with Icons) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map((metric) => (
          <div
            key={metric.title}
            className="bg-white border border-zinc-100 rounded-2xl p-6 flex items-center justify-between shadow-xs hover:border-[#FF1A58]/20 transition-all duration-200"
          >
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">{metric.title}</span>
              <span className="text-3xl font-black text-zinc-900 leading-none">{metric.value}</span>
              <span className="text-xs font-semibold text-zinc-400 mt-0.5">{metric.change}</span>
            </div>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${metric.color}`}>
              <HugeiconsIcon icon={metric.icon} size={20} />
            </div>
          </div>
        ))}
      </div>

      {/* 3. Detailed Data Rows */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recent Orders log */}
        <div className="lg:col-span-2 bg-white border border-zinc-100 rounded-3xl p-6 flex flex-col gap-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-zinc-50 pb-4">
            <div className="flex items-center gap-2.5">
              <HugeiconsIcon icon={ShoppingBag01Icon} className="text-[#FF1A58]" size={20} />
              <span className="font-extrabold text-base text-zinc-900">Recent Orders</span>
            </div>
            <Link href="/admin/orders" className="text-sm font-bold text-[#FF1A58] hover:underline flex items-center gap-1">
              <span>View All</span>
              <HugeiconsIcon icon={ArrowRight01Icon} size={12} />
            </Link>
          </div>

          <div className="divide-y divide-zinc-50">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between py-4 first:pt-0 last:pb-0"
              >
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-black text-zinc-900">{order.id}</span>
                  <span className="text-xs font-semibold text-zinc-400">{order.customer}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-black text-[#FF1A58]">{order.amount}</span>
                  <span
                    className={`text-xs font-black uppercase px-3 py-1 rounded-full ${
                      order.status === "Delivered"
                        ? "bg-emerald-50 text-emerald-600"
                        : order.status === "Pending"
                        ? "bg-amber-50 text-amber-600"
                        : "bg-sky-50 text-sky-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Shortcuts & Quick Operations */}
        <div className="bg-white border border-zinc-100 rounded-3xl p-6 flex flex-col gap-6 shadow-xs h-fit">
          <span className="font-extrabold text-base text-zinc-900 border-b border-zinc-50 pb-4">
            Quick Actions
          </span>
          <div className="flex flex-col gap-2.5">
            <Link
              href="/admin/products"
              className="flex items-center justify-between p-4 rounded-2xl bg-zinc-50 hover:bg-[#FF1A58]/5 hover:text-[#FF1A58] text-sm font-semibold text-zinc-700 transition-all border border-zinc-100/50"
            >
              <span>Manage Products</span>
              <HugeiconsIcon icon={ArrowRight01Icon} size={16} className="text-zinc-400 hover:text-[#FF1A58]" />
            </Link>
            <Link
              href="/admin/orders"
              className="flex items-center justify-between p-4 rounded-2xl bg-zinc-50 hover:bg-[#FF1A58]/5 hover:text-[#FF1A58] text-sm font-semibold text-zinc-700 transition-all border border-zinc-100/50"
            >
              <span>Order Pipelines</span>
              <HugeiconsIcon icon={ArrowRight01Icon} size={16} className="text-zinc-400 hover:text-[#FF1A58]" />
            </Link>
            <Link
              href="/admin/campaigns"
              className="flex items-center justify-between p-4 rounded-2xl bg-zinc-50 hover:bg-[#FF1A58]/5 hover:text-[#FF1A58] text-sm font-semibold text-zinc-700 transition-all border border-zinc-100/50"
            >
              <span>Campaign & Promos</span>
              <HugeiconsIcon icon={ArrowRight01Icon} size={16} className="text-zinc-400 hover:text-[#FF1A58]" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
