import {
  CMS_FETCH_OPTIONS,
  PAGE_METADATA_QUERY_PARAMS,
} from "../../constants/api";
import { APIPageMetadataType } from "../../types/api";

export const getPageMetadataBySlug = async (
  slug: string
): Promise<APIPageMetadataType> => {
  const req = await fetch(
    `${process.env.NEXT_PUBLIC_CMS_URI}/api/pages?filters[slug][$eqi]=${slug}&${PAGE_METADATA_QUERY_PARAMS}`,
    CMS_FETCH_OPTIONS
  );

  const res = await req.json();

  return res.data?.[0];
};
