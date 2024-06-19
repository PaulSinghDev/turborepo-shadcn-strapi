"use client";

import { APILinkType } from "../../types/api";
import { cn } from "@repo/ui/lib/utils";
import { AnchorLink } from "../base/anchor-link/anchor-link";

export function NavLinks({
  links,
  linkOnClickCallback,
  className,
}: {
  links: APILinkType[];
  className?: string;
  // eslint-disable-next-line
  linkOnClickCallback?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  return (
    <ul className={cn("flex gap-4 flex-col sm:flex-row", className)}>
      {links.map((link) => (
        <li key={`nav-link-${link.id}`}>
          <AnchorLink
            href={link.url}
            title={link.title}
            onClick={linkOnClickCallback}
          >
            {link.label}
          </AnchorLink>
        </li>
      ))}
    </ul>
  );
}
