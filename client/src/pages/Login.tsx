import type z from "zod";
import { loginSchema } from "../schema/auth";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { useLoginMutation } from "@/store/slices/userApi";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setUserInfo } from "@/store/slices/auth";

type loginInputs = z.infer<typeof loginSchema>;

function Login() {
  const [loginMutation, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const form = useForm<loginInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: loginInputs) => {
    try {
      const res = await loginMutation(data).unwrap();
      dispatch(setUserInfo(res));
      form.reset();
      toast.success("Logged in successfully!");
      navigate("/");
    } catch (err: any) {
      toast.error(err?.data?.message);
      console.log(err);
    }
  };

  return (
    <main className="grid min-h-[80vh] place-items-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-semibold">Welcome back</CardTitle>
          <CardDescription>
            Sign in to your account to continue shopping with KESH.COM.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FieldGroup>
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="login-email">Email</FieldLabel>
                    <Input
                      {...field}
                      id="login-email"
                      aria-invalid={fieldState.invalid}
                      placeholder="john_doe@gmail.com"
                      autoComplete="email"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="login-password">Password</FieldLabel>
                    <Input
                      {...field}
                      id="login-password"
                      type="password"
                      aria-invalid={fieldState.invalid}
                      placeholder="••••••••"
                      autoComplete="current-password"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
            <Button type="submit" className="w-full" disabled={isLoading}>
              Sign in
            </Button>
          </form>
          <div className="flex justify-between text-sm text-muted-foreground">
            <Link
              to="/forgot-password"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              Forgot password?
            </Link>
            <Link
              to="/register"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              Create account
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}

export default Login;
