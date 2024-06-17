export const SITE_INFO_QUERY_PARAMS =
  "fields[0]=name&fields[1]=tagline&fields[2]=email&populate[logoLight]=*&populate[logoDark]=*&populate[socialShareImage]=*&populate[footerLinkColumns][fields][0]=title&populate[footerLinkColumns][populate][links]=*&populate[navLinks]=*";

export const PAGE_QUERY_PARAMS =
  "fields[0]=title&fields[1]=slug&fields[2]=description&fields[3]=content&fields[4]=isContact&populate[featuredImage]=*";

export const PAGE_METADATA_QUERY_PARAMS =
  "fields[0]=title&fields[1]=slug&fields[2]=description";

export const CMS_FETCH_OPTIONS = {
  method: "GET",
  headers: {
    authorization: `Bearer ${process.env.CMS_ACCESS_TOKEN}`,
  },
  next: {
    revalidate: 60,
  },
};
