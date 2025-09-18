"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import imglog from "@/assets/images/signinup.png";
const loginFormSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z
    .string()
    .nonempty({ message: "Password is required." })
    .min(8, { message: "Password must be at least 8 characters." }),
});

type LoginFormPayload = z.infer<typeof loginFormSchema>;

export default function LoginForm() {
  const router = useRouter();
  const form = useForm<LoginFormPayload>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginFormPayload) {
    try {
      const res = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
        callbackUrl: "/",
      });

      if (res?.ok) {
        toast.success("Login successful.", { position: "top-center" });
        router.push("/");
      } else {
        toast.error(res?.error || "Something went wrong.", { position: "top-center" });
      }
    } catch (error) {
      toast.error("Failed to login.", { position: "top-center" });
      throw new Error((error as Error).message || "Something went wrong.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col lg:flex-row items-center w-full p-6 gap-2">
        {/* Left Side (Image) */}
        <div className="w-full lg:w-1/2 flex justify-center mb-10 lg:mb-0">
          <Image
            src={imglog} // Replace with your own image path or import
            alt="Shopping Illustration"
            width={600}
            height={600}
            className="object-contain"
          />
        </div>

        {/* Right Side (Form) */}
        <div className="w-full lg:w-1/2 p-8 border rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-2 text-gray-800">Log in to Exclusive</h2>
          <p className="text-sm text-gray-500 mb-6">Enter your details below</p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="email" placeholder="Email or Phone Number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password Field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="password" placeholder="Password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Buttons */}
              <div className="flex items-center justify-between">
                <Button type="submit" className="bg-red-500 cursor-pointer hover:bg-red-600 text-white">
                  Log In
                </Button>
                <a href="#" className="text-sm text-red-500 hover:underline">
                  Forget Password?
                </a>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
