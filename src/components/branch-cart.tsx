"use client";
import { useState, useMemo } from "react";
import { Branch } from "@/lib/branches";
import { useCartStore } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  Phone,
  MapPin,
  Clock,
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { createOrder } from "@/actions";
import { toast } from "sonner";
import formatPrice from "@/lib/price-formatter";

interface BranchCartProps {
  branch: Branch;
}

interface CheckoutForm {
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
}

function BranchCart({ branch }: BranchCartProps) {
  const { items, updateItemQuantity, removeItem, clearCart } = useCartStore();
  const [checkoutForm, setCheckoutForm] = useState<CheckoutForm>({
    customerName: "",
    customerPhone: "",
    deliveryAddress: "",
  });

  const branchItems = useMemo(
    () => items.filter((item) => item.branchSlug === branch.slug),
    [items, branch.slug]
  );

  const subtotal = useMemo(
    () =>
      branchItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [branchItems]
  );

  const deliveryFee = branch.deliveryFee ?? 0;
  const total = subtotal + deliveryFee;

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(itemId);
    } else {
      updateItemQuantity(itemId, newQuantity);
    }
  };

  const handleWhatsAppCheckout = async () => {
    try {
      // Create order in database first
      const formData = new FormData();
      formData.append("branchId", branch.id);
      formData.append("customerName", checkoutForm.customerName);
      formData.append("customerPhone", checkoutForm.customerPhone);
      formData.append("customerAddress", checkoutForm.deliveryAddress);
      formData.append(
        "items",
        JSON.stringify(
          branchItems.map((item) => ({
            foodItemId: item.foodItemId,
            quantity: item.quantity,
          }))
        )
      );

      const result = await createOrder(formData);

      if (result.success) {
        // Clear cart after successful order creation
        clearCart();

        // Generate WhatsApp message with order ID
        const orderItems = branchItems
          .map(
            (item) =>
              `- ${item.name} x${item.quantity} = ${formatPrice(item.price * item.quantity)}`
          )
          .join("\n");

        const message = `Order from ${branch.name} - Order ID: ${
          result.data.orderId
        }
Name: ${checkoutForm.customerName}
Phone: ${checkoutForm.customerPhone}
Address: ${checkoutForm.deliveryAddress}
Items:
${orderItems}
Subtotal = ${formatPrice(subtotal)}
Delivery Fee = ${formatPrice(deliveryFee)}
Total = ${formatPrice(total)}
Delivery Method: Home Delivery

Please confirm this order and provide estimated delivery time. Thank you! 🙏`;

        const whatsappNumber = branch.whatsappNumber || branch.whatsapp;
        if (!whatsappNumber) {
          toast.error("WhatsApp number not configured for this branch");
          return;
        }

        // Clean the WhatsApp number (remove +, spaces, etc.)
        const cleanNumber = whatsappNumber.replace(/[\+\s\-]/g, "");
        const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(
          message
        )}`;

        // Try to open WhatsApp
        try {
          const newWindow = window.open(whatsappUrl, "_blank");
          if (!newWindow) {
            toast.error(
              "Popup blocked! Please allow popups for this site and try again."
            );
            // Fallback: copy message to clipboard
            navigator.clipboard.writeText(message).then(() => {
              toast.success(
                "Message copied to clipboard. Please paste it in WhatsApp."
              );
            });
          } else {
            toast.success("Order created successfully! WhatsApp opened.");
          }
        } catch (error) {
          console.error("Failed to open WhatsApp:", error);
          toast.error("Failed to open WhatsApp. Please try again.");
        }
      } else {
        toast.error(result.success || "Failed to create order");
      }
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error("Failed to create order. Please try again.");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  if (branchItems.length === 0) {
    return (
      <motion.div
        className="text-center space-y-8 py-16"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <div className="bg-gray-800/20 p-8 rounded-full w-fit mx-auto mb-6">
            <ShoppingCart className="h-16 w-16 text-gray-400" />
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Your Cart is Empty
          </h1>
          <p className="text-gray-400 max-w-md mx-auto mb-8">
            Looks like you haven&apos;t added any items to your cart from{" "}
            {branch.name} yet.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-orange-600 hover:bg-orange-700 text-white px-8 rounded-xl"
          >
            <Link href={`/branches/${branch.slug}`}>Browse Menu</Link>
          </Button>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="space-y-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="grid lg:grid-cols-3 gap-8">
        <motion.div className="lg:col-span-2 space-y-6" variants={itemVariants}>
          <Card className="liquid-glass bg-gray-800/20 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Order Items ({branchItems.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {branchItems.map((item) => (
                <motion.div
                  key={item.id}
                  className="flex items-center gap-4 p-4 liquid-glass rounded-xl"
                  variants={itemVariants}
                >
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold text-white">{item.name}</h3>
                    <p className="text-orange-400 font-medium">
                      {formatPrice(item.price)} each
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 w-8 rounded-full bg-gray-700 border-gray-600"
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity - 1)
                      }
                    >
                      <Minus className="h-3 w-3" />
                    </Button>

                    <span className="text-white font-medium w-8 text-center">
                      {item.quantity}
                    </span>

                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 w-8 rounded-full bg-gray-700 border-gray-600"
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity + 1)
                      }
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>

                  <div className="text-right">
                    <p className="text-white font-semibold">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-red-400 hover:text-red-300 hover:bg-red-400/10 p-1"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div className="space-y-6" variants={itemVariants}>
          <Card className="liquid-glass bg-gray-800/20 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-gray-300">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Delivery Fee</span>
                <span>{formatPrice(deliveryFee)}</span>
              </div>
              <div className="border-t border-gray-700 pt-4">
                <div className="flex justify-between text-white font-semibold text-lg">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              <div className="pt-4 space-y-3 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>Estimated delivery: 20-45 mins</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{branch.deliveryRadius}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="liquid-glass bg-gray-800/20 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Customer Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Your Name *
                </label>
                <Input
                  placeholder="Enter your full name"
                  value={checkoutForm.customerName}
                  onChange={(e) =>
                    setCheckoutForm((prev) => ({
                      ...prev,
                      customerName: e.target.value,
                    }))
                  }
                  className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Phone Number *
                </label>
                <Input
                  placeholder="+234 xxx xxx xxxx"
                  value={checkoutForm.customerPhone}
                  onChange={(e) =>
                    setCheckoutForm((prev) => ({
                      ...prev,
                      customerPhone: e.target.value,
                    }))
                  }
                  className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Delivery Address *
                </label>
                <Input
                  placeholder="Your full delivery address"
                  value={checkoutForm.deliveryAddress}
                  onChange={(e) =>
                    setCheckoutForm((prev) => ({
                      ...prev,
                      deliveryAddress: e.target.value,
                    }))
                  }
                  className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-orange-500"
                />
              </div>

              <motion.div
                className="pt-4"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={handleWhatsAppCheckout}
                  disabled={
                    !checkoutForm.customerName ||
                    !checkoutForm.customerPhone ||
                    !checkoutForm.deliveryAddress
                  }
                  size="lg"
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Checkout via WhatsApp
                </Button>
              </motion.div>

              <p className="text-xs text-gray-500 text-center">
                You&apos;ll be redirected to WhatsApp to complete your order
              </p>
            </CardContent>
          </Card>

          <div className="flex gap-3">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 bg-transparent border-gray-600 hover:bg-gray-700/50 text-gray-100"
              onClick={() => clearCart()}
            >
              Clear Cart
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1 bg-transparent border-gray-600 hover:bg-gray-700/50 text-gray-100"
              asChild
            >
              <Link href={`/branches/${branch.slug}`}>Add More Items</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default BranchCart;
