import React, { useId } from "react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { label: string; value: string }[];
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className = "", label, error, options, id, ...props }, ref) => {
    const reactId = useId();
    const selectId = id || props.name || reactId;

    return (
      <div className="flex flex-col gap-2 w-full">
        {label && (
          <label htmlFor={selectId} className="text-xs font-semibold tracking-wider text-foreground-secondary uppercase">
            {label}
          </label>
        )}
        <select
          id={selectId}
          ref={ref}
          className={`flex h-14 w-full rounded-2xl border border-border bg-background px-4 py-2 text-base ring-offset-background placeholder:text-foreground-secondary/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:border-accent disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 appearance-none ${
            error ? "border-red-500 focus-visible:ring-red-500 focus-visible:border-red-500" : ""
          } ${className}`}
          {...props}
        >
          <option value="" disabled>Select an option</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && <span className="text-sm text-red-500">{error}</span>}
      </div>
    );
  }
);

Select.displayName = "Select";
