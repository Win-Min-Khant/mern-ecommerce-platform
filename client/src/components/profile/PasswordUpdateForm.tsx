import { updatedPasswordSchema } from "@/schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import type z from "zod";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useUpdatePasswordMutation } from "@/store/slices/userApi";
import { toast } from "sonner";
import { Link } from "react-router";

type updatedPasswordInputs = z.infer<typeof updatedPasswordSchema>;

function PasswordUpdateForm() {
  const [updatePswMutation, { isLoading }] = useUpdatePasswordMutation();
  const form = useForm<z.infer<typeof updatedPasswordSchema>>({
    resolver: zodResolver(updatedPasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const watchedNewPassword = form.watch("newPassword");
  const watchedConfirmPassword = form.watch("confirmPassword");

  async function onSubmit(data: updatedPasswordInputs) {
    try {
      const res = await updatePswMutation({
        currentPassword: data.currentPassword,
        newPassword: data.confirmPassword,
      }).unwrap();
      form.reset();
      toast.success(res.message);
    } catch (err: any) {
      toast.error(err.data.message);
      console.log(err);
    }
  }
  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="grid gap-6 md:grid-cols-3">
        <Controller
          name="currentPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Current Password</FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                autoComplete="off"
                type="password"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="newPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>New Password</FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                autoComplete="off"
                type="password"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="confirmPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Confirm Password</FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                autoComplete="off"
                type="password"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button
          disabled={watchedNewPassword !== watchedConfirmPassword || isLoading}
          className="w-full sm:w-28 cursor-pointer"
        >
          Update
        </Button>
        <Link to="/forgot-password">
          <Button variant="outline" className="w-full cursor-pointer sm:w-44">
            Forgot Password
          </Button>
        </Link>
      </div>
    </form>
  );
}

export default PasswordUpdateForm;
