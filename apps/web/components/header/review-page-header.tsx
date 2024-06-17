import React from "react";

export type ReviewPageHeaderProps = {
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  testId?: string;
};

const ReviewPageHeader: React.FC<ReviewPageHeaderProps> = ({
  testId,
  className,
  id,
  style,
}) => {
  return (
    <div data-testid={testId} style={style} className={className} id={id} />
  );
};

ReviewPageHeader.defaultProps = {
  className: undefined,
  style: undefined,
  id: undefined,
  testId: undefined,
};

export { ReviewPageHeader };
