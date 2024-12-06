import * as yup from "yup";

export const CreateUserSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required("Name is missing")
    .min(3, "Name is too short!")
    .max(20, "Name is too long!"),
  email: yup.string().required("Email is missing").email("Invalid email id"),
  password: yup
    .string()
    .trim()
    .required("Password is missing!")
    .min(8, "Password id too short!")
    .matches(
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
      "Password is too simple!"
    ),
});
