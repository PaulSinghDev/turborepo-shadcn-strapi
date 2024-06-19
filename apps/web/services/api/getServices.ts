import { CMS_FETCH_OPTIONS, SERVICES_QUERY_PARAMS } from "../../constants/api";
import { APIServiceType } from "../../types/api";

export const getServices = async (): Promise<APIServiceType[]> => {
  const req = await fetch(
    `${process.env.NEXT_PUBLIC_CMS_URI}/api/services?${SERVICES_QUERY_PARAMS}`,
    CMS_FETCH_OPTIONS
  );

  const res = await req.json();

  return res.data;
};
