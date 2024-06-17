export default ({ env }) => ({
  transformer: {
    enabled: true,
    config: {
      responseTransforms: {
        removeAttributesKey: true,
        removeDataKey: true,
      },
      requestTransforms: {
        wrapBodyWithDataKey: true,
      },
      plugins: {
        ids: {
          slugify: true,
        },
      },
    },
  },
  slugify: {
    enabled: true,
    config: {
      contentTypes: {
        review: {
          field: "slug",
          references: "title",
        },
        trigger: {
          field: "slug",
          references: "title",
        },
      },
    },
  },
});
