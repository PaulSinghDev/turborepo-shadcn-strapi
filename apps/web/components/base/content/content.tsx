import { BlocksContent, BlocksRenderer } from "@strapi/blocks-react-renderer";
import React from "react";

type ContentProps = {
  content: BlocksContent;
};

const Content: React.FC<ContentProps> = ({ content }) => {
  return (
    <div className="max-w-content text-xl font-light leading-normal">
      <BlocksRenderer content={content} />
    </div>
  );
};

export { Content };
