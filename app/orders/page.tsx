// app/orders/page.tsx
import React from "react";
import { getServerSession } from "next-auth";
import type { DefaultSession } from "next-auth";
import { authOptions } from "../auth";

type OrderItem = {
  _id: string;
  count?: number;
  price?: number;
  product?: {
    title?: string;
    imageCover?: string;
    category?: { name?: string };
  };
};

type Order = {
  _id: string;
  createdAt?: string;
  totalOrderPrice?: number;
  paymentMethodType?: string;
  isDelivered?: boolean;
  isPaid?: boolean;
  cartItems?: OrderItem[];
  shippingAddress?: {
    details?: string;
    city?: string;
    phone?: string;
  };
};

/** Narrowing helpers (avoid `any`) */
function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null;
}
function hasStringKey<T extends string>(
  obj: Record<string, unknown>,
  key: T
): obj is Record<T, string> {
  return typeof obj[key] === "string";
}
function hasArrayKey<T extends string>(
  obj: Record<string, unknown>,
  key: T
): obj is Record<T, unknown[]> {
  return Array.isArray(obj[key]);
}

async function fetchOrders(args: {
  userId: string;
  token?: string | null;
}): Promise<Order[]> {
  const { userId, token } = args;

  const headers: HeadersInit | undefined = token ? { token } : undefined;

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/user/${encodeURIComponent(userId)}`,
    {
      method: "GET",
      headers,
      cache: "no-store",
    }
  );

  const data: unknown = await res.json().catch(() => ({}));

  if (!res.ok) {
    let msg = `Failed to load orders (HTTP ${res.status}).`;
    if (isRecord(data)) {
      if (hasStringKey(data, "message")) msg = data.message;
      else if (hasStringKey(data, "statusMsg")) msg = data.statusMsg;
    }
    throw new Error(msg);
  }

  if (Array.isArray(data)) {
    return data as Order[];
  }

  if (isRecord(data) && "orders" in data) {
    const obj = data as Record<string, unknown>;
    if (hasArrayKey(obj, "orders")) {
      return obj.orders as Order[];
    }
  }

  // Fallback: unexpected shape, return empty list
  return [];
}

/** Extend NextAuth's DefaultSession user at runtime without module augmentation */
type SessionUserRuntime = DefaultSession["user"] & {
  id?: string;
  token?: string;
};

export default async function OrdersPage() {
  // Get the session (and thus user id + token) on the server
  const session = await getServerSession(authOptions);

  const user = session?.user as SessionUserRuntime | undefined;

  const userId =
    user && typeof user.id === "string" ? user.id : null;
  const token =
    user && typeof user.token === "string" ? user.token : null;

  if (!userId) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-semibold mb-2">Orders</h1>
        <p>You must be signed in to view your orders.</p>
      </div>
    );
  }

  let orders: Order[] = [];
  let error: string | null = null;

  try {
    orders = await fetchOrders({ userId, token }); // ✅ user-specific, token narrowed
  } catch (e: unknown) {
    error =
      e instanceof Error
        ? e.message
        : "Something went wrong while loading orders.";
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Your Orders</h1>

      {error && (
        <div className="mb-6 rounded-lg border border-red-3 00 bg-red-50 p-4">
          <p className="font-medium text-red-700">{error}</p>
        </div>
      )}

      {!error && orders.length === 0 && (
        <p className="text-gray-600">You don’t have any orders yet.</p>
      )}

      <ul className="space-y-6">
        {orders.map((order) => (
          <li
            key={order._id}
            className="rounded-2xl border bg-white p-5 shadow-sm"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-sm text-gray-500">Order ID</div>
                <div className="font-mono text-sm">{order._id}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Date</div>
                <div className="text-sm">
                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleString()
                    : "—"}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Total</div>
                <div className="text-sm font-semibold">
                  {typeof order.totalOrderPrice === "number"
                    ? `${order.totalOrderPrice} EGP`
                    : "—"}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Payment</div>
                <div className="text-sm capitalize">
                  {order.paymentMethodType || "—"}
                </div>
              </div>
              <div className="text-sm">
                {order.isPaid ? "Paid" : "Unpaid"} •{" "}
                {order.isDelivered ? "Delivered" : "Not delivered"}
              </div>
            </div>

            {order.shippingAddress && (
              <div className="mt-4 rounded-xl bg-gray-50 p-4">
                <div className="text-sm font-medium mb-1">Shipping address</div>
                <div className="text-sm text-gray-700">
                  {order.shippingAddress.details || "—"}
                </div>
                <div className="text-sm text-gray-700">
                  {order.shippingAddress.city || "—"}
                </div>
                <div className="text-sm text-gray-700">
                  {order.shippingAddress.phone || "—"}
                </div>
              </div>
            )}

            {Array.isArray(order.cartItems) && order.cartItems.length > 0 && (
              <div className="mt-4">
                <div className="text-sm font-medium mb-2">Items</div>
                <div className="divide-y rounded-xl border">
                  {order.cartItems.map((it) => (
                    <div key={it._id} className="flex items-center gap-4 p-3">
                      {it.product?.imageCover && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={it.product.imageCover}
                          alt={it.product?.title || "product"}
                          className="h-14 w-14 rounded-lg object-cover"
                        />
                      )}
                      <div className="flex-1">
                        <div className="text-sm font-medium">
                          {it.product?.title || "Product"}
                        </div>
                        <div className="text-xs text-gray-500">
                          {it.product?.category?.name || ""}
                        </div>
                      </div>
                      <div className="text-sm">
                        x{typeof it.count === "number" ? it.count : "—"}
                      </div>
                      <div className="text-sm font-semibold">
                        {typeof it.price === "number"
                          ? `${it.price} EGP`
                          : "—"}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
