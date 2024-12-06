import { CreateUser } from "#/@types/user";
import { CreateUserSchema } from "#/utils/validationSchema";
import User from "#/models/user";
import { RequestHandler } from "express";
import { generateToken } from "#/utils/helper";
import { sendVerificationMail } from "#/utils/mail";

export const create: RequestHandler = async (req: CreateUser, res) => {
  const { email, password, name } = req.body;
  CreateUserSchema.validate({ email, password, name });
  const user = await User.create({ email, password, name });

  //send verification email
  const token = generateToken();
  sendVerificationMail(token, { name, email, userId: user._id.toString() });

  res.status(201).json({ user });
};
