import express from "express";
import { getExpressBackend, getPiSkus, getPiCurrencies, getPiUserSettings, getGRecaptcha, Register, Login, Logout } from "../controllers/Users.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
// import { getCaptchaToken } from "../";

const router = express.Router();

router.get('/express_backend', getExpressBackend);
router.get('/get_google_recaptcha', verifyToken, getGRecaptcha);
router.get('/get_pi_skus', getPiSkus);
router.get('/get_pi_currencies', getPiCurrencies);
router.get('/get_user_settings', getPiUserSettings);
router.post('/register', Register);
router.post('/login', Login);
router.get('/token', refreshToken);
router.delete('/logout', Logout);

export default router;