const InputControles = ({
  label,
  value,
  handelInput,
  placeholder,
  type = "text",
  name="",
  error,
}) => {
  return (
    <div className="w-full flex flex-col gap-1">
      {label && <label className="text-sm font-medium pl-2 text-gray-600">{label}</label>}

      <input
        type={type}
        value={value}
        onChange={handelInput}
        placeholder={placeholder}
        name={name}
        className={`
          w-full px-4 py-2.5 rounded-lg outline-none transition-all
          border shadow-sm
          ${
            error
              ? "border-red-500 focus:ring-2 focus:ring-blue-200"
              : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          }
        `}
      />

      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
};

export default InputControles;
