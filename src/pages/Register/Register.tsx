import React from "react";
import { Field, Form } from "react-final-form";
import { useLogs } from "../../context/LogContext";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import InputPassword from "../../components/InputPassword";
import { validations, confirmPasswordValidations } from "../../consts";

const Register = () => {
  const { setLog } = useLogs();
  const navigate = useNavigate();

  const onSubmit = (values: any) => {
    console.log("Form submitted successfully!", values);
    setLog(true);
    navigate("/profile", { replace: true });
  };

  const validate = (values: any) => {
    const errors: any = {};
    if (!values.fname) errors.fname = "Please enter your first name!";
    if (!values.lname) errors.lname = "Please enter your last name!";
    if (!values.email) errors.email = "Please enter your email!";

    if (!values.password) {
      errors.password = "Password is required";
      return errors;
    }

    const failedPassowrd = validations.find(({ test }) =>
      test(values.password)
    );
    errors.password = failedPassowrd?.message;

    const failedConfirm = confirmPasswordValidations.find(({ test }) =>
      test(values.confirmPassword, values.password)
    );
    errors.confirmPassword = failedConfirm?.message;

    return errors;
  };

  return (
    <div className="formPage">
      <h1 className="title">Registration</h1>

      <Form
        onSubmit={onSubmit}
        validate={validate}
        render={({ handleSubmit }) => (
          <form className="form" onSubmit={handleSubmit}>
            <Field name="fname">
              {({ input, meta }: any) => (
                <Input input={input} meta={meta} label="First Name" />
              )}
            </Field>
            <Field name="lname">
              {({ input, meta }: any) => (
                <Input input={input} meta={meta} label="Last Name" />
              )}
            </Field>
            <Field name="email">
              {({ input, meta }: any) => (
                <Input input={input} meta={meta} label="Email" />
              )}
            </Field>
            <Field name="password">
              {({ input, meta }: any) => (
                <InputPassword input={input} meta={meta} label="Password" />
              )}
            </Field>
            <Field name="confirmPassword">
              {({ input, meta }: any) => (
                <InputPassword
                  input={input}
                  meta={meta}
                  label="Confirm Password"
                />
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

export default Register;
