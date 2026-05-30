import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { forgotPasswordSchema, resetPasswordSchema } from "@/schema/auth";
import { clearUserInfo } from "@/store/slices/auth";
import { useForgotPasswordMutation } from "@/store/slices/userApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import type z from "zod";

type forgotPswInput = z.infer<typeof forgotPasswordSchema>;

function ForgotPassword() {
    const [ forgotPasswordMutation, { isLoading }] = useForgotPasswordMutation();

    const form = useForm<forgotPswInput>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: ""
        }
    });
    const onSubmit = async (data: forgotPswInput) => {
        try {
            const res = await forgotPasswordMutation(data).unwrap();
            form.reset();
            toast.success(res.message);
        } catch (err: any) {
            toast.error(err?.data?.message);
            console.log(err);
        }
    }
    
  return (
    <main className="h-[80vh] flex items-center justify-center">
      <Card className="w-full sm:max-w-md p-5">
        <CardHeader>
            <CardTitle className="text-center text-xl font-bold">Reset Password</CardTitle>
        </CardHeader>
        <CardContent>
            <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup>
                    <Controller
                    name="email"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-rhf-demo-title">
                            New Password
                        </FieldLabel>
                        <Input
                            {...field}
                            id="form-rhf-demo-title"
                            aria-invalid={fieldState.invalid}
                            placeholder="john_doe@gmail.com"
                            autoComplete="off"
                        />
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                        </Field>
                    )}
                    />
                    <Button disabled={isLoading} type="submit" className="w-full cursor-pointer" form="form-rhf-demo">
                    Submit
                    </Button>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    </main>
  )
}

export default ForgotPassword
