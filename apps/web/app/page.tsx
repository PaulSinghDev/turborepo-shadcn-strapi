import { Content } from "../components/base/content/content";
import { Header } from "../components/header";
import { Nav } from "../components/nav/nav";
import { getPageBySlug } from "../services/api/getPageBySlug";
import { getPageMetadataBySlug } from "../services/api/getPageMetadataBySlug";
import { getSiteInfo } from "../services/api/getSiteInfo";
import { Footer } from "../components/footer/footer";
import { GenericStructuredData } from "../components/base/generic-structured-data/generic-structured-data";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Separator } from "@repo/ui/components/separator";
import { Services } from "../components/services/services";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getPageMetadataBySlug("home");

  if (!data) return notFound();

  return {
    description: data?.description,
  };
}

export default async function Page(): Promise<JSX.Element> {
  const siteInfo = await getSiteInfo();
  const pageData = await getPageBySlug("home");

  if (!siteInfo || !pageData) return notFound();

  return (
    <main>
      <Nav
        links={siteInfo.navLinks}
        logo={siteInfo.logoDark.formats.thumbnail}
      />
      <Header
        headerStyle="HOME"
        backgroundImage={pageData.featuredImage}
        title={pageData.title}
        cta={{ label: "Do something", title: "Go somewhere", url: "/", id: 1 }}
        copy={pageData.description}
        className="mb-0"
      />
      <div className="bg-pink-blue py-12">
        <div className={"grid gap-12 m-auto max-w-content w-4/5"}>
          <Content content={pageData.content} />
          <Separator />
          <Services />
        </div>
      </div>
      <Footer columns={siteInfo.footerLinkColumns} />
      <GenericStructuredData page={pageData} />
    </main>
  );
}
