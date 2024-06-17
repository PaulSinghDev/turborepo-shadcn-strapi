import React from "react";

export type ContentPageHeaderProps = {
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  testId?: string;
};

const ContentPageHeader: React.FC<ContentPageHeaderProps> = ({
  testId,
  className,
  id,
  style,
}) => {
  return (
    <div data-testid={testId} style={style} className={className} id={id} />
  );
};

ContentPageHeader.defaultProps = {
  className: undefined,
  style: undefined,
  id: undefined,
  testId: undefined,
};

export { ContentPageHeader };
