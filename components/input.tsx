import { ChangeEvent } from "react";

interface InputProps {
  type: string;
  label?: string;
  name: string;
  placeholder?: string;
  value: string;
  error?: string;
  disabled?: boolean;
  autoComplete?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  icon?: React.ReactNode;
  className?: string;
}

export default function Input({
  type,
  label,
  name,
  placeholder,
  value,
  error,
  disabled,
  onChange,
  icon,
  className,
  autoComplete,
}: InputProps) {
  return (
    <div className="mb-6">
      {label && (
        <label
          htmlFor={name}
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {icon && <span className="absolute left-3 text-gray-400">{icon}</span>}
        <input
          id={name}
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          disabled={disabled}
          className={`w-full pl-10 pr-4 py-2 rounded-md border ${error ? "border-red-500 ring-1 ring-red-400" : "border-gray-300"
            } text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${className ?? ""}`}
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
