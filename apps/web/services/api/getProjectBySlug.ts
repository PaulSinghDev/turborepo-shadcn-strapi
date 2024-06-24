import { CMS_FETCH_OPTIONS, PROJECTS_QUERY_PARAMS } from "../../constants/api";
import { APIProjectType } from "../../types/api";

export const getProjectBySlug = async (
  slug: string
): Promise<APIProjectType> => {
  const req = await fetch(
    `${process.env.NEXT_PUBLIC_CMS_URI}/api/projects?filters[slug][$eqi]=${slug}&${PROJECTS_QUERY_PARAMS}`,
    CMS_FETCH_OPTIONS
  );

  const res = await req.json();

  return res.data?.[0];
};
