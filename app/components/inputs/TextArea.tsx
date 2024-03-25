import React from "react";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface TextAreaProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

export default function TextArea({
  id,
  label,
  disabled,
  required,
  register,
  errors,
}: TextAreaProps) {
  return (
    <div className="relative w-full">
      <textarea
        placeholder=""
        id={id}
        disabled={disabled}
        required={required}
        {...register(id, { required: "This field is required" })}
        className={`peer max-h-[150px] min-h-[150x] w-full p-4 pt-6 outline-none bg-white font-light border-2 rounded-md transition disabled:opacity-70 disabled:cursor-not-allowed ${
          errors[id] ? "border-rose-400" : "border-slate-300"
        } ${errors[id] ? "focus:border-rose-400" : "focus:border-slate-300"}`}
      />
      <label
        htmlFor={id}
        className={`absolute text-base duration-150 transform -translate-y-3 cursor-text top-5 left-4 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 ${
          errors[id] ? "text-rose-500" : "text-slate-500"
        }`}
      >
        {label}
      </label>
    </div>
  );
}
