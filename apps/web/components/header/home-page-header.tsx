import React from "react";
import { APIImageType, APILinkType } from "../../types/api";
import Image from "next/image";
import { cn } from "@repo/ui/lib/utils";

export type HomePageHeaderProps = {
  backgroundImage: APIImageType;
  logoImage?: APIImageType;
  title: string;
  copy: string;
  cta: APILinkType;
  className?: string;
};

const HomePageHeader: React.FC<HomePageHeaderProps> = ({
  backgroundImage,
  logoImage,
  copy,
  title,
  className,
}) => {
  return (
    <header
      className={cn(
        "relative min-h-[600px] flex flex-col justify-center before:absolute before:w-full before:h-[50%] before:contents-[''] before:bottom-0 before:left-0 before:bg-gradient-to-t before:from-[rgba(0,0,0,0.75)] before:to-transparent",
        className
      )}
    >
      <Image
        className={"z-[-1] object-cover object-bottom"}
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
          "flex flex-col gap-4 text-background z-1 relative max-w-content m-auto w-4/5 flex-grow"
        }
      >
        {logoImage ? (
          <div className="flex relative min-h-28 mt-auto">
            <Image
              className="object-contain h-full"
              src={`${process.env.NEXT_PUBLIC_CMS_URI}${logoImage?.url}`}
              alt={
                logoImage.alternativeText || logoImage.caption || logoImage.name
              }
              fill
            />
          </div>
        ) : null}
        <div className="flex flex-col items-start mt-auto mb-10 max-w-[500px]">
          <h1 className="text-4xl lg:text-6xl mb-0">{title}</h1>
          {copy ? <p className="mt-1 font-light text-lg">{copy}</p> : null}
        </div>
      </div>
    </header>
  );
};

export { HomePageHeader };
