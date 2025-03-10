"use server";

import { RegisterFormValues } from "./validation";

export async function registerUser(values: RegisterFormValues) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // This is where you would implement your actual registration logic
  // For now, we'll just return a mock response

  // Simulate a successful registration
  if (values.email && values.password && values.fullName) {
    return { success: true };
  }

  // Simulate an error
  return {
    success: false,
    error: "Registration failed. Please try again.",
  };
}

export async function socialAuth(provider: string) {
  // This function would normally redirect to the OAuth provider
  // For now, we'll just return a mock response

  return {
    success: true,
    provider,
  };
}
