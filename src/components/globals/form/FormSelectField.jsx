const FormSelectField = ({
  label,
  register,
  name,
  defaultValue,
  error,
  options,
  full = false,
  className,
}) => {
  return (
    <div
      className={full ? `col-span-2 ${className}` : `col-span-1 ${className}`}
    >
      <select
        className="border rounded-md w-[100%] bg-transparent p-3 text-[14px] font-[400]"
        {...register(name)}
        defaultValue={defaultValue}
        value={defaultValue}
      >
        <option>{label}</option>
        {options.map((item, i) => (
          <option value={`${item}`} key={i} className="">
            {item}
          </option>
        ))}
      </select>
      {error?.message && (
        <p className="text-red-500 text-[12px] font-400 lowercase">
          {error.message.toString()}
        </p>
      )}
    </div>
  );
};

export default FormSelectField;
