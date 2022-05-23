import express from "express";
import { getExpressBackend, getPiSkus, getPiCurrencies, getPiUserSettings, getUsers, Register, Login, Logout } from "../controllers/Users.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";

const router = express.Router();

router.get('/express_backend', getExpressBackend);
router.get('/users', verifyToken, getUsers);
router.get('/get_pi_skus', getPiSkus);
router.get('/get_pi_currencies', getPiCurrencies);
router.get('/get_user_settings', getPiUserSettings);
router.post('/users', Register);
router.post('/login', Login);
router.get('/token', refreshToken);
router.delete('/logout', Logout);

export default router;