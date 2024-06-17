import type { Schema, Attribute } from '@strapi/strapi';

export interface GeneralFooterLinks extends Schema.Component {
  collectionName: 'components_general_footer_links';
  info: {
    displayName: 'Footer Links';
    icon: 'apps';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    links: Attribute.Component<'general.link', true>;
  };
}

export interface GeneralLink extends Schema.Component {
  collectionName: 'components_general_links';
  info: {
    displayName: 'Link';
    icon: 'attachment';
  };
  attributes: {
    label: Attribute.String & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    title: Attribute.String & Attribute.Required;
  };
}

export interface GeneralSeo extends Schema.Component {
  collectionName: 'components_general_seos';
  info: {
    displayName: 'SEO';
    icon: 'search';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    canonicalUrl: Attribute.String;
    keywords: Attribute.String;
    socialShareImage: Attribute.Media;
    schemaData: Attribute.JSON;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'general.footer-links': GeneralFooterLinks;
      'general.link': GeneralLink;
      'general.seo': GeneralSeo;
    }
  }
}
