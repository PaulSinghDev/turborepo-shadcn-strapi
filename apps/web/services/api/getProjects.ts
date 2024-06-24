import { CMS_FETCH_OPTIONS, PROJECTS_QUERY_PARAMS } from "../../constants/api";
import { APIPaginationType, APIServiceType } from "../../types/api";

export const getProjects = async (
  page = 1,
  pageSize = 8
): Promise<{ projects: APIServiceType[]; pagination: APIPaginationType }> => {
  const req = await fetch(
    `${process.env.NEXT_PUBLIC_CMS_URI}/api/projects?${PROJECTS_QUERY_PARAMS}&pagination[page]=${page}&pagination[pageSize]=${pageSize}`,
    CMS_FETCH_OPTIONS
  );

  const res = await req.json();

  return { projects: res.data, pagination: res.meta.pagination };
};
