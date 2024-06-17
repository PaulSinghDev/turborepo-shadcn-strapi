"use client";

import React from "react";
import { APIGaspFactorType } from "../../types/api";
import { Icons } from "@repo/ui/components/icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@repo/ui/components/tooltip";
import { cva, VariantProps } from "class-variance-authority";

type GaspFactorCardProps = Omit<APIGaspFactorType, "id"> & {
  stackVertical?: boolean;
};

const gaspFactorCardVariants = cva("", {
  variants: {
    size: {
      lg: "[&_h4]:text-4xl [&_small]:text-lg",
      md: "[&_h4]:text-lg",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const GaspFactorCard: React.FC<
  GaspFactorCardProps & VariantProps<typeof gaspFactorCardVariants>
> = ({ bloodiness, scariness, suspense, size }) => {
  return (
    <TooltipProvider>
      <div className={gaspFactorCardVariants({ size })}>
        <div className={"flex flex-col justify-center"}>
          <div className="text-center">
            <h4 className="font-permanent-marker">Gasp Factor</h4>
            <small className="font-light">
              Gasp factor is the average rating
            </small>
          </div>
          <div className={"font-bold text-5xl my-4 text-center"}>
            {((bloodiness + scariness + suspense) / 3 / 10).toFixed(2)}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-4">
          <Tooltip>
            <TooltipTrigger
              className={"inline-flex items-center gap-2 justify-center"}
            >
              <div className={"w-1/3"}>
                <Icons.suspense className="max-w-full max-h-[30px]" />
              </div>
              <div
                className={"text-outrageous-orange-500 font-courier font-md"}
              >
                {suspense}%
              </div>
            </TooltipTrigger>
            <TooltipContent>Suspense</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger
              className={"inline-flex items-center gap-2 justify-center"}
            >
              <div className={"w-1/3"}>
                <Icons.scariness className="max-w-full max-h-[30px]" />
              </div>
              <div
                className={"text-outrageous-orange-500 font-courier font-md"}
              >
                {scariness}%
              </div>
            </TooltipTrigger>
            <TooltipContent>Scariness</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger
              className={"inline-flex items-center gap-2 justify-center"}
            >
              <div className={"w-1/3"}>
                <Icons.droplets className="max-w-full max-h-[30px]" />
              </div>
              <div
                className={"text-outrageous-orange-500 font-courier font-md"}
              >
                {bloodiness}%
              </div>
            </TooltipTrigger>
            <TooltipContent>Bloodiness</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
};

export { GaspFactorCard };
