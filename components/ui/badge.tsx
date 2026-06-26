import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/*
  shadcn/ui-style Badge. Variants map to the app's semantic tones so a badge's
  colour is driven by meaning (good/warn/urgent), not ad-hoc classes.
*/
const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium whitespace-nowrap w-fit",
  {
    variants: {
      variant: {
        neutral: "border-border bg-black/[0.04] text-muted",
        accent: "border-transparent bg-accent/15 text-accent",
        good: "border-transparent bg-good/15 text-good",
        warn: "border-transparent bg-warn/15 text-warn",
        urgent: "border-transparent bg-urgent/15 text-urgent",
      },
    },
    defaultVariants: {
      variant: "neutral",
    },
  },
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";
  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
