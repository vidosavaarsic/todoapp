import React from "react";
import { Field, FieldRenderProps, Form } from "react-final-form";
import { useLogs } from "../../context/LogContext";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input/Input";
import InputPassword from "../../components/Input/InputPassword";
import { validations, confirmPasswordValidations } from "../../consts";
import "..//LoginRegister.css";

type RegisterFormValues = {
  fname: string;
  lname: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const { setLog } = useLogs();
  const navigate = useNavigate();

  const onSubmit = (values: RegisterFormValues) => {
    setLog(true);
    navigate("/profile", { replace: true });
  };

  const validate = (values: RegisterFormValues) => {
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
    <div>
      <h1 className="title">Registration</h1>

      <Form
        onSubmit={onSubmit}
        validate={validate}
        render={({ handleSubmit, invalid }) => (
          <form className="form" onSubmit={handleSubmit}>
            <Field name="fname">
              {({ input, meta }: FieldRenderProps) => (
                <Input input={input} meta={meta} label="First Name" />
              )}
            </Field>
            <Field name="lname">
              {({ input, meta }: FieldRenderProps) => (
                <Input input={input} meta={meta} label="Last Name" />
              )}
            </Field>

            <Field name="email">
              {({ input, meta }: FieldRenderProps) => (
                <Input input={input} meta={meta} label="Email" />
              )}
            </Field>
            <Field name="password">
              {({ input, meta }: FieldRenderProps) => (
                <InputPassword input={input} meta={meta} label="Password" />
              )}
            </Field>
            <Field name="confirmPassword">
              {({ input, meta }: FieldRenderProps) => (
                <InputPassword
                  input={input}
                  meta={meta}
                  label="Confirm Password"
                />
              )}
            </Field>

            <button className="submitInForm" type="submit" disabled={invalid}>
              Submit
            </button>
          </form>
        )}
      />
    </div>
  );
};

export default Register;
