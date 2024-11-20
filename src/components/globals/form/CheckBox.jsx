import { useFormikContext } from "formik";

const CheckBox = ({
  name,
  placeholder,
  className = "",
  full = false,
  ...rest
}) => {
  const { errors, values, touched, handleBlur, handleChange } =
    useFormikContext();

  const value = values[name];
  const error = errors[name];
  const isInputTouched = touched[name];

  return (
    <div
      className={full ? `col-span-2 ${className}` : `col-span-1 ${className}`}
    >
      <div className="w-full flex items-center gap-[10px]">
        <input
          type="checkbox"
          value={value}
          onChange={handleChange(name)}
          onBlur={handleBlur(name)}
          placeholder={placeholder}
          className="border rounded-md p-3 h-5 w-5"
          id={name}
        />
        <label htmlFor={name} className="text-xs text-[#636060] font-semibold">
          {placeholder}
        </label>
      </div>
      {error && isInputTouched ? (
        <div className="text-red-500 text-[12px] font-400 lowercase">
          {error}
        </div>
      ) : null}
    </div>
  );
};

export default CheckBox;
