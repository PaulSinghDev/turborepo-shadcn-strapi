import { Content } from "../../components/base/content/content";
import { Nav } from "../../components/nav/nav";
import { getPageBySlug } from "../../services/api/getPageBySlug";
import { getPageMetadataBySlug } from "../../services/api/getPageMetadataBySlug";
import { getSiteInfo } from "../../services/api/getSiteInfo";
import { Footer } from "../../components/footer/footer";
import { GenericStructuredData } from "../../components/base/generic-structured-data/generic-structured-data";
import { notFound } from "next/navigation";
import { Header } from "../../components/header";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const data = await getPageMetadataBySlug(params.slug);
  if (!data) return notFound();

  return {
    title: data.title,
    description: data.description,
  };
}

export default async function Page({
  params,
}: {
  params: { slug: string };
}): Promise<JSX.Element> {
  const siteInfo = await getSiteInfo();
  const pageData = await getPageBySlug(params?.slug);

  if (!siteInfo || !pageData) return notFound();

  return (
    <main>
      <Nav
        links={siteInfo.navLinks}
        logo={siteInfo.logoDark.formats.thumbnail}
      />
      <Header
        headerStyle="CONTENT"
        backgroundImage={pageData.featuredImage}
        title={pageData.title}
        copy={pageData.description}
        className="mb-0"
      />
      <div className="py-20">
        <div className={"m-auto max-w-content w-4/5"}>
          <Content content={pageData.content} />
        </div>
      </div>
      <Footer columns={siteInfo.footerLinkColumns} />
      <GenericStructuredData page={pageData} />
    </main>
  );
}
