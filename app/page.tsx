"use client";

import React from "react";
import HeroSlider from "./components/home/HeroSlider";
import TopCategories from "./components/home/TopCategories";
import TrendingBanners from "./components/home/TrendingBanners";
import CouponOffers from "./components/home/CouponOffers";
import ComboOffersBanner from "./components/home/ComboOffersBanner";
import BoishakhiCampaign from "./components/home/BoishakhiCampaign";
import BestOfferBrands from "./components/home/BestOfferBrands";
import Top3Beauty from "./components/home/Top3Beauty";
import FreeDeliveryBrands from "./components/home/FreeDeliveryBrands";
import BestOfSkincare from "./components/home/BestOfSkincare";
import FeaturedVideos from "./components/home/FeaturedVideos";
import FlatSalesPercentage from "./components/home/FlatSalesPercentage";
import ShopBySkinType from "./components/home/ShopBySkinType";
import OnSale from "./components/home/OnSale";
import ExclusiveAccessories from "./components/home/ExclusiveAccessories";
import BogoCampaign from "./components/home/BogoCampaign";
import CustomerReviews from "./components/home/CustomerReviews";
import FlashSale from "./components/home/FlashSale";
import OurBrands from "./components/home/OurBrands";
import VisitOutlet from "./components/home/VisitOutlet";
import SeoContentShowcase from "./components/home/SeoContentShowcase";

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans relative text-gray-900 antialiased selection:bg-rose-100 selection:text-brand">

      {/* --- MAIN PAGE CONTENT --- */}
      <main className="flex-1">
        <HeroSlider />
        <TopCategories />
        <TrendingBanners />
        <CouponOffers />
        <ComboOffersBanner />
        <BoishakhiCampaign />
        <BestOfferBrands />
        <Top3Beauty />
        <FreeDeliveryBrands />
        <BestOfSkincare />
        <FeaturedVideos />
        <FlatSalesPercentage />
        <ShopBySkinType />
        {/* <OnSale />
        <ExclusiveAccessories />
        <BogoCampaign />
        <CustomerReviews />
        <FlashSale />
        <OurBrands /> */}
        <VisitOutlet />
        <SeoContentShowcase />
      </main>

    </div>
  );
}
