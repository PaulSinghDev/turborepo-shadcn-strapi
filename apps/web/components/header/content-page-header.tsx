import React from "react";
import { APIImageType } from "../../types/api";
import { cn } from "@repo/ui/lib/utils";

export type ContentPageHeaderProps = {
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  testId?: string;
  title: string;
  copy: string;
  backgroundImage: APIImageType;
};

const ContentPageHeader: React.FC<ContentPageHeaderProps> = ({
  testId,
  className,
  id,
  title,
  copy,
  backgroundImage,
}) => {
  return (
    <header
      data-testid={testId}
      className={cn(
        "h-[600px] max-h-screen py-nav px-10 bg-no-repeat bg-cover flex flex-col justify-end text-white underlay-b-4/5 bg-center",
        className
      )}
      id={id}
      style={{
        backgroundImage: `url('${process.env.NEXT_PUBLIC_CMS_URI}${backgroundImage?.url}')`,
      }}
    >
      <div className="relative z-1 max-w-content mx-auto w-full">
        <h1 className="text-left mb-1">{title}</h1>
        <p className="font-light my-0 max-w-[800px]">{copy}</p>
      </div>
    </header>
  );
};

ContentPageHeader.defaultProps = {
  className: undefined,
  style: undefined,
  id: undefined,
  testId: undefined,
};

export { ContentPageHeader };
