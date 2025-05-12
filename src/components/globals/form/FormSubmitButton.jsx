const FormSubmitButton = ({ title, className }) => {
  return (
    <button
      className={className}
      style={{
        background: "#000",
        color: "#fff",
      }}
    >
      {title}
    </button>
  );
};

export default FormSubmitButton;
