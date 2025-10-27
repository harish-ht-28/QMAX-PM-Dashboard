import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

export function Button({ children, ...props }: ButtonProps) {
  return (
    <button className="py-2 px-4 bg-blue-500 text-white rounded" {...props}>
      {children}
    </button>
  );
}
