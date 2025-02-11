"use client"; // Ensure it's a client component

import { useDispatch } from "react-redux";
import { addToCart } from "@/store/CartSlice";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useCartSelector } from "@/store/hook";

interface AddToCartButtonProps {
  productId: string;
  image: string;
  quantity: number;
  title: string;
  price: number;
  quantityInStore: number;
  slug: string;
}

const AddToCartButton = ({
  productId,
  image,
  quantity,
  title,
  price,
  quantityInStore,
  slug,
}: AddToCartButtonProps) => {
  const dispatch = useDispatch();

  const cart = useCartSelector((state) => 
    state.cart.items.find((item) => item.id === productId) // Use find() to get a single item
  );
  
  const handleAddToCart = () => {
    let correctQuantityMessage = "";
    let sumOfQuantities = (cart?.quantity || 0) + quantity; // Use optional chaining
  
    if (quantity <= 0) {
      correctQuantityMessage = "Please enter a valid quantity.";
    }
    if (quantity > quantityInStore || quantityInStore === 0 || sumOfQuantities > quantityInStore) {
      correctQuantityMessage = "Sorry, this product is out of stock.";
    }
    if (correctQuantityMessage) {
      toast({
        title: "Error",
        description: correctQuantityMessage,
        className: "bg-white text-black",
      });
      return; // Prevent adding to cart if there's an error
    }
  
    dispatch(
      addToCart({
        id: productId,
        img: image,
        quantity,
        title,
        price,
        quantityInStore,
        slug,
      })
    );
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
