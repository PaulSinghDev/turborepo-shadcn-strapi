"use client";

import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { APIPaginationType, APIProjectType } from "../../types/api";
import { AnchorLink } from "../base";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@repo/ui/components/pagination";

const PAGE_LIMIT = 8;

export function Projects({
  paginate,
  hidePortfolioLink,
}: {
  hidePortfolioLink?: boolean;
  paginate?: boolean;
}) {
  // Get some search params
  const searchParams = useSearchParams();

  // Do we have a page
  const page = searchParams.get("page");

  // Get data from the CMS
  const { data, isLoading } = useQuery<{
    projects: APIProjectType[];
    pagination: APIPaginationType;
  }>({
    queryKey: ["projects-grid", page],
    queryFn: async () => {
      const request = await fetch(
        // If we have the paginate prop then get paginated data
        `/api/v1/projects${paginate ? `?page=${page || 1}&perPage=${PAGE_LIMIT}` : ""}`
      );

      const response = await request.json();
      console.log(response);
      return response.data;
    },
  });

  if (isLoading) {
    return <div>LOADING</div>;
  }

  if (!data?.projects.length)
    return <div>It looks like we don't have any posts</div>;

  return (
    <div className="flex flex-col gap-12">
      <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {data.projects?.map((project) => (
          <li
            key={`project-grid-${project.id}`}
            className="min-h-60 bg-cover bg-center rounded-lg shadow-lg border flex flex-col p-4 relative before:absolute before:w-full before:h-[80%] before:contents-[''] before:bottom-0 before:left-0 before:bg-gradient-to-t before:from-[rgba(0,0,0,0.75)] before:to-transparent overflow-hidden"
            style={{
              backgroundImage: `url('${process.env.NEXT_PUBLIC_CMS_URI}${project.featuredImage.url}')`,
            }}
          >
            <h3 className="mt-auto mb-0 text-white relative z-1 text-shadow shadow-black">
              {project.title}
            </h3>
            <p className="line-clamp-2 text-white relative z-1 my-0 font-light text-sm">
              {project.description}
            </p>
            <AnchorLink
              href={`/portfolio/${project.slug}`}
              title={`View more info about ${project.title}`}
              className="relative z-1 text-white mt-0"
            >
              More Info
            </AnchorLink>
          </li>
        ))}
      </ul>

      {/* Show pagination if it is set */}
      {paginate && data.pagination.pageCount > 1 ? (
        <div>
          <div className="text-center mb-4">
            Currently viewing page <strong>{data.pagination.page}</strong> of{" "}
            <strong>{data.pagination.pageCount}</strong>
          </div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  className="aria-[disabled=true]:pointer-events-none	aria-[disabled=true]:touch-none aria-[disabled=true]:opacity-50"
                  isActive={data.pagination.page === 1}
                  aria-disabled={data.pagination.page === 1}
                  href={`/portfolio?page=${data.pagination.page - 1}`}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  isActive={data.pagination.page === data.pagination.pageCount}
                  className="aria-[disabled=true]:pointer-events-none	aria-[disabled=true]:touch-none aria-[disabled=true]:opacity-50"
                  aria-disabled={
                    data.pagination.page === data.pagination.pageCount
                  }
                  href={`/portfolio?page=${data.pagination.page + 1}`}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      ) : null}

      {/* If no pagination or hidePortfolioLink then show portfolio link */}
      {hidePortfolioLink || paginate ? null : (
        <AnchorLink
          href="/portfolio"
          title="View portfolio"
          variant={"button"}
          className="bg-pink-blue rounded-full inline-block self-center"
          size={"xl"}
        >
          View Portfolio
        </AnchorLink>
      )}
    </div>
  );
}
