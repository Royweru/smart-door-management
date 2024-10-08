"use client";

import * as z from "zod";
import React, { useState, useTransition } from "react";

import { AuthFlow } from "../types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { LoginSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { ErrorSec } from "./error-sec";
import { Login } from "@/actions/login";

export const LoginCard = ({
  setState,
}: {
  setState: (state: AuthFlow) => void;
}) => {
  const [isPending, startTransition] = useTransition();
  const [err, setErr] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const handleSubmit = (vals: z.infer<typeof LoginSchema>) => {
    setErr("");
    startTransition(() => {
      Login(vals).then((data) => {
        setErr(data?.error);
        form.reset();
        
      });
    });
  };

  return (
    <Card className=" lg:w-[450px] md:w-[380px] sm:w-[320px] w-full sm:mx-0 mx-4">
      <CardContent>
        <CardHeader>
          <CardTitle className=" text-xl lg:text-2xl font-semibold text-maroon">
            Login
          </CardTitle>
          <CardDescription>
            Hey user welcome back , we missed you !
          </CardDescription>
        </CardHeader>
        <div className=" w-full p-2 ">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className=" space-y-2"
            >
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className=" font-semibold text-zinc-600">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder=" Enter your email.."
                        disabled={isPending}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className=" font-semibold text-zinc-600">
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="*******"
                        disabled={isPending}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <ErrorSec message={err} />
              <div className=" w-full ">
                <Button
                  className=" w-full font-semibold text-sm flex justify-start gap-x-2 items-center"
                  variant={"link"}
                >
                  Don&apos;t have an account
                  <span
                    className=" text-xs text-blue-600 cursor-pointer"
                    onClick={() => setState("signUp")}
                  >
                    Sign up
                  </span>
                </Button>
              </div>
              <div className=" w-full flex items-center justify-center">
                <Button type="submit" size={"lg"} disabled={isPending}>
                  Login
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
};
