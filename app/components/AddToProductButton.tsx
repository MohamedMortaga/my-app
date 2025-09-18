"use client";

import React from "react";
import { addToCart } from "../services/cart.service";
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';
import { useCart } from '@/app/context/CartContext';

// Fix: Destructure properly from a prop object, not a plain string
export default function AddToProductButton({ productId, ...props }: { productId: string; [key : string] : string; }) {
  const { getCartDetails} = useCart();
  async function addProductToCart(productId: string) {
    const res = await addToCart(productId);
    if(res.status === "success")
    {
      toast.success(res.message,{ position: "top-center"});
      getCartDetails();
    }
    else{
      toast.error(res.message,{ position: "top-center"});
    }
  }

  return (
    <Button
      onClick={() => addProductToCart(productId)}{...props}
    >
      Add To Cart
    </Button>
  );
}
