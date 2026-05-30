import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { updateSchema } from "@/schema/auth";
import {
  useCurrentUserQuery,
  useUpdateProfileMutation,
} from "@/store/slices/userApi"; // mutation အသစ်
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import type z from "zod";

type updateProfileInputs = z.infer<typeof updateSchema>;

function Profile() {
  // 1. Data Fetching
  const { data: user, refetch } = useCurrentUserQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  // 2. States for Preview
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // 3. Form Setup
  const form = useForm<updateProfileInputs>({
    resolver: zodResolver(updateSchema),
    values: {
      username: user?.username || "",
      email: user?.email || "",
      password: undefined, // password ကို အမြဲ blank ထားမယ်
    },
  });

  // 4. Handle Image Selection (Preview only)
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // 5. Submit Handler (Sends everything)
  async function onSubmit(values: updateProfileInputs) {
    try {
      // ပုံအသစ်ရွေးထားရင် အဲဒါကိုသုံးမယ်၊ မရွေးထားရင် null ပို့မယ် (backend က ignore လုပ်ဖို့)
      const payload = {
        ...values,
        image_url: avatarPreview || undefined,
      };

      await updateProfile(payload).unwrap();

      toast.success("Profile updated successfully!");
      setAvatarPreview(null); // Clear preview after success
      if (inputRef.current) inputRef.current.value = "";
      refetch(); // Refresh user data
    } catch (err: any) {
      toast.error(err.data?.message || "Update failed");
    }
  }

  return (
    <section className="max-w-4xl mx-auto px-4 py-12 sm:px-6">
      <Card className="w-full shadow-lg">
        <CardHeader>
          <CardTitle>Edit Profile</CardTitle>
          <CardDescription>
            Update your personal information and profile picture.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Avatar Section */}
            <div className="flex flex-col items-center gap-4 py-4 border-b">
              <Avatar className="w-24 h-24 border-2 border-primary/20">
                {/* Preview ရှိရင် preview ပြမယ်၊ မရှိရင် လက်ရှိ user ပုံပြမယ် */}
                <AvatarImage
                  src={avatarPreview ?? user?.avatar?.image_url ?? ""}
                />
                <AvatarFallback className="text-xl">
                  {user?.username?.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="w-full max-w-sm">
                <FieldLabel className="text-sm font-medium mb-2 block">
                  Profile Picture
                </FieldLabel>
                <Input
                  ref={inputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                />
              </div>
            </div>

            {/* Fields Section */}
            <FieldGroup className="space-y-4">
              <Controller
                name="username"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Username</FieldLabel>
                    <Input {...field} placeholder="Username" />
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
                  <Field>
                    <FieldLabel>Email Address</FieldLabel>
                    <Input
                      {...field}
                      type="email"
                      placeholder="example@mail.com"
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
                  <Field>
                    <FieldLabel>New Password (Optional)</FieldLabel>
                    <Input {...field} type="password" placeholder="••••••••" />
                    <CardDescription className="text-xs">
                      Leave blank to keep current password.
                    </CardDescription>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Button
                type="submit"
                className="w-full mt-4 py-6 text-md font-semibold cursor-pointer"
                disabled={isUpdating}
              >
                {isUpdating ? "Updating..." : "Save Changes"}
              </Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}

export default Profile;
