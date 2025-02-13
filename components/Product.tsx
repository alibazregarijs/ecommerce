"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { type ProductProps } from "@/type";
import { renderStars } from "@/lib/utils";
import { AiFillStar } from "react-icons/ai";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { updateProductRating } from "@/store/ProductSlice";
import { useCartSelector, useProductDispatch, useProductSelector } from "@/store/hook";

const Product = ({
  product,
  userId,
  productDetail,
}: {
  product: ProductProps;
  userId: number;
  productDetail: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0); // Track selected rating
  const dispatch = useProductDispatch()
  const [myProd , setMyProd] = useState(product)

  // Handle star click
  const handleStarClick = async (rating: number) => {
    setSelectedRating(rating); // Update the selected rating
    setOpen(false); // Close the dialog
    const result = await dispatch(updateProductRating({ productId: product.id, rating, userId })); // Update the rating
    if (result.payload) {
      setMyProd(result.payload as ProductProps);
    }
  };

  return (
    <div className={`flex flex-col items-start w-full `}>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px] bg-white">
          <DialogHeader>
            <DialogTitle>Rate your product</DialogTitle>
            <DialogDescription>
              Make changes to your fav product here.
            </DialogDescription>
          </DialogHeader>
          {/* Display the stars */}
          <div className="flex justify-center items-center py-5">
            {renderStars({ rating: selectedRating, onClick: handleStarClick })}
          </div>
        </DialogContent>
      </Dialog>

      {myProd?.images && !productDetail ? (
        <Image
          src={myProd.images[0] || "/fallback-image.png"} // Provide a default image
          alt={myProd.name}
          quality={100}
          width={296}
          height={298}
        />
      ) : null}

      <div className={`flex flex-col ${productDetail ? "w-full" : "mt-4"}`}>
        <div className="flex items-center justify-between w-full space-x-4">
          <h3
            className={`font-bold  ${
              productDetail && "text-xl lg:text-3xl font-extrabold"
            }`}
          >
            {productDetail && "THE BEST "}
            {
              productDetail
                ? myProd.name.toUpperCase() // Capitalize the whole name
                : myProd.name.charAt(0).toUpperCase() + myProd.name.slice(1) // Capitalize only the first letter
            }
            {productDetail && " FOR YOU"}
          </h3>
          <AiFillStar
            className="star cursor-pointer"
            color="#ffc107"
            size={32}
            onClick={() => setOpen((prev) => !prev)}
          />
        </div>
        <div className="flex items-center space-x-4 mt-2">
          <div className="flex gap-2">
            {renderStars({
              rating: myProd.averageRating || 0,
              onClick: handleStarClick,
              empty: true,
            })}
          </div>
          <p className="text-sm">{myProd.averageRating || 0}/5</p>
        </div>
        <div className="flex items-center space-x-4 mt-2">
          <h3 className="font-bold text-lg">
            {Number.isInteger(myProd.price)
              ? `$${myProd.price}`
              : `$${myProd.price.toFixed(2)}`}
          </h3>
          {myProd.isDiscountValid && (
            <div className="flex items-center space-x-4">
              <h3 className="font-bold text-lg text-black/40 line-through">
                $
                {Number.isInteger(myProd.discountedPrice ?? myProd.price)
                  ? `${myProd.discountedPrice ?? myProd.price}`
                  : `${(myProd.discountedPrice ?? myProd.price).toFixed(2)}`}
              </h3>
              <div className="bg-[#FF3333]/10 rounded-full px-3 py-1">
                <h3 className="font-bold text-sm text-[#FF3333]">
                  -{myProd.discount?.percentage}%
                </h3>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
