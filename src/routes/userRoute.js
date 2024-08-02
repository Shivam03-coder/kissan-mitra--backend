import { Router } from "express";
import passport from "passport";
import getnewToken from "../middlewares/getnewToken.js";
import {
  usersignupController,
  userloginController,
  userprofileController,
  userlogoutController,
  userpasswordChangeController,
} from "../controllers/index.js";

const Authroutes = Router();

// Public Routes



Authroutes.route("/signup").post(usersignupController);
Authroutes.route("/login").post(userloginController);
Authroutes.route("/logout").post(userlogoutController);
Authroutes.route("/passwordchange").post(userpasswordChangeController);



// Protected Routes
Authroutes.route("/user-profile").post(
  getnewToken,
  passport.authenticate("jwt", { session: false }),
  userprofileController
);
export { Authroutes };
