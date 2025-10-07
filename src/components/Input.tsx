import classNames from "classnames";
import React from "react";
import { useTheme } from "../context/ThemeContext";

type InputProps = {
  input: {
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: () => void;
    onFocus: () => void;
  };
  meta: any;
  label: string;
};
const Input = ({ input, meta, label }: InputProps) => {
  const { darkMode } = useTheme();

  return (
    <div>
      <label
        htmlFor={input.name}
        className={classNames("labelInForm", { dark: darkMode })}
      >
        {label}
      </label>
      <input
        {...input}
        type={input.name}
        id={input.name}
        className={classNames("inputInForm", { dark: darkMode })}
      />
      {meta.touched && meta.error && <p className="errorText">{meta.error}</p>}
    </div>
  );
};

export default Input;
