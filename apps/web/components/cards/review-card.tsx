import { APIReviewCardType } from "../../types/api";
import Image from "next/image";
import { GaspFactorCard } from "./gasp-factor-card";
import { AnchorLink } from "../base";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import { Separator } from "@repo/ui/components/separator";

export const ReviewCard: React.FC<{ review: APIReviewCardType }> = ({
  review,
}) => {
  return (
    <Card
      className={"max-w-[350px] border rounded-sm overflow-hidden shadow-lg"}
    >
      <AnchorLink
        href={`/reviews/${review.slug}`}
        title={`Read "${review.title}"`}
        className="hover:no-underline hover:opacity-70 transition-opacity"
      >
        <div className={"relative h-[200px] object-cover"}>
          <Image
            src={`${process.env.NEXT_PUBLIC_CMS_URI}${review?.featuredImage?.formats?.small?.url}`}
            alt={
              review?.featuredImage?.alternativeText ||
              review?.featuredImage?.caption ||
              review?.featuredImage?.name
            }
            fill
          />
        </div>
      </AnchorLink>
      <CardHeader className={"flex flex-col"}>
        <AnchorLink
          href={`/reviews/${review.slug}`}
          title={`Read "${review.title}"`}
          className="hover:no-underline hover:opacity-70 transition-opacity"
        >
          <CardTitle>{review.title}</CardTitle>
        </AnchorLink>
        <CardDescription className="text-foreground text-md font-light line-clamp-3">
          {review.description}
        </CardDescription>
        <AnchorLink
          href={`/reviews/${review.slug}`}
          title={`Read "${review.title}"`}
          className="hover:no-underline hover:opacity-70 transition-opacity"
        >
          Read review
        </AnchorLink>
      </CardHeader>
      <Separator className="max-w-[80%] mx-auto mb-4" />
      <CardContent>
        <GaspFactorCard
          bloodiness={review.gaspFactor.bloodiness}
          scariness={review.gaspFactor.scariness}
          suspense={review.gaspFactor.suspense}
        />
      </CardContent>
    </Card>
  );
};
