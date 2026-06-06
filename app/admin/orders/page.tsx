"use client";

import React, { useState, useEffect } from "react";
import { useApp } from "../../context/AppContext";
import { supabase } from "../../lib/supabase";

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

export default function AdminOrdersPage() {
  const { isDbConnected } = useApp();
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedInvoice, setSelectedInvoice] = useState<Order | null>(null);

  const fetchOrders = async () => {
    let liveOrders = [];
    if (isDbConnected) {
      try {
        const { data, error } = await supabase
          .from("orders")
          .select("*")
          .order("date", { ascending: false });
        if (error) throw error;
        if (data) {
          liveOrders = data.map((o: any) => {
            let itemsArray = [];
            try {
              itemsArray = typeof o.items === "string" ? JSON.parse(o.items) : o.items;
            } catch (e) {
              itemsArray = o.items || [];
            }
            if (!Array.isArray(itemsArray)) {
              itemsArray = [itemsArray].filter(Boolean);
            }
            return {
              ...o,
              items: itemsArray
            };
          });
        }
      } catch (err) {
        console.error("Failed to fetch live orders from Supabase:", err);
      }
    }
    
    // Load local orders from localStorage
    let localOrders = [];
    if (typeof window !== "undefined") {
      const localOrdersStr = localStorage.getItem("beautybooth_local_orders");
      const rawLocal = localOrdersStr ? JSON.parse(localOrdersStr) : [];
      localOrders = rawLocal.map((o: any) => {
        let itemsArray = [];
        try {
          itemsArray = typeof o.items === "string" ? JSON.parse(o.items) : o.items;
        } catch (e) {
          itemsArray = o.items || [];
        }
        if (!Array.isArray(itemsArray)) {
          itemsArray = [itemsArray].filter(Boolean);
        }
        return {
          ...o,
          items: itemsArray
        };
      });
    }
    
    // Merge live orders and local orders
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
    
    setOrders(mergedOrders);
  };

  useEffect(() => {
    fetchOrders();
  }, [isDbConnected]);

  const handleStatusChange = async (orderId: string, newStatus: "Pending" | "Processing" | "Shipped" | "Delivered") => {
    if (isDbConnected) {
      try {
        const { error } = await supabase
          .from("orders")
          .update({ status: newStatus })
          .eq("id", orderId);
        if (error) throw error;
      } catch (err: any) {
        alert("Failed to update status in Supabase: " + err.message);
      }
    }
    
    // Always update local state
    const updated = orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o);
    setOrders(updated);
    
    // Update local storage if applicable
    if (typeof window !== "undefined") {
      const localOrdersStr = localStorage.getItem("beautybooth_local_orders");
      if (localOrdersStr) {
        const localOrders = JSON.parse(localOrdersStr);
        const updatedLocal = localOrders.map((o: any) => o.id === orderId ? { ...o, status: newStatus } : o);
        localStorage.setItem("beautybooth_local_orders", JSON.stringify(updatedLocal));
      }
    }
  };

  const filteredOrders = orders.filter(o => {
    const matchesSearch = o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          o.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          o.phone.includes(searchQuery);
    const matchesStatus = statusFilter === "All" || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-emerald-50 text-emerald-600 border-emerald-200/60";
      case "Pending":
        return "bg-amber-50 text-amber-600 border-amber-200/60";
      case "Processing":
        return "bg-sky-50 text-sky-600 border-sky-200/60";
      default:
        return "bg-zinc-50 text-zinc-500 border-zinc-200";
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-black text-zinc-900 tracking-tight">Order Operations</h1>
        <span className="text-[13px] font-bold text-zinc-400 uppercase tracking-widest">
          Manage live shipping pipelines
        </span>
      </div>

      {/* Filter bar */}
      <div className="bg-white border border-zinc-100 rounded-3xl p-6 flex flex-col md:flex-row items-center gap-4 shadow-xs">
        {/* Search */}
        <div className="flex-1 w-full relative">
          <input
            type="text"
            placeholder="Search by Order ID, customer name or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-50/50 border border-zinc-200 rounded-2xl py-3 px-4 text-sm text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-[#FF1A58] focus:bg-white transition-all font-semibold"
          />
        </div>

        {/* Status Filter */}
        <div className="w-full md:w-48">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full bg-zinc-50/50 border border-zinc-200 rounded-2xl py-3 px-4 text-sm text-zinc-700 font-bold focus:outline-none focus:border-[#FF1A58] focus:bg-white transition-all"
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>
      </div>

      {/* Order List */}
      <div className="bg-white border border-zinc-100 rounded-3xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-100 text-xs uppercase tracking-widest text-zinc-400 font-extrabold select-none bg-zinc-50/30">
                <th className="py-4.5 px-6">Order ID</th>
                <th className="py-4.5 px-6">Customer Details</th>
                <th className="py-4.5 px-6">Total Items</th>
                <th className="py-4.5 px-6">Pipeline Status</th>
                <th className="py-4.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50">
              {filteredOrders.map((order) => {
                const subtotal = order.items.reduce((acc, curr) => acc + (curr.price * curr.qty), 0);
                const grandTotal = subtotal + order.shipping;
                return (
                  <tr key={order.id} className="hover:bg-zinc-50/30 transition-colors">
                    {/* ID */}
                    <td className="py-4 px-6">
                      <div className="flex flex-col">
                        <span className="text-sm font-black text-zinc-900">{order.id}</span>
                        <span className="text-xs font-semibold text-zinc-400 mt-0.5">{order.date}</span>
                      </div>
                    </td>

                    {/* Customer */}
                    <td className="py-4 px-6">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-zinc-700 leading-normal">{order.customer}</span>
                        <span className="text-xs font-semibold text-zinc-400 mt-0.5">{order.phone}</span>
                      </div>
                    </td>

                    {/* Items & Total */}
                    <td className="py-4 px-6 select-text">
                      <div className="flex flex-col">
                        <span className="text-sm font-black text-[#FF1A58]">৳{grandTotal}</span>
                        <span className="text-xs font-semibold text-zinc-500 mt-0.5">
                          {order.items.length} item(s) • includes ৳{order.shipping} ship
                        </span>
                      </div>
                    </td>

                    {/* Status Toggler */}
                    <td className="py-4 px-6">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value as any)}
                        className={`text-xs font-black uppercase px-3 py-1.5 rounded-full border focus:outline-none cursor-pointer ${getStatusStyle(order.status)}`}
                      >
                        <option value="Pending" className="text-amber-600 font-bold bg-white">Pending</option>
                        <option value="Processing" className="text-sky-600 font-bold bg-white">Processing</option>
                        <option value="Shipped" className="text-zinc-500 font-bold bg-white">Shipped</option>
                        <option value="Delivered" className="text-emerald-600 font-bold bg-white">Delivered</option>
                      </select>
                    </td>

                    {/* Invoice Actions */}
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => setSelectedInvoice(order)}
                        className="bg-[#FF1A58]/10 hover:bg-[#FF1A58] text-[#FF1A58] hover:text-white px-4 py-2 rounded-xl text-xs font-bold transition-all border border-[#FF1A58]/20 hover:border-[#FF1A58] cursor-pointer active:scale-95 duration-100"
                      >
                        View Invoice
                      </button>
                    </td>
                  </tr>
                );
              })}

              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-xs font-semibold text-zinc-400 select-none">
                    No orders matched your search filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invoice Viewer Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-zinc-200/80 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl animate-fade-in text-left">
            <div className="p-6 border-b border-zinc-100 flex items-center justify-between">
              <span className="font-extrabold text-lg text-zinc-900">Order Receipt & Invoice</span>
              <button onClick={() => setSelectedInvoice(null)} className="text-zinc-400 hover:text-zinc-900 cursor-pointer font-bold">✕</button>
            </div>
            
            <div className="p-6 flex flex-col gap-6 select-text">
              {/* Header block */}
              <div className="flex justify-between items-start gap-4">
                <div className="flex flex-col gap-1">
                  <span className="font-extrabold text-zinc-900 text-base">Glow Market BD</span>
                  <span className="text-[11px] font-semibold text-zinc-500 leading-normal max-w-[200px]">
                    Faridpur sadar, Faridpur
                  </span>
                </div>
                <div className="flex flex-col items-end gap-0.5 text-right">
                  <span className="text-sm font-black text-[#FF1A58]">{selectedInvoice.id}</span>
                  <span className="text-[11px] font-semibold text-zinc-400">{selectedInvoice.date}</span>
                </div>
              </div>

              {/* Delivery Details */}
              <div className="bg-zinc-50 p-4 rounded-2xl border border-zinc-100 flex flex-col gap-2">
                <span className="text-[10px] uppercase font-black text-zinc-400 tracking-widest">Billing & Shipping Details</span>
                <div className="flex flex-col gap-1.5 mt-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-zinc-500">Customer:</span>
                    <span className="font-bold text-zinc-800">{selectedInvoice.customer}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-zinc-500">Phone:</span>
                    <span className="font-bold text-zinc-800">{selectedInvoice.phone}</span>
                  </div>
                  <div className="flex flex-col text-xs mt-1 pt-1.5 border-t border-zinc-200/60">
                    <span className="font-bold text-zinc-500">Delivery Address:</span>
                    <span className="font-bold text-zinc-800 mt-1 leading-normal">{selectedInvoice.address}</span>
                  </div>
                </div>
              </div>

              {/* Order Items Table */}
              <div className="flex flex-col gap-3">
                <span className="text-[10px] uppercase font-black text-zinc-400 tracking-widest">Cart Summary</span>
                <div className="flex flex-col gap-2">
                  {selectedInvoice.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center bg-zinc-50/50 p-3 rounded-xl border border-zinc-100 text-xs">
                      <div className="flex flex-col gap-0.5 max-w-[240px]">
                        <span className="font-bold text-zinc-800 truncate">{item.name}</span>
                        <span className="text-[10px] font-semibold text-zinc-400 font-sans">Qty: {item.qty} @ ৳{item.price}</span>
                      </div>
                      <span className="font-black text-zinc-800 shrink-0">৳{item.price * item.qty}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Summary totals */}
              <div className="border-t border-zinc-100 pt-4 flex flex-col gap-2">
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-zinc-500">Subtotal:</span>
                  <span className="font-bold text-zinc-800">
                    ৳{selectedInvoice.items.reduce((acc, curr) => acc + (curr.price * curr.qty), 0)}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-zinc-500">Shipping Fee:</span>
                  <span className="font-bold text-zinc-800">৳{selectedInvoice.shipping}</span>
                </div>
                <div className="flex justify-between text-sm pt-2 border-t border-zinc-100 font-black">
                  <span className="text-zinc-800">Total Paid:</span>
                  <span className="text-[#FF1A58]">
                    ৳{selectedInvoice.items.reduce((acc, curr) => acc + (curr.price * curr.qty), 0) + selectedInvoice.shipping}
                  </span>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-2">
                <button
                  onClick={() => alert("Invoice printed successfully!")}
                  className="bg-zinc-50 hover:bg-zinc-100 text-zinc-700 px-5 py-2.5 rounded-xl text-xs font-black uppercase transition-all cursor-pointer border border-zinc-200 active:scale-95 duration-100"
                >
                  Print Receipt
                </button>
                <button
                  onClick={() => setSelectedInvoice(null)}
                  className="bg-[#FF1A58] hover:bg-[#e11d48] text-white px-5 py-2.5 rounded-xl text-xs font-black uppercase transition-all cursor-pointer shadow-md active:scale-95 duration-100"
                >
                  Close Invoice
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
