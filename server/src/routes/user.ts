import { Router } from "express";
import { getUserInfo, loginUser, logoutUser, registerUser, resetPassword, sendForgotPswEmail, updatePassword, updateUserEmail, updateUsername, uploadAvatar } from "../controllers/user.js";
import { protect } from "../middlewares/protect.js";
import { forgotPasswordValidator, resetPasswordValidator, updatedEmailValidator, updatedPasswordValidator, updatedUsernameValidator, uploadImageValidator } from "../validators/user.js";
import { validateError } from "../middlewares/validateError.js";

const router = Router();
router.post('/register', registerUser);
router.post('/login', loginUser);
router.delete('/logout', logoutUser);
router.post('/upload', uploadImageValidator, validateError, protect, uploadAvatar);
router.get('/profile', protect, getUserInfo);
router.post('/update-email', updatedEmailValidator, validateError, protect, updateUserEmail);
router.post('/update-username', updatedUsernameValidator, validateError, protect, updateUsername);
router.post('/update-password', updatedPasswordValidator, validateError, protect, updatePassword);
router.post('/forgot-password', sendForgotPswEmail);
router.post('/reset-password/:token', resetPasswordValidator, validateError, resetPassword);
export default router;