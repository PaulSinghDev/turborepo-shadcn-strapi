import { Content } from "../../components/base/content/content";
import { Nav } from "../../components/nav/nav";
import { getPageBySlug } from "../../services/api/getPageBySlug";
import { getPageMetadataBySlug } from "../../services/api/getPageMetadataBySlug";
import { getSiteInfo } from "../../services/api/getSiteInfo";
import { Footer } from "../../components/footer/footer";
import { GenericStructuredData } from "../../components/base/generic-structured-data/generic-structured-data";
import { ContactForm } from "../../components/contact-form/contact-form";
import { notFound } from "next/navigation";
import { Separator } from "@repo/ui/components/separator";

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
      <header className={"max-w-header mt-nav py-16 px-8 mx-auto"}>
        <div className={"flex flex-col gap-8 text-center"}>
          <h1>{pageData.title}</h1>
          <span>{pageData.description}</span>
        </div>
      </header>
      <Separator
        variant={"orange"}
        className="max-w-[400px] mx-auto mb-16"
        size={"thick-horizontal"}
        rounding={"lg"}
      />
      <div className={"px-8 max-w-content mx-auto min-h-[calc(100vh_/_2)]"}>
        <Content content={pageData.content} />
      </div>
      {pageData.isContact ? (
        <div className={"max-w-content"}>
          <ContactForm />
        </div>
      ) : null}
      <Footer columns={siteInfo.footerLinkColumns} />
      <GenericStructuredData page={pageData} />
    </main>
  );
}
