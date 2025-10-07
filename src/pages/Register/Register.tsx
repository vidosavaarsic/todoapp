import classNames from "classnames";
import React from "react";
import ThemeChanger from "../../ThemeChanger";
import { useTheme } from "../../context/ThemeContext";
import { Field, Form } from "react-final-form";

const Register = () => {
  const { darkMode } = useTheme();

  const onSubmit = (values: any) => {
    console.log("Form submitted successfully!", values);
  };

  const validate = (values: any) => {
    const errors: any = {};
    if (!values.fname) errors.fname = "Please enter your first name!";
    if (!values.lname) errors.lname = "Please enter your last name!";
    if (!values.email) errors.email = "Please enter your email!";

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
    } else if (values.confirmPassword !== values.password) {
      errors.confirmPassword = "Passwords do not match!";
    }
    return errors;
  };

  return (
    <div className="formPage">
      <h1 className="title">Registration</h1>
      <br />
      <ThemeChanger />

      <Form
        onSubmit={onSubmit}
        validate={validate}
        render={({ handleSubmit }) => (
          <form className="form" onSubmit={handleSubmit}>
            <Field name="fname">
              {({ input, meta }: any) => (
                <div>
                  <label
                    htmlFor="fname"
                    className={classNames("labelInForm", { dark: darkMode })}
                  >
                    First Name
                  </label>
                  <input
                    {...input}
                    type="text"
                    id="fname"
                    className={classNames("inputInForm", { dark: darkMode })}
                  />
                  {meta.touched && meta.error && (
                    <p className="errorText">{meta.error}</p>
                  )}
                </div>
              )}
            </Field>
            <Field name="lname">
              {({ input, meta }: any) => (
                <div>
                  <label
                    htmlFor="lname"
                    className={classNames("labelInForm", { dark: darkMode })}
                  >
                    Last Name
                  </label>
                  <input
                    {...input}
                    type="text"
                    id="lname"
                    className={classNames("inputInForm", { dark: darkMode })}
                  />
                  {meta.touched && meta.error && (
                    <p className="errorText">{meta.error}</p>
                  )}
                </div>
              )}
            </Field>
            <Field name="email">
              {({ input, meta }: any) => (
                <div>
                  <label
                    htmlFor="email"
                    className={classNames("labelInForm", { dark: darkMode })}
                  >
                    Your email
                  </label>
                  <input
                    {...input}
                    type="email"
                    id="email"
                    className={classNames("inputInForm", { dark: darkMode })}
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
            <Field name="confirmPassword">
              {({ input, meta }: any) => (
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className={classNames("labelInForm", { dark: darkMode })}
                  >
                    Confirm Password
                  </label>
                  <input
                    {...input}
                    type="password"
                    id="confirmPassword"
                    className={classNames("inputInForm", { dark: darkMode })}
                  />
                  {meta.touched && meta.error && (
                    <p className="errorText">{meta.error}</p>
                  )}
                </div>
              )}
            </Field>

            <button className="submitInForm">Submit</button>
          </form>
        )}
      />
    </div>
  );
};

export default Register;
