"use client";
import { Button } from "@repo/ui/components/button";
import { Icons } from "@repo/ui/components/icons";
import { forwardRef } from "react";

type NavButtonProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const NavButton = forwardRef<HTMLButtonElement, NavButtonProps>(
  function NavButton({ setIsOpen }, ref) {
    return (
      <Button
        ref={ref}
        size={"sm"}
        onClick={() => setIsOpen(true)}
        variant={"transparent"}
      >
        <Icons.menu />
      </Button>
    );
  }
);

export { NavButton };
