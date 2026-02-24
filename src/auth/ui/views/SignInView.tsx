"use client";

import Image from "next/image";
import { z } from "zod";
import { OctagonAlertIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent } from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";
import { useState } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { signIn, signInWithGithub, signInWithGoogle } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Loader from "@/components/loading-state";
const formSchema = z.object({
  email: z.email(),
  password: z.string().min(1, { message: "Password is required" }),
});

const SignInView = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setError(null);
    setLoading(true);
    const { error } = await signIn.email(
      {
        email: data.email,
        password: data.password,
        callbackURL: "/",
      },
      {
        onSuccess: () => {
          setLoading(false);
          router.push("/");
        },
        onError: ({ error }) => {
          setError(error.message);
        },
      },
    );
    setLoading(false);
  };
  return (
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="p-6 md:p-8 "
            >
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center space-y-3 ">
                  <h1 className="text-2xl font-bold">Welcome back</h1>
                  <p className="text-muted-foreground text-balance">
                    Login to your account
                  </p>
                  <div className="w-full pl-2 space-y-2">
                    <div className="grid gap-3">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="meet@gmail.com"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid gap-3">
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input
                                type="password"
                                placeholder="meet@123"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    {!!error && (
                      <Alert className="bg-destructive/10 border-none">
                        <OctagonAlertIcon className="h-4 w-4 text-destructive!" />
                        <AlertTitle className="text-destructive!">
                          {error}
                        </AlertTitle>
                      </Alert>
                    )}
                    <div>
                      <Button className="w-full">
                        {loading ? <Loader /> : "Sign in"}
                      </Button>
                    </div>
                    <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                      <span className="bg-card text-muted-foreground relative z-10 px-2">
                        Or continue with
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <Button
                        variant="outline"
                        onClick={() => signInWithGoogle()}
                        type="button"
                        className="w-full"
                      >
                        <FaGoogle />
                      </Button>
                      <Button
                        variant="outline"
                        type="button"
                        className="w-full"
                        onClick={() => signInWithGithub()}
                      >
                        <FaGithub />
                      </Button>
                    </div>
                    <div className="text-center text-sm">
                      Don{"'"}t have an account?{" "}
                      <Link href="/sign-up" className="text-blue-600 underline">
                        Sign up
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </Form>

          <div className="bg-radial from-sidebar-accent to-sidebar relative hidden md:flex flex-col gap-y-4 items-center justify-center">
            <Image
              src="./logo.svg"
              alt="Meet AI logo"
              width={92}
              height={92}
              className="h-23 w-23"
            />
            <p className="text-2xl font-semibold text-white">Meet AI</p>
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue , you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>
      </div>
    </div>
  );
};

export default SignInView;
