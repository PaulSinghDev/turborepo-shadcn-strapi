import React from "react";
import { APIPageType } from "../../../types/api";
import { WebPage, WithContext } from "schema-dts";

type GenericStructuredDataProps = {
  page: APIPageType;
};

const GenericStructuredData: React.FC<GenericStructuredDataProps> = ({
  page,
}) => {
  const schema: WithContext<WebPage> = {
    "@type": "WebPage",
    "@context": "https://schema.org",
    headline: page.title,
    description: page.description,
    image: `${process.env.NEXT_PUBLIC_CMS_URI}${page?.featuredImage?.url}`,
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export { GenericStructuredData };
