"use server";

import { getUserToken } from "@/lib/server-uitls";
import { addressFormSchema, addressFormStateType } from "@/schema/checkoutForm.schema ";

export async function handlePayment(
  _formState: addressFormStateType,
  formData: FormData
): Promise<addressFormStateType> {
  const shippingAddress = {
    details: (formData.get("details") ?? "") as string,
    phone: (formData.get("phone") ?? "") as string,
    city: (formData.get("city") ?? "") as string,
  };

  const cartId = (formData.get("cartId") ?? "") as string;
  const paymentMethod = (formData.get("paymentMethod") ?? "") as string;

  // Validate everything (including cartId)
  const parsed = addressFormSchema.safeParse({ ...shippingAddress, cartId });
  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    return { success: false, error: fieldErrors, message: null, redirectUrl: null };
  }

  try {
    const token = await getUserToken();
    if (!token) {
      return {
        success: false,
        error: null,
        message: "You must be signed in to place an order.",
        redirectUrl: null,
      };
    }

    const endPoint =
      paymentMethod === "cash"
        ? `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`
        : `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${process.env.NEXTAUTH_URL}`;

    const res = await fetch(`${endPoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token as string,
      },
      body: JSON.stringify(shippingAddress),
      cache: "no-store",
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      return {
        success: false,
        error: null,
        message:
          data?.message ||
          data?.statusMsg ||
          `Order failed (HTTP ${res.status}).`,
        redirectUrl: null,
      };
    }

    // If card flow on non-local, backend typically returns a session URL
    return {
      success: true,
      error: null,
      message: data?.message || "Order placed successfully",
      redirectUrl: data?.session?.url ?? null,
    };
  } catch (err) {
    throw err;
    return {
      success: false,
      error: null,
      message: "Something went wrong. Please try again.",
      redirectUrl: null,
    };
  }
}
