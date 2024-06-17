import { cn } from "@repo/ui/lib/utils";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";

const linkVariants = cva(
  "font-inherit text-md text-foreground transition-colors cursor-pointer underline-offset-2 text-decoration-color-foreground decoration-2 hover:underline ",
  {
    variants: {
      variant: {
        default: "",
        secondary:
          "text-secondary-foreground text-decoration-color-secondary-foreground",
        button: "bg-foreground text-background py-2 px-4",
      },
      size: {
        default: "text-md",
        xs: "text-xs font-light",
        sm: "text-sm",
        lg: "text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

type AnchorLinkPropsType = {
  href: string;
  title: string;
  label?: string;
  children?: React.ReactNode;
  target?: "_blank" | "_parent" | "_self" | "_top";
} & React.HTMLAttributes<HTMLAnchorElement> &
  VariantProps<typeof linkVariants>;

type AnchorLinkWithLabelPropsType = {
  label: string;
  children?: never;
} & AnchorLinkPropsType;

type AnchorLinkWithChildrenPropsType = {
  label?: never;
  children: React.ReactNode;
} & AnchorLinkPropsType;

export function AnchorLink({
  className,
  href,
  title,
  label,
  children,
  variant,
  size,
  ...props
}: AnchorLinkWithLabelPropsType | AnchorLinkWithChildrenPropsType) {
  return (
    <Link
      href={href}
      title={title}
      className={cn(linkVariants({ variant, size }), className)}
      {...props}
    >
      {children ? children : label}
    </Link>
  );
}
