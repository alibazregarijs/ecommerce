"use client";
import React, { useState } from "react";
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
  const dispatch = useDispatch<AppDispatch>();

  // Handle star click
  const handleStarClick = (rating: number) => {
    setSelectedRating(rating); // Update the selected rating
    setOpen(false); // Close the dialog
    dispatch(updateProductRating({ productId: product.id, rating, userId })); // Update the rating
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

      {product?.images && !productDetail ? (
        <Image
          src={product.images[0] || "/fallback-image.png"} // Provide a default image
          alt={product.name}
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
                ? product.name.toUpperCase() // Capitalize the whole name
                : product.name.charAt(0).toUpperCase() + product.name.slice(1) // Capitalize only the first letter
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
              rating: product.averageRating || 0,
              onClick: handleStarClick,
              empty: true,
            })}
          </div>
          <p className="text-sm">{product.averageRating || 0}/5</p>
        </div>
        <div className="flex items-center space-x-4 mt-2">
          <h3 className="font-bold text-lg">
            {Number.isInteger(product.price)
              ? `$${product.price}`
              : `$${product.price.toFixed(2)}`}
          </h3>
          {product.isDiscountValid && (
            <div className="flex items-center space-x-4">
              <h3 className="font-bold text-lg text-black/40 line-through">
                $
                {Number.isInteger(product.discountedPrice ?? product.price)
                  ? `${product.discountedPrice ?? product.price}`
                  : `${(product.discountedPrice ?? product.price).toFixed(2)}`}
              </h3>
              <div className="bg-[#FF3333]/10 rounded-full px-3 py-1">
                <h3 className="font-bold text-sm text-[#FF3333]">
                  -{product.discount?.percentage}%
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
