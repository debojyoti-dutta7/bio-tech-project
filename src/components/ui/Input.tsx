import { forwardRef } from 'react';
import type { InputHTMLAttributes, SelectHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-sm font-medium text-text">{label}</label>
      )}
      <input
        ref={ref}
        className={`w-full rounded-xl border border-border bg-card px-4 py-2.5 text-sm text-text placeholder:text-muted/60 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 ${error ? 'border-red-400' : ''} ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
);

Input.displayName = 'Input';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, className = '', ...props }, ref) => (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-sm font-medium text-text">{label}</label>
      )}
      <select
        ref={ref}
        className={`w-full rounded-xl border border-border bg-card px-4 py-2.5 text-sm text-text outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 appearance-none cursor-pointer ${error ? 'border-red-400' : ''} ${className}`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
);

Select.displayName = 'Select';
