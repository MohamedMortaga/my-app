"use client";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { handleRegister } from "@/app/services/register.service";
import { useActionState, useEffect } from "react";
import { initialState, registerFormSchema } from "@/schema/registerForm.schema";
import { useRouter } from "next/navigation";
import Image from "next/image";
import imglog from "@/assets/images/signinup.png";

// Infer type from schema
type RegisterFormPayload = z.infer<typeof registerFormSchema>;

export default function RegisterForm() {
  const [action, formAction] = useActionState(handleRegister, initialState);
  const router = useRouter();
  const form = useForm<RegisterFormPayload>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      rePassword: "",
    },
  });

  useEffect(() => {
    if (action) {
      if (!action.success) {
        if (action.error && Object.keys(action.error).length > 0) {
          // Set server field errors to display in form
          Object.entries(action.error).forEach(([field, messages]) => {
            if (Array.isArray(messages) && messages.length > 0) {
              form.setError(field as keyof RegisterFormPayload, { message: messages[0] });
            }
          });
        }
        if (action.message) {
          toast.error(action.message || "Registration failed.", {
            position: "top-center",
          });
        }
      }
      if (action.success && action.message) {
        toast.success(action.message || "Registration successful.", {
          position: "top-center",
        });
        router.push("/login");
      }
    }
  }, [action, form, router]);

  async function onSubmit(data: RegisterFormPayload) {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formAction(formData);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col lg:flex-row items-center w-full p-6 gap-2">
        {/* Left Side (Image) */}
        <div className="w-full lg:w-1/2 flex justify-center mb-10 lg:mb-0">
          <Image
            src={imglog}
            alt="Shopping Illustration"
            width={600}
            height={600}
            className="object-contain"
          />
        </div>

        {/* Right Side (Form) */}
        <div className="w-full lg:w-1/2 p-8 border rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-2 text-gray-800">Sign up to Exclusive</h2>
          <p className="text-sm text-gray-500 mb-6">Enter your details below</p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Name Field */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="email" placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Phone Field */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Phone Number" {...field} />
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

              {/* Confirm Password Field */}
              <FormField
                control={form.control}
                name="rePassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="password" placeholder="Confirm Password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Buttons */}
              <div className="flex items-center justify-between">
                <Button type="submit" className="bg-red-500 cursor-pointer hover:bg-red-600 text-white">
                  Register
                </Button>
                <a href="/login" className="text-sm text-red-500 hover:underline">
                  Already have account?
                </a>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}