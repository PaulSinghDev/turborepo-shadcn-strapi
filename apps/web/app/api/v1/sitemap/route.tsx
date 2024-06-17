import { getGenresForSitemap } from "../../../../services/api/getGenresForSitemap";
import { getPagesForSitemap } from "../../../../services/api/getPagesForSitemap";
import { getReviewsForSitemap } from "../../../../services/api/getReviewsForSitemap";

const generateSiteMap = (
  reviews: { slug: string }[],
  pages: { slug: string }[],
  genres: { slug: string }[]
) => {
  return `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
          <loc>${`${process.env.BASE_URI}/`}</loc>
        </url>
        ${pages
          .map(({ slug }) => {
            return `
          <url>
              <loc>${`${process.env.BASE_URI}/${slug}`}</loc>
          </url>
        `;
          })
          .join("")}
        ${reviews
          .map(({ slug }) => {
            return `
          <url>
              <loc>${`${process.env.BASE_URI}/reviews/${slug}`}</loc>
          </url>
        `;
          })
          .join("")}
        ${genres
          .map(({ slug }) => {
            return `
          <url>
              <loc>${`${process.env.BASE_URI}/genre/${slug}`}</loc>
          </url>
        `;
          })
          .join("")}
      </urlset>
    `;
};

export async function GET() {
  try {
    const reviews = await getReviewsForSitemap();
    const pages = await getPagesForSitemap();
    const genres = await getGenresForSitemap();
    const siteMap = generateSiteMap(reviews.data, pages.data, genres.data);

    return new Response(siteMap, {
      status: 200,
      statusText: "ok",
    });
  } catch (e) {
    return Response.error();
  }
}
