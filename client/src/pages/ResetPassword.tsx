import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { resetPasswordSchema } from "@/schema/auth";
import { clearUserInfo } from "@/store/slices/auth";
import { useLogoutMutation, useResetPasswordMutation } from "@/store/slices/userApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router"
import { toast } from "sonner";
import type z from "zod";

type resetPswInputs = z.infer<typeof resetPasswordSchema>;

function ResetPassword() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [ resetPasswordMutation, { isLoading }] = useResetPasswordMutation();
    const dispatch = useDispatch();
    const [ logoutMutation ] = useLogoutMutation();

    const form = useForm<resetPswInputs>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            newPassword: "",
            confirmPassword: ""
        }
    });
    const onSubmit = async (data: resetPswInputs) => {
        try {
            const res = await resetPasswordMutation({
                token: id!,
                newPassword : data.newPassword
            }).unwrap();
            dispatch(clearUserInfo());
            await logoutMutation({});
            form.reset();
            toast.success(res.message);
            navigate('/login');
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
                    name="newPassword"
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
                            placeholder="* * * * *"
                            type="password"
                            autoComplete="off"
                        />
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                        </Field>
                    )}
                    />
                    <Controller
                    name="confirmPassword"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-rhf-demo-title">
                            Confirm Password
                        </FieldLabel>
                        <Input
                            {...field}
                            id="form-rhf-demo-title"
                            aria-invalid={fieldState.invalid}
                            placeholder="* * * * *"
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

export default ResetPassword
