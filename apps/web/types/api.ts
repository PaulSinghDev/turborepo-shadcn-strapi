import { BlocksContent } from "@strapi/blocks-react-renderer";

export type APILinkType = {
  id: number;
  label: string;
  url: string;
  title: string;
};

export type APIPaginationType = {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
};

export type APIImageFormatType = {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path?: string | null;
  width: number;
  height: number;
  size: number;
  url: string;
};

export type APIImageType = {
  id: number;
  url: string;
  alternativeText: null | string;
  name: string;
  caption: null | string;
  width: number;
  height: number;
  formats: {
    thumbnail: APIImageFormatType;
    small: APIImageFormatType;
    medium: APIImageFormatType;
    large: APIImageFormatType;
  };
};

export type APIFooterColumnType = {
  id: number;
  title: string;
  links: APILinkType[];
};

export type APISiteInfoType = {
  id: number;
  name: string;
  tagline: string;
  email: string;
  logoLight: APIImageType;
  logoDark: APIImageType;
  socialShareImage: APIImageType;
  footerLinkColumns: APIFooterColumnType[];
  navLinks: APILinkType[];
};

export type APIPageType = {
  id: number;
  title: string;
  slug: string;
  description: string;
  content: BlocksContent;
  isContact: boolean;
  featuredImage: APIImageType;
};

export type APIServiceType = {
  id: number;
  title: string;
  description: string;
  image: APIImageType;
};

export type APIProjectType = {
  id: number;
  title: string;
  description: string;
  slug: string;
  featuredImage: APIImageType;
  gallery: APIImageType[];
  content?: BlocksContent;
};

export type APIGaspFactorType = {
  id: number;
  scariness: number;
  suspense: number;
  bloodiness: number;
};
export type APIAuthorCardType = {
  id: number;
  name: string;
  slug: string;
  tagline: string;
  featuredImage: APIImageType;
};

export type APIGenreType = {
  id: number;
  title: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
};

export type APIReviewType = {
  id: number;
  title: string;
  description: string;
  content: BlocksContent;
  publishedAt: string;
  updatedAt: string;
  slug: string;
  triggers: string;
  genres: APIGenreType[];
  featuredImage: APIImageType;
  author: APIAuthorCardType;
  relatedReviews: APIReviewCardType[];
  gaspFactor: APIGaspFactorType;
};

export type APIReviewCardType = Pick<
  APIReviewType,
  | "id"
  | "description"
  | "featuredImage"
  | "publishedAt"
  | "title"
  | "slug"
  | "gaspFactor"
>;

export type APIPageMetadataType = Pick<
  APIPageType,
  "description" | "title" | "slug"
>;

export type APIMetaDataType = {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
};
