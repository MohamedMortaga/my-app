"use client";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation"; // ✅ correct router import
import { handlePayment } from "../services/order.service";
import { useActionState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import {
  addressFormSchema,
  addressFormType,
  addressFromState,
} from "@/schema/checkoutForm.schema "; 
// ❌ removed: import { Router } from "lucide-react";

export default function CheckoutPage() {
  const [action, formAction] = useActionState(handlePayment, addressFromState);
  const router = useRouter(); // ✅ define router

  const { getCartDetails, cartDetails, setCartDetails } = useCart();

  const form = useForm<addressFormType>({
    resolver: zodResolver(addressFormSchema),
    defaultValues: {
      cartId: "",
      details: "",
      phone: "",
      city: "",
    },
  });

 
  useEffect(() => {
    if (cartDetails?.data?._id) {
      form.reset({
        cartId: cartDetails.data._id,
        details: "",
        phone: "",
        city: "",
      });
    } else {
      getCartDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartDetails]);

  useEffect(() => {
    if (action?.success) {
      // If server provided a hosted checkout/session URL (card on non-local), go there
      if (action.redirectUrl) {
        window.location.assign(action.redirectUrl);
        return;
      }

      // Otherwise keep current behavior (cash or local card fallback)
      toast.success(action.message || "Order placed successfully", {
        position: "top-center",
      });
      setCartDetails(null);
      setTimeout(() => {
        router.push("/orders");
      }, 2000);
    } else if (action?.message) {
      toast.error(action.message || "Something went wrong", {
        position: "top-center",
      });
      router.push("/cart");
    }
  }, [action, router, setCartDetails]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-10">
      <div className="flex flex-col lg:flex-row items-start w-full max-w-7xl p-6 gap-6">
        {/* Left Column: Contact Info */}
        <div className="w-full lg:w-1/3 bg-gray-50 p-6 rounded-lg shadow-md">
          <div className="mb-6">
            <div className="flex items-center mb-2">
              <span className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white mr-2">
                📞
              </span>
              <h3 className="text-lg font-semibold">Call to Us</h3>
            </div>
            <p className="text-sm text-gray-600">
              We are available 24/7, 7 days a week.
            </p>
            <p className="text-sm text-gray-600">Phone: +880171112222</p>
          </div>

          <div>
            <div className="flex items-center mb-2">
              <span className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white mr-2">
                ✉️
              </span>
              <h3 className="text-lg font-semibold">Write to Us</h3>
            </div>
            <p className="text-sm text-gray-600">
              Fill out our form and we will contact you within 24 hours.
            </p>
            <p className="text-sm text-gray-600">Emails: customer@exclusive.com</p>
            <p className="text-sm text-gray-600">Emails: support@exclusive.com</p>
          </div>
        </div>

        {/* Right Column: Form */}
        <div className="w-full lg:w-2/3 bg-gray-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Sign up to Exclusive
          </h2>
          <p className="text-sm text-gray-500 mb-6">Enter your details below</p>

          <Form {...form}>
            <form action={formAction} className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                {/* cartId (read-only but registered) */}
                <FormField
                  control={form.control}
                  name="cartId"
                  render={({ field }) => (
                    <FormItem className="flex-1" hidden>
                      <FormControl>
                        <Input {...field} readOnly className="bg-white" />
                      </FormControl>
                      <FormMessage>{action?.error?.cartId?.[0]}</FormMessage>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="details"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="text-sm text-gray-600">
                        Your Name *
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your Name"
                          {...field}
                          className="bg-white"
                        />
                      </FormControl>
                      <FormMessage>{action?.error?.details?.[0]}</FormMessage>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="text-sm text-gray-600">
                        Your Phone *
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="+2010XXXXXXXX"
                          {...field}
                          className="bg-white"
                        />
                      </FormControl>
                      <FormMessage>{action?.error?.phone?.[0]}</FormMessage>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-gray-600">
                      Your City *
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Your City"
                        {...field}
                        className="bg-white"
                      />
                    </FormControl>
                    <FormMessage>{action?.error?.city?.[0]}</FormMessage>
                  </FormItem>
                )}
              />

              {/* Payment Method (new) */}
              <fieldset className="border rounded-md p-4 bg-white">
                <legend className="text-sm font-medium text-gray-700 px-1">
                  Payment method
                </legend>

                <div className="mt-3 space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cash"
                      defaultChecked
                      className="h-4 w-4"
                    />
                    <span className="text-sm text-gray-700">Cash</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      className="h-4 w-4"
                    />
                    <span className="text-sm text-gray-700">Card</span>
                  </label>
                </div>
              </fieldset>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="bg-red-500 cursor-pointer hover:bg-red-600 text-white px-6 py-2 rounded-md"
                >
                  Check out
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}