"use server";
import { signIn } from "@/auth";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

export const signInWithCredentials = async (
  params: Pick<AuthCredentials, "email" | "password">
) => {
  const { email, password } = params;

  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      return { success: false, error: result.error };
    }

    return { success: true };
  } catch (error) {
    console.log(error, "Signin error");
    return { success: false, error: "Signin error" };
  }
};
export const signUp = async (params: AuthCredentials) => {
  const { fullName, email, password , confirmPassword } = params;

  console.log(password, confirmPassword);
  if (password !== confirmPassword) {
    return { success: false, error: "Passwords do not match" };
  }

  const existingUser = await prisma.user.findFirst({
    where: {
      email: email, // Replace "email" with the variable holding the user's email
    },
  });

  if (existingUser) {
    return { success: false, error: "User already exists" };
  }

  const hashedPassword = await hash(password, 10);

  try {
    await prisma.user.create({
      data: {
        fullName,
        email,
        password: hashedPassword,
      },
    });
    await signInWithCredentials({ email, password });

    return { success: true };
  } catch (error) {
    console.log(error, "Signup error");
    return { success: false, error: "Signup error" };
  }
};
