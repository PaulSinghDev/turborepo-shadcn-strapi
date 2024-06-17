"use client";
import React, { useState } from "react";
import Image from "next/image";
import { APIImageFormatType, APILinkType } from "../../types/api";
import { NavButton } from "./nav-button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@repo/ui/components/sheet";
import { NavLinks } from "./nav-links";
import { useScreenSize } from "@repo/react-utils";
import { MEDIUM_BREAKPOINT } from "../../constants/screen-size";
import { AnchorLink } from "../base/anchor-link/anchor-link";
import { Separator } from "@repo/ui/components/separator";

type NavDrawerProps = {
  logo: APIImageFormatType;
  links: APILinkType[];
};

const NavDrawer: React.FC<NavDrawerProps> = ({ logo, links }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { width } = useScreenSize();
  return width <= MEDIUM_BREAKPOINT ? (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <NavButton setIsOpen={setIsOpen} />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <AnchorLink
            href={"/"}
            title="Back to home"
            className="flex justify-center w-full"
          >
            <Image
              style={{ objectFit: "contain" }}
              width={100}
              height={40}
              alt={logo?.name}
              src={`${process.env.NEXT_PUBLIC_CMS_URI}${logo?.url}`}
            />
          </AnchorLink>
        </SheetHeader>
        <Separator className="my-6" />
        <div className="flex flex-col">
          <NavLinks
            links={links}
            linkOnClickCallback={() => setIsOpen(false)}
          />
        </div>
      </SheetContent>
    </Sheet>
  ) : null;
};

export { NavDrawer };
