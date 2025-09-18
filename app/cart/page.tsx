'use client';
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { getUserCart, removeFromCart, removeUserCart, updateQtyProductCart } from '../services/cart.service';
// import { removeItemFromCart, updateCartItemQuantity, clearCart } from '../services/cart.service';
import { toast } from 'sonner';

export default function CartPage() {
  const { cartDetails , setCartDetails } = useCart();
  const [coupon, setCoupon] = useState('');
  const [isLoading] = useState(false);

  const handleQuantityChange = async (productID: string,count : number) => {
      const res = await updateQtyProductCart(productID,count);
      if (res?.status === "success") {
        toast.success(res.message || "Quantity updated successfully",{ duration: 1500, position: "top-center" });
        const fresh = await getUserCart();
        setCartDetails(fresh);
      } else {
        toast.error(res?.message || "Something went wrong.", { position: "top-center" });
      }
  };
async function removeProductFromCart(productId: string) {
  try {
    const res = await removeFromCart(productId);

    if (res?.status === "success") {
      toast.success(res.message || "Product removed successfully", { position: "top-center" });

      const fresh = await getUserCart();
      setCartDetails(fresh);
    } else {
      toast.error(res?.message || "Something went wrong.", { position: "top-center" });
    }
  } catch (err) {
    toast.error("Failed to remove product.", { position: "top-center" });
    throw err;
  }
}


  const handleRemoveAll = async () => {
    const res = await removeUserCart();
    if(res?.message === "success")
    {
      toast.success("Cart removed successfully!");
      setCartDetails(null);
    }
    else{
      toast.error(res?.message || "Something went wrong.");
    }
  };

  const subtotal =
    cartDetails?.data?.products.reduce(
      (sum, item) => sum + item.price * item.count,
      0
    ) || 0;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-10">
      <h1 className="text-2xl font-bold mb-4">Cart</h1>

      {cartDetails && cartDetails.numOfCartItems>0 ? (
        <section>
          <div className="overflow-x-auto max-h-[360px] border rounded">
            {/* Desktop / tablet (md and up) */}
            <div className="hidden md:block">
              <div className="overflow-x-auto">
                <Table className="min-w-[700px] overflow-hidden">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead className="text-right">Subtotal</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cartDetails.data.products.map((item) => (
                      <TableRow key={item._id}>
                        <TableCell>
                          <div className="flex items-center gap-4">
                            <div className="relative w-[50px] h-[50px]">
                              <Image
                                src={item.product.imageCover}
                                alt={item.product.title}
                                width={50}
                                height={50}
                                className="rounded object-cover"
                              />
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => removeProductFromCart(item.product._id)}
                                className="absolute cursor-pointer -top-2 -right-2 h-5 w-5 p-0 rounded-full text-xs leading-none hover:bg-red-600 hover:text-white"
                              >
                                ×
                              </Button>
                            </div>
                            <span className="font-medium">{item.product.title}</span>
                          </div>
                        </TableCell>

                        <TableCell>${item.price}</TableCell>

                        <TableCell>
                          <div className="inline-flex items-center gap-2">
                            <button
                              type="button"
                              aria-label="Decrease quantity"
                              className="h-8 w-8 rounded border cursor-pointer flex items-center justify-center disabled:opacity-50"
                              onClick={() =>
                                handleQuantityChange(item.product._id, (item.count - 1))
                              }
                            >
                              −
                            </button>

                            <span className="w-12 text-center border rounded px-2 py-1 select-none">
                              {item.count}
                            </span>

                            <button
                              type="button"
                              aria-label="Increase quantity"
                              className="h-8 w-8 rounded border flex cursor-pointer items-center justify-center"
                              onClick={() =>
                                handleQuantityChange(item.product._id, (item.count + 1))
                              }
                            >
                              +
                            </button>
                          </div>
                        </TableCell>

                        <TableCell className="text-right">
                          ${item.price * item.count}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* Mobile (below md) */}
            <div className="md:hidden space-y-4">
        {cartDetails.data.products.map((item) => (
          <div
            key={item._id}
            className="border rounded-lg p-3 flex gap-3 items-start"
          >
            <div className="relative shrink-0">
              <Image
                src={item.product.imageCover}
                alt={item.product.title}
                width={64}
                height={64}
                className="rounded object-cover"
              />
              <Button
                size="sm"
                variant="destructive"
                onClick={() => removeProductFromCart(item.product._id)}
                className="absolute -top-2 -right-2 h-5 w-5 p-0 rounded-full text-xs leading-none hover:bg-red-600 hover:text-white"
              >
                ×
              </Button>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex justify-between gap-2">
                <span className="font-medium">{item.product.title}</span>
                <span className="text-sm text-muted-foreground whitespace-nowrap">
                  ${item.price}
                </span>
              </div>

              {/* Quantity & Subtotal row */}
                    <div className="mt-3 flex items-center justify-between gap-3">
                      <div className="inline-flex items-center gap-2">
                        <button
                          type="button"
                          aria-label="Decrease quantity"
                          className="h-8 w-8 rounded border cursor-pointer flex items-center justify-center disabled:opacity-50"
                          onClick={() =>
                            handleQuantityChange(item.product._id, (item.count - 1))
                          }
                        >
                          −
                        </button>

                        <span className="w-12 text-center border rounded px-2 py-1 select-none">
                          {item.count}
                        </span>

                        <button
                          type="button"
                          aria-label="Increase quantity"
                          className="h-8 w-8 rounded border cursor-pointer flex items-center justify-center"
                          onClick={() =>
                            handleQuantityChange(item.product._id, (item.count + 1))
                          }
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right">
                        <div className="text-xs text-muted-foreground">Subtotal</div>
                        <div className="font-semibold">
                          ${item.price * item.count}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
          <div className="mt-2 flex justify-end">
            <Button variant="destructive" className="cursor-pointer" onClick={handleRemoveAll} disabled={isLoading}>
              Remove All
            </Button>
          </div>

          <div className="flex flex-wrap justify-between items-start gap-6 mt-6">
            <div className="flex flex-col gap-4">
              <Button variant="outline" className="cursor-pointer">
                <Link href="/">Return To Shop</Link>
              </Button>

              <div className="flex items-center gap-2">
                <Input
                  placeholder="Coupon Code"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  className="w-48"
                  disabled
                />
                <Button className="bg-red-500 cursor-pointer hover:bg-red-600 text-white">
                  Apply Coupon
                  </Button>

              </div>

            </div>

            <div className="border rounded p-6 w-full md:w-80 space-y-4">
              <h2 className="text-lg font-semibold">Cart Total</h2>
              <div className="flex justify-between border-b pb-2">
                <span>Subtotal:</span>
                <span>${subtotal}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Total:</span>
                <span>${subtotal}</span>
              </div>
              <Button className="w-full bg-red-500 cursor-pointer hover:bg-red-600 text-white">
                <Link href="/checkout">Proceed to checkout </Link>
              </Button>
            </div>
          </div>
        </section>
            )
            :
            (
              <div className="flex flex-col justify-center items-center min-h-screen px-4 bg-gray-50">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                  Your Cart is Empty
                </h2>
                <p className="text-gray-600 mb-8 text-center max-w-md">
                  {`Looks like you haven't added anything to your cart yet. Start shopping now!`}
                </p>
                <Button
                  asChild
                  variant="outline"
                  className="text-lg font-medium text-blue-600 border-blue-600 hover:bg-blue-50 transition-colors"
                >
                  <Link href="/">Return to Shop</Link>
                </Button>
              </div>
      )}
    </div>
  );
}