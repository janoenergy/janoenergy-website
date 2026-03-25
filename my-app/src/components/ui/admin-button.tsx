import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading = false, children, disabled, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-all active:scale-95';
    
    const variants = {
      primary: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm',
      secondary: 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-300',
      danger: 'bg-red-600 hover:bg-red-700 text-white',
      ghost: 'hover:bg-gray-100 text-gray-700',
    };
    
    const sizes = {
      sm: 'px-3 py-2 text-sm h-9',
      md: 'px-4 py-2.5 text-base h-11',
      lg: 'px-6 py-3 text-base h-12',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          (disabled || loading) && 'opacity-50 cursor-not-allowed',
          className
        )}
        {...props}
      >
        {loading && (
          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
