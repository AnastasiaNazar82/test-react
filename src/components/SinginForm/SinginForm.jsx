import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { signin } from "../../redux/auth/operatoins";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import css from "./SingInForm.module.css";
import * as Yup from "yup";
import { useId, useState } from "react";

const UserSchema = Yup.object().shape({
  email: Yup.string()
    .min(3, "Email must be 3 symbols minimum")
    .max(30, "Email must be 30 symbols maximum")
    .email("Invalid email address")
    .required("Email is required!"),
  password: Yup.string()
    .min(8, "Password must be 8 symbols minimum")
    .max(64, "Password must be 64 symbols maximum")
    .required("Password is required!"),
});

export default function SignInForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const emailFindId = useId();
  const pswFindId = useId();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleSubmit = async (values, actions) => {
    try {
      await dispatch(signin(values)).unwrap();
      navigate("/home");
    } catch (error) {
      toast.error("Login failed. Please check your credentials and try again.");
    }
    actions.setSubmitting(false);
    actions.resetForm();
  };

  return (
    <div>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={UserSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className={css.form} autoComplete="off">
            <h2 className={css.title}>Sign In</h2>
            <label className={css.label} htmlFor={emailFindId}>
              Email
              <Field
                id={emailFindId}
                className={css.form_input}
                type="email"
                name="email"
              />
              <ErrorMessage
                className={css.error}
                name="email"
                component="div"
              />
            </label>
            <label className={css.label} htmlFor={pswFindId}>
              Password
              <div className={css.passwordWrapper}>
                <Field
                  id={pswFindId}
                  className={css.form_input}
                  type={showPassword ? "text" : "password"}
                  name="password"
                />
                <span
                  onClick={togglePasswordVisibility}
                  className={css.togglePassword}
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </span>
              </div>
              <ErrorMessage
                className={css.error}
                name="password"
                component="div"
              />
            </label>
            <button className={css.btn} type="submit" disabled={isSubmitting}>
              Sign In
            </button>
          </Form>
        )}
      </Formik>
      <div className={css.navigation}>
        <p>
          Do not have an account?{" "}
          <a href="/signup" className={css.link}>
            Sign Up
          </a>
        </p>
        <p>
          <a href="/forgot-password" className={css.link}>
            Forgot your password?
          </a>
        </p>
      </div>
    </div>
  );
}
