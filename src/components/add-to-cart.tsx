import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/cart";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { toast } from "sonner";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  productSlug: string;
  branchSlug: string;
}

const AddToCart = ({ product }: { product: Product }) => {
  const { items, addItem, removeItem, updateItemQuantity } = useCartStore();
  const cartItem = items.find((item) => item.id === product.productSlug);

  const handleAddToCart = () => {
    addItem({
      id: product.productSlug,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
      productSlug: product.productSlug,
      branchSlug: product.branchSlug,
      foodItemId: product.id,
    });
    toast.success("Item added to cart");
  };

  const handleIncrement = () => {
    if (cartItem) {
      updateItemQuantity(product.productSlug, cartItem.quantity + 1);
      toast.success("Item quantity updated");
    }
  };

  const handleDecrement = () => {
    if (cartItem) {
      if (cartItem.quantity === 1) {
        removeItem(product.productSlug);
        toast.success("Item removed from cart");
      } else {
        updateItemQuantity(product.productSlug, cartItem.quantity - 1);
        toast.success("Item quantity updated");
      }
    }
  };

  return (
    <>
      {!cartItem ? (
        <Button
          size="sm"
          className="w-full gap-1 text-xs"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="h-3 w-3" />
          Add to Cart
        </Button>
      ) : (
        <div className="flex items-center justify-between w-full">
          <Button
            size="sm"
            variant="secondary"
            className="h-8 w-8 p-0 text-black"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleDecrement();
            }}
          >
            <Minus className="h-3 w-3" />
          </Button>
          <span className="text-sm font-medium">{cartItem.quantity}</span>
          <Button
            size="sm"
            variant="secondary"
            className="h-8 w-8 p-0 text-black"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleIncrement();
            }}
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
      )}
    </>
  );
};

export default AddToCart;
