import React from "react";
import { APIImageType, APILinkType } from "../../types/api";
import Image from "next/image";

export type HomePageHeaderProps = {
  backgroundImage: APIImageType;
  logoImage: APIImageType;
  title: string;
  tagline: string;
  cta: APILinkType;
};

const HomePageHeader: React.FC<HomePageHeaderProps> = ({
  backgroundImage,
  logoImage,
  title,
}) => {
  return (
    <header
      className={
        "relative mt-nav min-h-[400px] flex flex-col justify-center before:w-full before:h-full before:bg-black before:bg-opacity-65 before:contents-[''] before:absolute before:top-0 before:left-0"
      }
    >
      <Image
        className={"z-[-1] object-cover"}
        src={`${process.env.NEXT_PUBLIC_CMS_URI}${backgroundImage?.url}`}
        fill
        alt={
          backgroundImage.alternativeText ||
          backgroundImage.caption ||
          backgroundImage.name
        }
      />
      <div
        className={
          "flex flex-col gap-4 text-background z-1 relative max-w-[600px] m-auto w-4/5"
        }
      >
        <div className="flex relative min-h-28">
          <Image
            className="object-contain h-full"
            src={`${process.env.NEXT_PUBLIC_CMS_URI}${logoImage?.url}`}
            alt={
              logoImage.alternativeText || logoImage.caption || logoImage.name
            }
            fill
          />
        </div>
        <h1 className="font-courier text-xl lg:text-3xl font-light">{title}</h1>
      </div>
    </header>
  );
};

export { HomePageHeader };
