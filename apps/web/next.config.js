/** @type {import('next').NextConfig} */
module.exports = {
  async rewrites() {
    return [
      {
        source: "/sitemap.xml",
        destination: "/api/v1/sitemap",
      },
    ];
  },
  transpilePackages: ["@repo/ui"],
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "1337",
      },
      {
        protocol: "https",
        hostname: "api.gaspmoviereview.com",
      },
    ],
  },
};
