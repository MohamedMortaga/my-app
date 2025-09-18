"use server"
import { initialStatetType, registerFormSchema } from "@/schema/registerForm.schema";

export async function handleRegister(
  prevState: initialStatetType, 
  formData: FormData
): Promise<initialStatetType> {
  const formValues = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    password: formData.get("password"),
    rePassword: formData.get("rePassword"),
  };


  const parsedData = registerFormSchema.safeParse(formValues);
  if (!parsedData.success) {
    return {
      success: false,
      error: parsedData.error?.flatten().fieldErrors,
      message: null,
    };
  }

  try {
    const res = await fetch('https://ecommerce.routemisr.com/api/v1/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formValues),
    });

    const data = await res.json();

 
    if (!res.ok) {
      return {
        success: false,
        error: data.errors || {},
        message: data.message,
      };
    }

    return {
      success: true,
      error: {},
      message: data.message,
    };
  } catch (error) {
    throw new Error((error as Error).message);
    return {
      success: false,
      error: {},
      message: "Something went wrong. Please try again.",
    };
  }
}
