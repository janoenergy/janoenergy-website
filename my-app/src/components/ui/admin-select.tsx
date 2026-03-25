import * as React from 'react';
import { cn } from '@/lib/utils';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  helper?: string;
  error?: string;
}

export const FormSelect = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, options, helper, error, ...props }, ref) => {
    return (
      <div className="mb-5">
        {label && (
          <label className="block text-base font-medium text-gray-700 mb-2">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            className={cn(
              'w-full h-12 px-4 pr-10 text-base border rounded-lg outline-none transition-all bg-white appearance-none cursor-pointer',
              'focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500',
              error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300',
              className
            )}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        {helper && !error && (
          <p className="mt-1 text-sm text-gray-500">{helper}</p>
        )}
        {error && (
          <p className="mt-1 text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

FormSelect.displayName = 'FormSelect';
