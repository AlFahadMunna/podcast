import { Router } from "express";
import {
  CreateUserSchema,
  SigninValidationSchema,
  TokenAndIDValidation,
  updatePasswordSchema,
} from "#/utils/validationSchema";
import {
  create,
  generateForgetPasswordLink,
  grantValid,
  sendReVerificationToken,
  signIn,
  updatePassword,
  verifyEmail,
} from "#/controllers/user";
import { isValidPasswordResetToken, mustAuth } from "#/middleware/auth";
import { validate } from "#/middleware/validator";

const router = Router();

router.post("/create", validate(CreateUserSchema), create);
router.post("/verify-email", validate(TokenAndIDValidation), verifyEmail);
router.post("/re-verify-email", sendReVerificationToken);
router.post("/forget-password", generateForgetPasswordLink);
router.post(
  "/verify-pass-reset-token",
  validate(TokenAndIDValidation),
  isValidPasswordResetToken,
  grantValid
);
router.post(
  "/update-password",
  validate(updatePasswordSchema),
  isValidPasswordResetToken,
  updatePassword
);
router.post("/sign-in", validate(SigninValidationSchema), signIn);
router.get("/is-auth", mustAuth, (req, res) => {
  res.json({ profile: req.user });
});

import formidable = require("formidable");

router.post("/update-profile", (req, res) => {
  const form = formidable();
  form.parse(req, (err, fields, files) => {
    console.log("files:", files);
    console.log("fields:", fields);

    res.json({ uploaded: true });
  });
});

export default router;
