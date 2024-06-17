"use client";
import { useScreenSize } from "@repo/react-utils";
import { NavLinks } from "./nav-links";
import { APILinkType } from "../../types/api";
import { MEDIUM_BREAKPOINT } from "../../constants/screen-size";

export function DesktopNavLinks({ links }: { links: APILinkType[] }) {
  const { width } = useScreenSize();

  return width > MEDIUM_BREAKPOINT ? <NavLinks links={links} /> : null;
}
