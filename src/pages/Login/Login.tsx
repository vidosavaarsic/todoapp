import React from "react";
import { useNavigate } from "react-router-dom";
import { Form, Field } from "react-final-form";
import { useLogs } from "../../context/LogContext";
import Input from "../../components/Input";
import InputPassword from "../../components/InputPassword";
import { validations } from "../../consts";

const Login = () => {
  const { setLog } = useLogs();
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
        render={({ handleSubmit, invalid }) => (
          <form className="form" onSubmit={handleSubmit}>
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
