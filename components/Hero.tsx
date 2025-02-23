"use client";
import React, { useEffect, useState } from "react";
import ListingProduct from "@/components/ListingProduct";
import DifferentDress from "@/components/DifferentDress";
import Slider from "@/components/Slider";
import UpToDate from "@/components/UpToDate";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { fetchProducts, fetchRelatedProducts } from "@/store/ProductSlice";
import Spinner from "@/components/Spinner";
import { SLIEDS } from "@/constants";

const Hero = ({ userId }: { userId: string }) => {
  const [viewAllNewArrival, setViewAllNewArrival] = useState(2);
  const [viewAllRelated, setViewAllRelated] = useState(2);

  const dispatch = useDispatch<AppDispatch>();

  const mainProducts = useSelector(
    (state: RootState) => state.products.mainProducts
  );
  const relatedProducts = useSelector(
    (state: RootState) => state.products.relatedProducts
  );
  const mainProductsLoading = useSelector(
    (state: RootState) => state.products.mainProductsLoading
  );
  const relatedProductsLoading = useSelector(
    (state: RootState) => state.products.relatedProductsLoading
  );

  useEffect(() => {
    dispatch(fetchProducts(viewAllNewArrival));
  }, [dispatch, viewAllNewArrival]);

  useEffect(() => {
    dispatch(
      fetchRelatedProducts({ userId: Number(userId), limit: viewAllRelated })
    );
  }, [dispatch, userId, viewAllRelated]);

  return (
    <div className="flex flex-col justify-center items-center mt-[72px]">
      {mainProductsLoading ? (
        <Spinner loading={true} />
      ) : (
        <React.Fragment>
          <h1 className="font-extrabold text-3xl">New Arrivals</h1>
          <ListingProduct
            userId={Number(userId)}
            products={mainProducts}
            setViewAll={setViewAllNewArrival}
          />
        </React.Fragment>
      )}

      {relatedProductsLoading ? (
        <Spinner loading={true} />
      ) : (
        <React.Fragment>
          <h1 className="font-extrabold text-3xl mt-16">
            You Might Also Like{" "}
          </h1>
          <ListingProduct
            userId={Number(userId)}
            products={relatedProducts}
            setViewAll={setViewAllRelated}
          />
        </React.Fragment>
      )}

      <div className="flex justify-center lg:max-w-screen-xl md:max-w-screen-md rounded-[40px] w-full mt-[80px] bg-[#F0F0F0]">
        <DifferentDress />
      </div>

      <div className="flex justify-center w-full items-center mt-[80px]">
        <Slider slides={SLIEDS} />
      </div>
      <div className="flex justify-center items-center mt-[80px] w-full">
        <UpToDate />
      </div>
    </div>
  );
};

export default Hero;
