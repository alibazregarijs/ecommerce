import React from "react";
import {
  DefaultValues,
  FieldValues,
  SubmitHandler,
  Path,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ZodType } from "zod";
import { FIELD_NAMES, FIELD_TYPES } from "@/constants";
import Link from "next/link";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface Props<T extends FieldValues> {
  schema: ZodType<T>;
  defaultValues: T;
  onSubmit: (data: T) => Promise<{ success: boolean; error?: string }>;
  type: "SIGN_UP" | "SIGN_IN";
}

const AuthForm = <T extends FieldValues>({
  type,
  schema,
  onSubmit,
  defaultValues,
}: Props<T>) => {
  const form: UseFormReturn<T> = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const router = useRouter();
  const isSignIn = type === "SIGN_IN";
  const handleSubmit: SubmitHandler<T> = async (data) => {
    const result = await onSubmit(data);

    if (result.success) {
      toast({
        title: "Success",
        className:"bg-white text-black",
        description: isSignIn
          ? "You have successfully signed in."
          : "You have successfully signed up.",
      });

      router.push("/");
    } else {
      toast({
        title: `Error ${isSignIn ? "signing in" : "signing up"}`,
        description: result.error ?? "An error occurred.",
        className:"bg-white text-black",
      });
    }
  };

  return (
    <div className="flex justify-center items-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="w-full space-y-6"
        >
          {Object.keys(defaultValues).map((field) => (
            <div
              key={field}
              className="grid w-full max-w-sm items-center gap-1.5"
            >
              <FormField
                key={field}
                control={form.control}
                name={field as Path<T>}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="capitalize text-white">
                      {FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}
                    </FormLabel>
                    <FormControl>
                      <Input
                        required
                        type={
                          FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]
                        }
                        {...field}
                        className="form-input text-white"
                      />
                    </FormControl>
                    <FormMessage className="text-white" />
                  </FormItem>
                )}
              />
            </div>
          ))}

          <Button
            type="submit"
            className="bg-white hover:bg-black hover:text-white"
          >
            {isSignIn ? "Sign In" : "Sign Up"}
          </Button>
          <div className="flex items-center">
            <p className="text-left text-base font-medium text-white">
              {isSignIn ? "New to Ecommerce ?" : "Already have an account ?"}

              <Link
                href={isSignIn ? "/sign-up" : "/sign-in"}
                className="font-bold text-primary"
              >
                {isSignIn ? " Create an account" : " Sign in"}
              </Link>
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AuthForm;
