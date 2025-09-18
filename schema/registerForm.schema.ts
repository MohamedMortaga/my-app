import { z } from "zod";
export const initialState = {
  success: false,
  error: {},
  message: null,
};
export type initialStatetType = {
  success: boolean,
  error: {
    name?: string[],
    email?: string[],
    phone?: string[],
    password?: string[],
    rePassword?: string[],
  },
  message: string | null,
};

export const registerFormSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: "Name is required." })
      .min(3, { message: "Name must be at least 3 characters." }),
    email: z.string().email({ message: "Invalid email address." }),
    password: z
      .string()
      .min(1, { message: "Password is required." })
      .min(8, { message: "Password must be at least 8 characters." }),
    rePassword: z
      .string()
      .min(1, { message: "Password is required." })
      .min(8, { message: "Password must be at least 8 characters." }),
    phone: z
      .string()
      .min(1, { message: "Phone number is required." })
      .regex(/^(002|\+2)01[0-25][0-9]{8}$/, { message: "Invalid phone number." }),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match.",
    path: ["rePassword"],
  });