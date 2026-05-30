import Loader from "@/components/Loader";
import EmailUpdateForm from "@/components/profile/EmailUpdateForm";
import PasswordUpdateForm from "@/components/profile/PasswordUpdateForm";
import UsernameUpdateForm from "@/components/profile/UsernameUpdateForm";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  useCurrentUserQuery,
  useUploadAvatarMutation,
} from "@/store/slices/userApi";
import { useRef, useState } from "react";
import { toast } from "sonner";

function Profile() {
  const { data: user, refetch, isLoading: isGetting } = useCurrentUserQuery();
  const [uploadAvatarMutation, { isLoading }] = useUploadAvatarMutation();
  const [avatar, setAvatar] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const imageOnChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    console.log(e.target.files);
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result as string);
      }
    };
    reader.readAsDataURL(e.target.files![0]);
  };

  const uploadAvatarHandler = async () => {
    if (!avatar) {
      toast.warning("Please select your profile first!");
      return;
    }
    try {
      await uploadAvatarMutation({
        image_url: avatar,
      });
      setAvatar(null);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
      refetch();
      toast.success("Profile uploaded successfully!");
    } catch (err: any) {
      toast.error(err.data.message);
    }
  };
  return (
    <>
      {isGetting ? (
        <Loader />
      ) : (
        <main className="grid min-h-[80vh] place-items-center px-4 py-8">
          <Card className="w-full max-w-5xl">
            <CardHeader className="space-y-1">
              <CardTitle>Profile</CardTitle>
              <CardDescription>
                Manage your profile picture, email, username, and password from
                one place.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-10">
              <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
                <div className="rounded-3xl border border-border bg-muted p-6">
                  <div className="flex flex-col items-center gap-4 text-center">
                    <Avatar className="h-32 w-32">
                      <AvatarImage
                        src={avatar ?? user?.avatar?.image_url ?? ""}
                      />
                      {!user?.avatar?.image_url && (
                        <AvatarFallback>
                          {user?.username.substring(0, 1)}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        Upload a new profile picture to personalize your
                        account.
                      </p>
                      <Input
                        ref={inputRef}
                        className="text-sm"
                        type="file"
                        accept="image/*"
                        onChange={imageOnChangeHandler}
                      />
                    </div>
                  </div>
                  <Button
                    className="mt-6 w-full h-8 cursor-pointer"
                    disabled={isLoading}
                    onClick={uploadAvatarHandler}
                  >
                    Upload
                  </Button>
                </div>

                <div className="space-y-6">
                  <Card className="rounded-3xl border border-border">
                    <CardHeader>
                      <CardTitle>Email</CardTitle>
                      <CardDescription>
                        Update your email address for account notifications.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <EmailUpdateForm email={user?.email!} />
                    </CardContent>
                  </Card>

                  <Card className="rounded-3xl border border-border">
                    <CardHeader>
                      <CardTitle>Username</CardTitle>
                      <CardDescription>
                        Change the display name shown on your profile.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <UsernameUpdateForm username={user?.username!} />
                    </CardContent>
                  </Card>
                </div>
              </div>

              <Card className="rounded-3xl border border-border">
                <CardHeader>
                  <CardTitle>Password</CardTitle>
                  <CardDescription>
                    Secure your account by changing your password regularly.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <PasswordUpdateForm />
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </main>
      )}
    </>
  );
}

export default Profile;
