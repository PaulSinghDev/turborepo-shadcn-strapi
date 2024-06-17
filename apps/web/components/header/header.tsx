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
  if (props.headerStyle === "CONTENT") return <ContentPageHeader />;
  if (props.headerStyle === "HOME")
    return (
      <HomePageHeader
        backgroundImage={props.backgroundImage}
        logoImage={props.logoImage}
        cta={props.cta}
        title={props.title}
        tagline={props.tagline}
      />
    );
  if (props.headerStyle === "REVIEW") return <ReviewPageHeader />;
};

export { Header };
