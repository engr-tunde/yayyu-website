import { FaEye } from "react-icons/fa";

const FormInputField = ({
  type = "text",
  register,
  name,
  defaultValue,
  error,
  inputProps,
  placeholder,
  disabled = false,
  full = false,
  className,
}) => {
  return (
    <div
      className={full ? `col-span-2 ${className}` : `col-span-1 ${className}`}
    >
      {type === "password" ? (
        <div className="pass-field border rounded-md w-[100%] bg-transparent flex justify-between items-center gap-1 pe-2">
          <input
            type={showPassword ? "text" : "password"}
            {...register(name)}
            className="border-0 w-full bg-transparent py-4 text-[14px] font-[400]"
            defaultValue={defaultValue}
            placeholder={placeholder}
            disabled={disabled}
            {...inputProps}
          />
          <FaEye size={17} onClick={togglePassword} />
        </div>
      ) : (
        <input
          type={type}
          {...register(name)}
          className="border rounded-md w-[100%] bg-transparent px-3 py-5 text-[14px] font-[400]"
          defaultValue={defaultValue}
          placeholder={placeholder}
          disabled={disabled}
          {...inputProps}
        />
      )}
      {error?.message && (
        <p className="text-red-400 text-[12px] font-400 lowercase">
          {error.message.toString()}
        </p>
      )}
    </div>
  );
};

export default FormInputField;
