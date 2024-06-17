"use client";

import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";

import { cn } from "@repo/ui/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

const separatorVariants = cva("shrink-0 bg-border", {
  variants: {
    variant: {
      default: "bg-border",
      secondary: "bg-secondary",
      primary: "bg-primary",
      orange: "bg-outrageous-orange-500",
    },
    orientation: {
      vertical: "h-full w-[1px]",
      horizontal: "w-full h-[1px]",
    },
    size: {
      "default-vertical": "w-[1px]",
      "default-horizontal": "h-[1px]",
      "thick-vertical": "w-[3px]",
      "thick-horizontal": "h-[3px]",
    },
    rounding: {
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
    variant: "default",
    size: "default-horizontal",
  },
});

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> &
    VariantProps<typeof separatorVariants>
>(
  (
    {
      className,
      orientation,
      size,
      variant,
      rounding,
      decorative = true,
      ...props
    },
    ref
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        separatorVariants({ size, orientation, variant, rounding }),
        className
      )}
      {...props}
    />
  )
);
Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };
