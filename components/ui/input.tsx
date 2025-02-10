import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex lg:h-6 w-full appearance-none rounded-md bg-transparent placeholder:lg:text-subheading2 placeholder:font-secondary placeholder:text-subheading3 text-subheading3 lg:text-subheading2 font-secondary text-coconut transition-colors focus-visible:outline-none file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-coconut disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
