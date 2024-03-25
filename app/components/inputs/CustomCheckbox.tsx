import React from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

interface CustomCheckboxProps {
  id: string;
  label: string;
  disabled?: boolean;
  register: UseFormRegister<FieldValues>;
}

export default function CustomCheckbox({
  id,
  label,
  disabled,
  register,
}: CustomCheckboxProps) {
  return (
    <div className="flex items-center w-full gap-2">
      <input
        type="checkbox"
        id={id}
        {...register(id)}
        disabled={disabled}
        placeholder=""
        className="cursor-pointer"
      />
      <label htmlFor={id} className="font-medium cursor-pointer">
        {label}
      </label>
    </div>
  );
}
