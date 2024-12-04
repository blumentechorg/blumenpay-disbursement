import * as yup from "yup";

export const userSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().min(6).max(10).required("Password is required"),
});
