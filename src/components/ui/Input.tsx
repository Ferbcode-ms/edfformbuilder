import React, { useId } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", label, error, id, ...props }, ref) => {
    const reactId = useId();
    const inputId = id || props.name || reactId;
    
    return (
      <div className="flex flex-col gap-2 w-full">
        {label && (
          <label htmlFor={inputId} className="text-xs font-semibold tracking-wider text-foreground-secondary uppercase">
            {label}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          className={`flex h-14 w-full rounded-2xl border border-border bg-background px-4 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-foreground-secondary/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:border-accent disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 ${
            error ? "border-red-500 focus-visible:ring-red-500 focus-visible:border-red-500" : ""
          } ${className}`}
          {...props}
        />
        {error && <span className="text-sm text-red-500">{error}</span>}
      </div>
    );
  }
);

Input.displayName = "Input";
