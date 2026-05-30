import type { IUser } from "@/types/user";
import { apiSlice } from "./api";

interface loginInputs {
    email: string;
    password: string;
}

interface registerInputs extends loginInputs {
    username: string;
}

interface uploadAvatarInputs {
    image_url: string;
}

interface updatedEmailInput {
    email: string
}

interface updatedUsernameInput {
    username: string
}

interface updatedPasswordInputs {
    currentPassword: string,
    newPassword: string
}

interface forgotPasswordInput {
    email: string
}

interface resetPasswordInputs {
    token: string
    newPassword: string
}

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (data: registerInputs) => ({
                url: "/register",
                method: "POST",
                body: data
            })
        }),
        login: builder.mutation({
            query: (data: loginInputs) => ({
                url: "/login",
                method: "POST",
                body: data,
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/logout',
                method: 'DELETE'
            })
        }),
        currentUser: builder.query<IUser, void>({
            query: () => ({
                url:'/profile',
                method: 'GET'
            }),
            // Profile update လုပ်ပြီးတိုင်း data အသစ် auto ဖြစ်အောင် tag ထည့်ပေးသင့်တယ်
            providesTags: ['User'] 
        }),
        uploadAvatar: builder.mutation({
            query: (data: uploadAvatarInputs) => ({
                url: '/upload',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['User']
        }),
        updateEmail: builder.mutation({
            query: (data: updatedEmailInput) => ({
                url: '/update-email',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['User']
        }),
        updateUsername: builder.mutation({
            query: (data: updatedUsernameInput) => ({
                url: '/update-username',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['User']
        }),
        updatePassword: builder.mutation({
            query: (data: updatedPasswordInputs) => ({
                url: '/update-password',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['User']
        }),
        forgotPassword: builder.mutation({
            query: (data: forgotPasswordInput) => ({
                url: '/forgot-password',
                method: 'POST',
                body: data
            })
        }),
        resetPassword: builder.mutation({
            query: (data: resetPasswordInputs) => ({
                url: `/reset-password/${data.token}`,
                method: 'POST',
                body: {
                    newPassword : data.newPassword
                }
            })
        })
    })
});

export const { 
    useRegisterMutation, 
    useLoginMutation, 
    useLogoutMutation, 
    useCurrentUserQuery, 
    useUploadAvatarMutation,
    useUpdateEmailMutation,
    useUpdateUsernameMutation,
    useUpdatePasswordMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation
} = userApiSlice;