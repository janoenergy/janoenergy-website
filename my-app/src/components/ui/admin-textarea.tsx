import * as React from 'react';
import { cn } from '@/lib/utils';

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helper?: string;
  error?: string;
}

export const FormTextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, label, helper, error, rows = 4, ...props }, ref) => {
    return (
      <div className="mb-5">
        {label && (
          <label className="block text-base font-medium text-gray-700 mb-2">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          rows={rows}
          className={cn(
            'w-full px-4 py-3 text-base border rounded-lg outline-none transition-all resize-none placeholder:text-gray-400',
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

FormTextArea.displayName = 'FormTextArea';
