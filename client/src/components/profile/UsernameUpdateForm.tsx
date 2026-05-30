import { updatedUsernameSchema } from "@/schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useUpdateUsernameMutation } from "@/store/slices/userApi";
import { toast } from "sonner";

type updatedUsernameInput = z.infer<typeof updatedUsernameSchema>;

interface UsernameUpdateFormProps {
  username: string;
}

function UsernameUpdateForm({ username }: UsernameUpdateFormProps) {
  const [updateUsername, { isLoading }] = useUpdateUsernameMutation();
  const form = useForm<updatedUsernameInput>({
    resolver: zodResolver(updatedUsernameSchema),
    defaultValues: {
      username,
    },
  });

  const watchedUsername = form.watch("username");

  const onSubmit = async (data: updatedUsernameInput) => {
    try {
      const res = await updateUsername(data).unwrap();
      toast.success(res.message);
    } catch (err: any) {
      toast.error(err?.data?.message);
      console.log(err);
    }
  };
  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Controller
        name="username"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>Username</FieldLabel>
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
        disabled={username === watchedUsername || isLoading}
        className="mt-4 cursor-pointer w-20"
      >
        Update
      </Button>
    </form>
  );
}

export default UsernameUpdateForm;
