import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-xl border border-transparent bg-clip-padding font-medium whitespace-nowrap transition-all duration-200 outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90",

        brand:
  "bg-[#4F2CCB] text-white shadow-lg shadow-violet-900/15 hover:bg-[#4325AD] hover:shadow-violet-900/25",

soft:
  "border border-violet-200 bg-[#F4F1FF] text-[#4F2CCB] hover:bg-[#ECE7FF]",

        outline:
          "border-border bg-background hover:bg-muted hover:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",

        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/90",

        ghost:
          "hover:bg-muted hover:text-foreground",

        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",

        link:
          "text-primary underline-offset-4 hover:underline",
      },

      size: {
        xs:
          "h-7 px-3 text-xs rounded-lg",

        sm:
          "h-9 px-4 text-sm rounded-lg",

        default:
          "h-10 px-5 text-sm rounded-xl",

        lg:
          "h-11 px-6 text-base rounded-xl",

        xl:
          "h-12 px-8 text-base font-semibold rounded-xl",

        icon:
          "size-10",

        "icon-xs":
          "size-7",

        "icon-sm":
          "size-8",

        "icon-lg":
          "size-12",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export type ButtonProps = ButtonPrimitive.Props &
  VariantProps<typeof buttonVariants>;

function Button({
  className,
  variant,
  size,
  ...props
}: ButtonProps) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Button, buttonVariants };
