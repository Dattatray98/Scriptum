import { Router } from "express";
import { CreateUser, UserLogin, UserProfile } from "../controllers/userAuth.controller";
import { Auth } from "../middlewares/Auth.middleware";

const router = Router();

router.post("/signup", CreateUser);
router.post("/login", UserLogin);
router.get("/profile", Auth, UserProfile);

export default router;