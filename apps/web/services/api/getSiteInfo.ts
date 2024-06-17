import { CMS_FETCH_OPTIONS, SITE_INFO_QUERY_PARAMS } from "../../constants/api";
import { APISiteInfoType } from "../../types/api";

export const getSiteInfo = async (): Promise<APISiteInfoType> => {
  const req = await fetch(
    `${process.env.NEXT_PUBLIC_CMS_URI}/api/site-info?${SITE_INFO_QUERY_PARAMS}`,
    CMS_FETCH_OPTIONS
  );

  const res = await req.json();

  return res.data;
};

