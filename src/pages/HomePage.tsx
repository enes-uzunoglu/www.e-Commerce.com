
import React from "react";
import TopProduct from "../components/TopProduct";
import BestSellerProducts from "../components/BestSellerProducts";
import Clients from "../components/Clients";
import Slogan from "../components/Slogan";
import FeaturedPosts from "../components/FeaturedPosts";
import BestServices from "../components/BestServices";
import Slider from "../components/Slider";

const Homepage: React.FC = () => {
  return (
    <div className="flex flex-col gap-16 bg-white min-h-screen py-9 px-9  md:py-16">
      <Slider/>
      <TopProduct/>
      <BestSellerProducts/>
      <Clients/>
      <Slogan/>
      <BestServices/>
      <FeaturedPosts/>
    </div>
  );
};

export default Homepage;
