import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helper?: string;
  error?: string;
}

export const FormInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, helper, error, ...props }, ref) => {
    return (
      <div className="mb-5">
        {label && (
          <label className="block text-base font-medium text-gray-700 mb-2">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            'w-full h-12 px-4 text-base border rounded-lg outline-none transition-all placeholder:text-gray-400',
            'focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500',
            error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300',
            className
          )}
          {...props}
        />
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

FormInput.displayName = 'FormInput';
