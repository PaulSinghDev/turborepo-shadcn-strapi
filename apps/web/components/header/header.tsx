import React from "react";
import { HomePageHeader, HomePageHeaderProps } from "./home-page-header";
import { ReviewPageHeader, ReviewPageHeaderProps } from "./review-page-header";
import {
  ContentPageHeader,
  ContentPageHeaderProps,
} from "./content-page-header";

type HomeHeaderProps = {
  headerStyle: "HOME";
} & HomePageHeaderProps;

type ContentHeaderProps = {
  headerStyle: "CONTENT";
} & ContentPageHeaderProps;

type ReviewHeaderProps = {
  headerStyle: "REVIEW";
} & ReviewPageHeaderProps;

const Header: React.FC<
  HomeHeaderProps | ContentHeaderProps | ReviewHeaderProps
> = (props) => {
  if (props.headerStyle === "CONTENT")
    return (
      <ContentPageHeader
        title={props.title}
        copy={props.copy}
        backgroundImage={props.backgroundImage}
      />
    );
  if (props.headerStyle === "HOME")
    return (
      <HomePageHeader
        backgroundImage={props.backgroundImage}
        logoImage={props.logoImage}
        cta={props.cta}
        title={props.title}
        copy={props.copy}
        className={props.className}
      />
    );
  if (props.headerStyle === "REVIEW") return <ReviewPageHeader />;
};

export { Header };
