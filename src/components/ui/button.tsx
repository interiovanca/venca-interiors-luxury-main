import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-4 whitespace-nowrap text-xs uppercase font-body tracking-[0.2em] transition-all duration-500 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-champagne text-black hover:bg-cream",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-champagne text-champagne hover:bg-champagne hover:text-black",
        secondary: "bg-charcoal text-cream hover:bg-charcoal-light",
        ghost: "hover:bg-charcoal-light/20 hover:text-champagne",
        link: "text-champagne underline-offset-4 hover:underline pb-1 border-b border-transparent hover:border-champagne",
        luxury: "border border-champagne bg-transparent text-champagne hover:bg-champagne hover:text-black",
      },
      size: {
        default: "px-8 py-4",
        sm: "px-6 py-3 text-[10px]",
        lg: "px-10 py-5",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
