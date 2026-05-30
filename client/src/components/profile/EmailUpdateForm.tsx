import { updatedEmailSchema } from "@/schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import type z from "zod";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useUpdateEmailMutation } from "@/store/slices/userApi";
import { useEffect } from "react";

type updatedEmailInput = z.infer<typeof updatedEmailSchema>;

interface EmailUpdateFormProps {
  email: string;
}

function EmailUpdateForm({ email }: EmailUpdateFormProps) {
  const form = useForm<updatedEmailInput>({
    resolver: zodResolver(updatedEmailSchema),
    defaultValues: {
      email,
    },
  });
  const [updateEmail, { isLoading }] = useUpdateEmailMutation();

  const watchedEmail = form.watch("email");

  const onSubmit = async (data: updatedEmailInput) => {
    try {
      const res = await updateEmail(data).unwrap();
      toast.success(res.message);
    } catch (err: any) {
      toast.error(err?.data?.message);
      console.log(err);
    }
  };

  useEffect(() => {
    form.reset({ email });
  }, [email]);

  return (
    <>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Email</FieldLabel>
              <Input
                {...field}
                aria-invalid={fieldState.invalid}
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Button
          disabled={email === watchedEmail || isLoading}
          className="mt-4 cursor-pointer w-20"
        >
          Update
        </Button>
      </form>
    </>
  );
}

export default EmailUpdateForm;
