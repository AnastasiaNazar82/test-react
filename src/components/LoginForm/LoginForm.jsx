import { Formik, Form, Field } from "formik";
import { useDispatch } from "react-redux";
import { login } from "../../redux/auth/operations";
import toast, { Toaster } from "react-hot-toast";
import css from "./LoginForm.module.css";

export default function LoginForm() {
  const dispatch = useDispatch();

  const handlSubmit = (values, actions) => {
    dispatch(login(values))
      .unwrap()
      .then(() => {})
      .catch((error) => {
        console.log(error);
        toast.error("This didn't work.");
      });
    actions.resetForm();
  };

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={handlSubmit}
      >
        <Form className={css.form} autoComplete="off">
          <label className={css.label}>
            Email
            <Field className={css.form_input} type="email" name="email" />
          </label>
          <label className={css.label}>
            Password
            <Field className={css.form_input} type="password" name="password" />
          </label>
          <button className={css.btn} type="submit">
            Log In
          </button>
        </Form>
      </Formik>
    </div>
  );
}
