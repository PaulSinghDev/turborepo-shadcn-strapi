import { notFound } from "next/navigation";
import { Header } from "../../components/header";
import { Nav } from "../../components/nav/nav";
import { getPageBySlug } from "../../services/api/getPageBySlug";
import { getSiteInfo } from "../../services/api/getSiteInfo";
import { Content, GenericStructuredData } from "../../components/base";
import { Separator } from "@repo/ui/components/separator";
import { Projects } from "../../components/projects/projects";
import { Footer } from "../../components/footer/footer";

export default async function Page({}) {
  const siteInfo = await getSiteInfo();
  const pageData = await getPageBySlug("portfolio");

  if (!siteInfo || !pageData) return notFound();

  return (
    <main>
      <Nav
        links={siteInfo.navLinks}
        logo={siteInfo.logoDark.formats.thumbnail}
      />
      <Header
        headerStyle="CONTENT"
        className="mb-0"
        title={pageData.title}
        copy={pageData.description}
        backgroundImage={pageData.featuredImage}
      />
      <div className="py-12">
        <div className={"m-auto max-w-content w-4/5"}>
          <Content content={pageData.content} />
          <Separator className="mt-12" />
        </div>
      </div>
      <div className={"grid gap-12 mx-auto mb-24 max-w-content w-4/5"}>
        <Projects paginate />
      </div>
      <Footer columns={siteInfo.footerLinkColumns} />
      <GenericStructuredData page={pageData} />
    </main>
  );
}
