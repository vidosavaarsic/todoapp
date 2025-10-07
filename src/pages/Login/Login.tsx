import React from "react";
import { useNavigate } from "react-router-dom";
import { useLogs } from "../../context/LogContext";
import { useTheme } from "../../context/ThemeContext";
import classNames from "classnames";
import { Form, Field } from "react-final-form";
import "./Login.css";

export const validations = [
  {
    test: (val: string) => val.length < 6,
    message: "Password must be at least 6 characters",
  },
  {
    test: (val: string) => val.length > 20,
    message: "Password must be less than 20 characters",
  },
  {
    test: (val: string) => !/[A-Z]/.test(val),
    message: "Password must contain an uppercase letter",
  },
  {
    test: (val: string) => !/[!@#$%^&*]/.test(val),
    message: "Password must contain a special character",
  },
  {
    test: (val: string) => !/\d/.test(val),
    message: "Password must contain a number",
  },
];

const Login = () => {
  const { setLog } = useLogs();
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  const onSubmit = (values: any) => {
    console.log("Submitted values:", values);
    setLog(true);
    navigate("/profile", { replace: true });
  };

  const validate = (values: any) => {
    const errors: any = {};
    if (!values.email) errors.email = "Email is required";
    if (!values.password) {
      errors.password = "Password is required";
      return errors;
    }

    const failedValidation = validations.find(({ test }) =>
      test(values.password)
    );

    errors.password = failedValidation?.message;

    return errors;
  };

  return (
    <div className="formPage">
      <h1 className="title">Login</h1>
      <Form
        onSubmit={onSubmit}
        validate={validate}
        render={({ handleSubmit, errors }) => (
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
