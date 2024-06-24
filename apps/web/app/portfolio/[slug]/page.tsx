import { notFound } from "next/navigation";
import { Header } from "../../../components/header";
import { Nav } from "../../../components/nav/nav";
import { getSiteInfo } from "../../../services/api/getSiteInfo";
import { Content, GenericStructuredData } from "../../../components/base";
import { Separator } from "@repo/ui/components/separator";
import { Footer } from "../../../components/footer/footer";
import { getProjectBySlug } from "../../../services/api/getProjectBySlug";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@repo/ui/components/carousel";
import Image from "next/image";

export default async function Page({ params }: { params: { slug: string } }) {
  const siteInfo = await getSiteInfo();
  const projectData = await getProjectBySlug(params.slug);
  console.log(projectData);

  if (!siteInfo || !projectData) return notFound();

  return (
    <main>
      <Nav
        links={siteInfo.navLinks}
        logo={siteInfo.logoDark.formats.thumbnail}
      />
      <Header
        headerStyle="CONTENT"
        className="mb-0"
        title={projectData.title}
        copy={projectData.description}
        backgroundImage={projectData.featuredImage}
      />
      <div className="py-12">
        {projectData.content ? (
          <div className={"m-auto max-w-content w-4/5"}>
            <Content content={projectData.content} />
            <Separator className="mt-12" />
          </div>
        ) : null}
        <div className={"m-auto max-w-content w-4/5"}>
          <Carousel>
            <CarouselContent>
              {projectData.gallery.map((image) => (
                <CarouselItem
                  key={`project-page-${params.slug}-gallery-${image.id}`}
                  className="overflow-hidden rounded-lg md:basis-1/2 lg:basis-1/3 grow"
                >
                  <div className="relative min-h-[300px]">
                    <Image
                      className="rounded-lg object-cover"
                      src={`${process.env.NEXT_PUBLIC_CMS_URI}${image.url}`}
                      alt={
                        image.alternativeText ||
                        image.caption ||
                        `Gallery image for ${projectData.title}`
                      }
                      fill
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
      <Footer columns={siteInfo.footerLinkColumns} />
    </main>
  );
}
