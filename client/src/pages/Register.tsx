import type z from "zod";
import { registerSchema } from "../schema/auth";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { useRegisterMutation } from "@/store/slices/userApi";
import { toast } from "sonner";

type registerInputs = z.infer<typeof registerSchema>;

function Register() {
  const [registerMutation, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();
  const form = useForm<registerInputs>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: registerInputs) => {
    try {
      await registerMutation(data).unwrap();
      form.reset();
      toast.success("Registration successful!");
      navigate("/login");
    } catch (err: any) {
      toast.error(err?.data?.message);
      console.log(err);
    }
  };

  return (
    <main className="grid min-h-[80vh] place-items-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-semibold">
            Create your account
          </CardTitle>
          <CardDescription>
            Create a new account and start exploring products on KESH.COM.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FieldGroup>
              <Controller
                name="username"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="register-username">
                      Username
                    </FieldLabel>
                    <Input
                      {...field}
                      id="register-username"
                      aria-invalid={fieldState.invalid}
                      placeholder="John Doe"
                      autoComplete="name"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="register-email">Email</FieldLabel>
                    <Input
                      {...field}
                      id="register-email"
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
                    <FieldLabel htmlFor="register-password">
                      Password
                    </FieldLabel>
                    <Input
                      {...field}
                      id="register-password"
                      type="password"
                      aria-invalid={fieldState.invalid}
                      placeholder="••••••••"
                      autoComplete="new-password"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
            <Button type="submit" className="w-full" disabled={isLoading}>
              Create account
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-3">
          <p className="text-center text-sm text-muted-foreground">
            Already have an account?
          </p>
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => navigate("/login")}
          >
            Log in
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}

export default Register;
