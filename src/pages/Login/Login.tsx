import React from "react";
import { useNavigate } from "react-router-dom";
import { Form, Field, FieldRenderProps } from "react-final-form";
import { useLogs } from "../../context/LogContext";
import Input from "../../components/Input/Input";
import InputPassword from "../../components/Input/InputPassword";
import { validations } from "../../consts";
import "..//LoginRegister.css";

type LoginFormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const { setLog } = useLogs();
  const navigate = useNavigate();

  const onSubmit = (values: LoginFormValues) => {
    setLog(true);
    navigate("/profile", { replace: true });
  };

  const validate = (values: LoginFormValues) => {
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
    <div>
      <h1 className="title">Login</h1>
      <Form
        onSubmit={onSubmit}
        validate={validate}
        render={({ handleSubmit, invalid }) => (
          <form className="form" onSubmit={handleSubmit}>
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

            <button className="submitInForm" type="submit" disabled={invalid}>
              Submit
            </button>
          </form>
        )}
      />
    </div>
  );
};

export default Login;
