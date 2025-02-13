"use client"; // Ensure it's a client component

import { useCartSelector, useCartDispatch } from "@/store/hook";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { addCartItem, fetchCartItems } from "@/store/CartSlice";
import { useEffect } from "react";
import { type CartItem } from "@/type";


const AddToCartButton = ({
  productId,

  size,
  quantity,
  title,

  quantityInStore,

  userId,
}: CartItem) => {
  const dispatch = useCartDispatch();

  // Get the cart item for this specific product & size
  const cartItem = useCartSelector((state) =>
    state.cart.items.find(
      (item) => item.id === Number(productId) && item.size === size
    )
  );

  useEffect(() => {
    dispatch(fetchCartItems(userId.toString()));
  }, [dispatch]);

  const handleAddToCart = async () => {
    let errorMessage = "";
    let newQuantity = (cartItem?.quantity || 0) + quantity;

    if (quantity <= 0) {
      errorMessage = "Please enter a valid quantity.";
    } else if (quantityInStore === 0 || newQuantity > quantityInStore) {
      errorMessage = "Sorry, this product is out of stock.";
    }

    if (errorMessage) {
      toast({
        title: "Error",
        description: errorMessage,
        className: "bg-white text-black",
      });
      return;
    }

    try {
      await dispatch(
        addCartItem({
          quantity,
          size,
          userId,
          productId: productId.toString(),
          quantityInStore,
        })
      ).unwrap(); // Ensures error handling in async thunk

      toast({
        title: "Success",
        description: `${title} with this size (${size}) added to cart!`,
        className: "bg-green-500 text-white",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error as string,
        className: "bg-red-500 text-white",
      });
    }
  };

  return (
    <Button
      onClick={handleAddToCart}
      className="bg-gray-200 hover:bg-black hover:text-white"
    >
      Add to Cart
    </Button>
  );
};

export default AddToCartButton;
