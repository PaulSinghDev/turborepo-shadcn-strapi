import React from "react";
import { APIFooterColumnType } from "../../types/api";
import { AnchorLink } from "../base/anchor-link/anchor-link";

type FooterProps = {
  columns: APIFooterColumnType[];
};

const Footer: React.FC<FooterProps> = ({ columns }) => {
  return (
    <footer className={"bg-radial-pink-blue px-8 pt-12 pb-4"}>
      <div
        className={
          "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-content mx-auto"
        }
      >
        {columns.map((column) => (
          <div
            className={"flex flex-col text-background"}
            key={`footer-column-${column.id}`}
          >
            <h3>{column.title}</h3>
            <ul className="font-light mt-2">
              {column.links.map((link) => (
                <li key={`footer-link-${link.id}-${link.url}`}>
                  <AnchorLink
                    href={link.url}
                    title={link.title}
                    variant={"secondary"}
                  >
                    {link.label}
                  </AnchorLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div
        className={
          "opacity-80 text-background font-thin font-xs text-center mt-8 max-w-content mx-auto"
        }
      >
        <AnchorLink
          rel="noopener noreferrer"
          href="https://paulsingh.dev"
          title="Made by Paul Singh"
          target="_blank"
          className="font-light"
          size={"sm"}
        >
          Made by Paul Singh
        </AnchorLink>
      </div>
    </footer>
  );
};

export { Footer };
