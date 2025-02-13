import Image from "next/image";
import { useEffect } from "react";

import { useCartSelector, useCartDispatch } from "@/store/hook";
import { fetchCartItems, addCartItem, updateCartItem } from "@/store/CartSlice";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";


const CartModal = ({
  shoppingCartClicked,
  setShoppingCartClicked,
  userId,
}: {
  shoppingCartClicked: boolean;
  setShoppingCartClicked: React.Dispatch<React.SetStateAction<boolean>>;
  userId: string;
}) => {
  const dispatch = useCartDispatch();
  const {
    items: cart,
    loading,
    error,
  } = useCartSelector((state) => state.cart);

  console.log(cart, "cart");

  useEffect(() => {
    dispatch(fetchCartItems(userId as string));
  }, [shoppingCartClicked, userId, dispatch]);

  console.log(cart,"cart")

  const handleRemoveItem = async (productId: number, size: string , type:string) => {
    console.log(productId, size, "productId size");
    try {
      console.log(type,"cartmodel ")
      await dispatch(updateCartItem({ userId, productId, size , type })).unwrap();
      
      toast({
        title: type === "remove" ? "Removed" : "Added",
        description: type === "remove" ? "Item removed from cart." : "Item added to cart.",
        className: type === "remove" ? "bg-red-500 text-white" : "bg-green-500 text-white",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error as string,
        className: "bg-red-500 text-white",
      });
    }
  };

  // const handleAddItem = async (item: CartItem) => {
  //   console.log(item,'item')
  //   if (item.quantity >= item.quantityInStore) {
  //     toast({
  //       title: "Error",
  //       description: "Not enough stock available.",
  //       className: "bg-red-500 text-white",
  //     });
  //     return;
  //   }

  //   try {
  //     await dispatch(
  //       addCartItem({
  //         userId: Number(userId),
  //         productId: item.product.id.toString(),
  //         size: item.size,
  //         quantity: item.quantity+1,
  //         quantityInStore: item.quantityInStore,
  //       })
  //     ).unwrap();

  //     toast({
  //       title: "Success",
  //       description: `${item.product.name} (${item.size}) quantity updated.`,
  //       className: "bg-green-500 text-white",
  //     });
  //   } catch (error) {
  //     toast({
  //       title: "Error",
  //       description: error as string,
  //       className: "bg-red-500 text-white",
  //     });
  //   }
  // };

  return (
    <Dialog open={shoppingCartClicked} onOpenChange={setShoppingCartClicked}>
      <DialogTrigger asChild />
      <DialogContent className="sm:max-w-[425px] bg-black text-white">
        <DialogHeader>
          <DialogTitle>Your Cart</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          {cart.length > 0 && (
            <Badge variant="secondary" className="mb-4">
              <ShoppingCart className="w-4 h-4 mr-1" />
              {cart.length} item{cart.length > 1 ? "s" : ""}
            </Badge>
          )}
          {loading && <p>Loading cart items...</p>}
          {error && <p className="text-red-500">{error}</p>}
          <ScrollArea className="h-[300px] pr-4">
            {loading === false &&
              cart.map((item) => (
                <Card
                  key={`${item.id}-${item.size}`}
                  className="mb-4 bg-gray-900 text-white"
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <div className="relative w-16 h-16 rounded-md overflow-hidden">
                        {item.product.images[0] ? (
                          <Image
                            src={item.product.images[0]}
                            alt={`${item.product.name} image`}
                            layout="fill"
                            objectFit="cover"
                          />
                        ) : null}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.product.name}</h3>
                        <p className="text-sm text-gray-400">
                          Size: <span className="font-bold">{item.size}</span>
                        </p>
                        <p className="text-sm text-gray-400">
                          ${item.product.price.toFixed(2)}
                        </p>
                       
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="w-8 h-8 text-white border-white"
                          onClick={() =>
                            handleRemoveItem(item.productId, item.size, "remove")
                          }
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="font-semibold">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="w-8 h-8 text-white border-white"
                          disabled={item.quantity >= item.quantityInStore}
                          onClick={() =>
                            handleRemoveItem(item.productId, item.size, "add")
                          }
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </ScrollArea>
          <div className="mt-6 space-y-4">
            <div className="flex justify-between">
              <span className="font-semibold">Total:</span>
            </div>
            <Button className="w-full bg-white text-black">Checkout</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CartModal;
