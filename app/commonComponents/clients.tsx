"use client";
import { useState } from "react";

interface Field {
  name: string;
  label: string;
  type: string;
}

interface ClientsProps {
  fields: Field[];
  onSubmit: (values: Record<string, string>) => Promise<void>;
  initialValues: Record<string, string>;
  closeSlide: () => void;
  showSlide: boolean;
}

const Clients: React.FC<ClientsProps> = ({
  fields,
  onSubmit,
  initialValues,
  closeSlide,
  showSlide,
}) => {
  const [values, setValues] = useState<Record<string, string>>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    // ✅ clear individual field error
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    setError("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    let newErrors: Record<string, string> = {};

    // ✅ Validate each field
    fields.forEach((field) => {
      if (!values[field.name] || values[field.name].trim() === "") {
        newErrors[field.name] = `${field.label} is required`;
      }
    });

    // ❌ If any errors → stop submit
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await onSubmit(values);

      setValues(initialValues);
      setErrors({});
      closeSlide();
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    }
  };

  return (
    <div
      className={`fixed top-0 right-0 min-w-[600px] h-full w-72 bg-white shadow-lg 
  transform transition-transform duration-300 ease-in-out z-50
  ${showSlide ? "translate-x-0" : "translate-x-full"}`}
    >
      {/* Close Button */}
      <div className="pl-2 pt-2">
        <button
          className="bg-gray-200 rounded-md p-1"
          onClick={closeSlide}
        >
          ✕
        </button>
      </div>

      <div className="p-5 h-[calc(100%-40px)] flex flex-col">
        <form onSubmit={handleSubmit} className="flex flex-col h-full">

          {/* 🔥 Scroll ONLY this area */}
          <div className="flex-1 overflow-y-auto pr-2 space-y-4 px-[20px] py-[20px]">
            {fields.map((field) => (
              <div key={field.name} className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-700">
                  {field.label}
                </label>

                <input
                  type={field.type}
                  name={field.name}
                  value={values[field.name] || ""}
                  onChange={handleInput}
                  placeholder={`Enter ${field.label}`}
                  className={`p-2.5 rounded-lg text-sm outline-none transition-all duration-200
              bg-gray-50
              ${errors[field.name]
                      ? "border border-red-500 focus:ring-2 focus:ring-red-300"
                      : "border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    }`}
                />

                {errors[field.name] && (
                  <span className="text-red-500 text-xs">
                    {errors[field.name]}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* 🔥 FIXED FOOTER (NOT SCROLLING) */}
          <div className="pt-4 border-t bg-white">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2.5 rounded-lg font-semibold
          hover:bg-blue-600 active:scale-95 transition duration-200 shadow-sm"
            >
              Submit
            </button>

            {success && (
              <p className="text-green-600 text-sm bg-green-50 p-2 rounded-md mt-2">
                {success}
              </p>
            )}

            {error && (
              <p className="text-red-600 text-sm bg-red-50 p-2 rounded-md mt-2">
                {error}
              </p>
            )}
          </div>

        </form>
      </div>
    </div>
  );
};

export default Clients;