import { useFormikContext } from "formik";
import { useState } from "react";
import { FaEye } from "react-icons/fa";

const InputField = ({
  name,
  placeholder,
  type = "text",
  full = false,
  className = "",
  disabled = false,
  ...rest
}) => {
  const { errors, values, touched, handleBlur, handleChange } =
    useFormikContext();

  const value = values[name];
  const error = errors[name];
  const isInputTouched = touched[name];

  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div
      className={full ? `col-span-2 ${className}` : `col-span-1 ${className}`}
    >
      {type === "password" ? (
        <div className="pass-field border rounded-md w-[100%] bg-transparent flex justify-between items-center gap-1 pe-2">
          <input
            value={value}
            placeholder={placeholder}
            onChange={handleChange(name)}
            onBlur={handleBlur(name)}
            type={showPassword ? "text" : "password"}
            disabled={disabled}
            className="border-0 w-full bg-transparent py-4 text-[14px] font-[400]"
            autoComplete="off"
            {...rest}
          />
          <FaEye size={17} onClick={togglePassword} />
        </div>
      ) : (
        <input
          value={value}
          placeholder={placeholder}
          onChange={handleChange(name)}
          onBlur={handleBlur(name)}
          type={type}
          disabled={disabled}
          className="border rounded-md w-[100%] bg-transparent px-3 py-5 text-[14px] font-[400]"
          autoComplete="off"
          {...rest}
        />
      )}
      {error && isInputTouched ? (
        <div className="text-red-500 text-[12px] font-400 lowercase">
          {error}
        </div>
      ) : null}
    </div>
  );
};

export default InputField;
