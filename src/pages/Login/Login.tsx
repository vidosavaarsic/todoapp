import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLogs } from "../../context/LogContext";
import ThemeChanger from "../../ThemeChanger";
import { useTheme } from "../../context/ThemeContext";
import classNames from "classnames";
import { Form, Field } from "react-final-form";
import "./Login.css";
const Login = () => {
  const { log, setLog } = useLogs();
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  const onSubmit = (values: any) => {
    console.log("Submitted values:", values);
    setLog(true);
  };

  const validate = (values: any) => {
    const errors: any = {};
    if (!values.email) errors.email = "Email is required";
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    } else if (values.password.length > 20) {
      errors.password = "Password must be less than 20 characters";
    } else if (!/[A-Z]/.test(values.password)) {
      errors.password = "Password must contain an uppercase letter";
    } else if (!/[!@#$%^&*]/.test(values.password)) {
      errors.password = "Password must contain a special character";
    } else if (!/\d/.test(values.password)) {
      errors.password = "Password must contain a number";
    }
    return errors;
  };

  useEffect(() => {
    if (log) {
      navigate("/profile", { replace: true });
    }
  }, [log, navigate]);

  return (
    <div className="formPage">
      <h1 className="title">Login</h1>
      <br />
      <ThemeChanger />

      <Form
        onSubmit={onSubmit}
        validate={validate}
        render={({ handleSubmit }) => (
          <form className="form" onSubmit={handleSubmit}>
            <Field name="email">
              {({ input, meta }: any) => (
                <div>
                  <label
                    htmlFor="email"
                    className={classNames("labelInForm", { dark: darkMode })}
                  >
                    Email
                  </label>
                  <input
                    {...input}
                    type="email"
                    id="email"
                    className={classNames("inputInForm", { dark: darkMode })}
                    placeholder="example@gmail.com"
                  />
                  {meta.touched && meta.error && (
                    <p className="errorText">{meta.error}</p>
                  )}
                </div>
              )}
            </Field>

            <Field name="password">
              {({ input, meta }: any) => (
                <div>
                  <label
                    htmlFor="password"
                    className={classNames("labelInForm", { dark: darkMode })}
                  >
                    Password
                  </label>
                  <input
                    {...input}
                    type="password"
                    id="password"
                    className={classNames("inputInForm", { dark: darkMode })}
                  />
                  {meta.touched && meta.error && (
                    <p className="errorText">{meta.error}</p>
                  )}
                </div>
              )}
            </Field>

            <button className="submitInForm" type="submit">
              Submit
            </button>
          </form>
        )}
      />
    </div>
  );
};

export default Login;
