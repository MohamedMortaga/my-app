"use server";

import { getUserToken } from "@/lib/server-uitls";

export async function getUserCart() {
  try {
    const token = await getUserToken();

    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
      headers: {
        token: token as string,
      },
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    return data;
  } catch (error) {
    throw new Error((error as Error).message || "Something went wrong");
  }
}

export async function removeUserCart() {
  try {
    const token = await getUserToken();

    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
      method:"DELETE",
      headers: {
        token: token as string,
      },
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    return data;
  } catch (error) {
    throw new Error((error as Error).message || "Something went wrong");
  }
}

export async function addToCart(productId: string) {
  try {
    const token = await getUserToken();

    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
      method:"POST",
      headers: {
        "Content-Type": "application/json",
        token: token as string,
      },
      body: JSON.stringify({productId}),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    return data;
  } catch (error) {

    throw new Error((error as Error).message || "Something went wrong");
  }
}

export async function removeFromCart(productId: string) {
  try {
    const token = await getUserToken();

    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
      method:"DELETE",
      headers: {
        "Content-Type": "application/json",
        token: token as string,
      },
      body: JSON.stringify({productId})
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Something went wrong");
    }
    return data;
  }
  catch (error) {
    throw new Error((error as Error).message || "Something went wrong");
  }
}


export async function updateQtyProductCart(productId: string ,count :number) {
  try {
    const token = await getUserToken();

    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
      method:"PUT",
      headers: {
        "Content-Type": "application/json",
        token: token as string,
      },
      body: JSON.stringify({count})
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Something went wrong");
    }
    return data;
  }
  catch (error) {
    throw new Error((error as Error).message || "Something went wrong");
  }
}