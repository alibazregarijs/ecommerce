import Image from "next/image";
import { useCartSelector, useCartDispatch } from "@/store/hook";
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
import { addToCart, removeFromCart } from "@/store/CartSlice";

const CartModal = ({
  shoppingCartClicked,
  setShoppingCartClicked,
}: {
  shoppingCartClicked: boolean;
  setShoppingCartClicked: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const cart = useCartSelector((state) => state.cart.items);
  const dispatch = useCartDispatch();

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <Dialog open={shoppingCartClicked} onOpenChange={setShoppingCartClicked}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-black text-white">
        <DialogHeader>
          <DialogTitle>Your Cart</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <Badge variant="secondary" className="mb-4">
            <ShoppingCart className="w-4 h-4 mr-1" />
            {totalItems} {totalItems === 1 ? "item" : "items"}
          </Badge>
          <ScrollArea className="h-[300px] pr-4">
            {cart.map((item) => (
              <Card
                key={`${item.id}-${item.size}`} // Ensure unique key for different sizes
                className="mb-4 bg-gray-900 text-white"
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className="relative w-16 h-16 rounded-md overflow-hidden">
                      <Image
                        src={item.img || "/placeholder.svg"}
                        alt={item.title}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="text-sm text-gray-400">
                        Size: <span className="font-bold">{item.size}</span>
                      </p>
                      <p className="text-sm text-gray-400">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="w-8 h-8 text-white border-white"
                        onClick={() =>
                          dispatch(removeFromCart({ id: item.id, size: item.size }))
                        }
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="font-semibold">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="w-8 h-8 text-white border-white"
                        disabled={
                          item.quantityInStore === 0 ||
                          item.quantityInStore < item.quantity + 1
                        }
                        onClick={() =>
                          dispatch(
                            addToCart({
                              id: item.id,
                              img: item.img,
                              title: item.title,
                              size: item.size, // Include size when updating cart
                              price: item.price,
                              quantityInStore: item.quantityInStore,
                              slug: item.slug,
                              quantity: 1,
                            })
                          )
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
              <span className="font-bold">${totalPrice.toFixed(2)}</span>
            </div>
            <Button className="w-full bg-white text-black">Checkout</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CartModal;
