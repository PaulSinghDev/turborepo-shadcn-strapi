import Link from "next/link";
import { APIImageFormatType, APILinkType } from "../../types/api";
import Image from "next/image";
import { NavDrawer } from "./nav-drawer";
import { DesktopNavLinks } from "./desktop-nav-links";

type NavProps = {
  style?: React.CSSProperties;
  id?: string;
  testId?: string;
  links: APILinkType[];
  logo: APIImageFormatType;
};

const Nav: React.FC<NavProps> = ({ testId, id, style, links, logo }) => {
  return (
    <div
      data-testid={testId}
      style={style}
      className={
        "px-4 fixed top-0 left-0 w-full h-nav items-center flex py-2 z-10 bg-white border-b shadow-md"
      }
      id={id}
      role="navigation"
    >
      <nav
        className={
          "flex justify-between w-full items-center grow-0 m-auto max-w-content"
        }
      >
        <div className={"h-full max-w-[50px] flex items-center"}>
          <Link
            href={"/"}
            title="Back to home"
            className="max-w-full flex items-center"
          >
            <Image
              style={{ objectFit: "contain" }}
              alt={logo?.name}
              src={`${process.env.NEXT_PUBLIC_CMS_URI}${logo?.url}`}
              width={100}
              height={60}
            />
          </Link>
        </div>
        <DesktopNavLinks links={links} />
        <NavDrawer links={links} logo={logo} />
      </nav>
    </div>
  );
};

export { Nav };
