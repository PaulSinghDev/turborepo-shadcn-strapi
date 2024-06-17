import { CMS_FETCH_OPTIONS, PAGE_QUERY_PARAMS } from "../../constants/api";
import { APIPageType } from "../../types/api";

export const getPageBySlug = async (slug: string): Promise<APIPageType> => {
  const req = await fetch(
    `${process.env.NEXT_PUBLIC_CMS_URI}/api/pages?filters[slug][$eqi]=${slug}&${PAGE_QUERY_PARAMS}`,
    CMS_FETCH_OPTIONS
  );

  const res = await req.json();

  return res.data?.[0];
};