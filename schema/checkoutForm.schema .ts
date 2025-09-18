import { z } from "zod";

export const addressFormSchema = z.object({
  cartId: z.string().nonempty({ message: "cartId is required." }),
  details: z
    .string()
    .nonempty({ message: "Address is required." })
    .min(3, { message: "Name must be at least 3 characters." }),
  phone: z
    .string()
    .nonempty({ message: "Phone number is required." })
    // Egypt numbers starting with +20 or 0020 then 1X...
    .regex(/^(0020|\+20)1[0-25][0-9]{8}$/, { message: "Invalid phone number." }),
  city: z
    .string()
    .nonempty({ message: "City is required." })
    .min(3, { message: "Name must be at least 3 characters." }),
});

export type addressFormType = z.infer<typeof addressFormSchema>;

export type addressFormStateType = {
  success: boolean;
  error: null | {
    cartId?: string[];
    details?: string[];
    phone?: string[];
    city?: string[];
  };
  message: string | null;
  redirectUrl?: string | null; // NEW
};

export const addressFromState: addressFormStateType = {
  success: false,
  error: null,
  message: null,
  redirectUrl: null, // NEW
};
