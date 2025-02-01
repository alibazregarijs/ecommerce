"use client";
import React, { useEffect } from "react";
import ListingProduct from "@/components/ListingProduct";
import DifferentDress from "@/components/DifferentDress";
import Slider from "@/components/Slider";
import UpToDate from "@/components/UpToDate";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { fetchProducts, fetchRelatedProducts } from "@/store/ProductSlice";

const Hero = ({ userId }: { userId: string }) => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    mainProducts,
    relatedProducts,
    mainProductsLoading,
    relatedProductsLoading,
  } = useSelector((state: RootState) => state.products);

  console.log(mainProducts,"mainProductsLoading");

  // Fetch main products and related products when the component mounts
  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchRelatedProducts(Number(userId)));
  }, [dispatch, userId]);

  const slides = [
    {
      id: 1,
      name: "Sara M",
      description: `Sarah M. I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.”`,
      rating: 4.5,
    },
    {
      id: 2,
      name: "Alex K",
      description: `Alex K.
"Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.”`,
      rating: 2.5,
    },
    {
      id: 3,
      name: "John D",
      description: `"As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.”`,
      rating: 5,
    },
    {
      id: 4,
      name: "James L",
      description: `"Shop.co has been a lifesaver for me. Their selection of clothes is always fresh and stylish, and their customer service is top-notch. I highly recommend them to anyone looking for quality fashion.”`,
      rating: 1.5,
    },
    {
      id: 5,
      name: "Saeed M",
      description: `"As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.”`,
      rating: 2,
    },
  ];

  return (
    <div className="flex flex-col justify-center items-center mt-[72px]">
      <h1 className="font-extrabold text-3xl">New Arrivals</h1>
      <div className="flex justify-center items-center space-x-4 mt-[56px]">
        <ListingProduct
          userId={Number(userId)}
          products={mainProducts}
          loading={mainProductsLoading} // Pass main products loading state
        />
      </div>
      <h1 className="font-extrabold text-3xl mt-16">You Might Also Like </h1>
      <div className="flex justify-center items-center space-x-4 ">
        <ListingProduct
        userId={Number(userId)}
          products={relatedProducts}
          loading={relatedProductsLoading} // Pass related products loading state
        />
      </div>

      <div className="flex justify-center lg:max-w-screen-xl md:max-w-screen-md rounded-[40px] w-full mt-[80px] bg-[#F0F0F0]">
        <DifferentDress />
      </div>

      <div className="flex justify-center w-full items-center mt-[80px]">
        <Slider slides={slides} />
      </div>
      <div className="flex justify-center items-center mt-[80px] w-full">
        <UpToDate />
      </div>
    </div>
  );
};

export default Hero;