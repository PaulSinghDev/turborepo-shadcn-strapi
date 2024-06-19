"use client";

import { useQuery } from "@tanstack/react-query";
import { APIServiceType } from "../../types/api";
import Image from "next/image";

export function Services() {
  const { data, isLoading } = useQuery<APIServiceType[]>({
    queryKey: ["services"],
    queryFn: async () => {
      const response = await fetch("/api/v1/services");
      return await response.json();
    },
  });

  if (isLoading) return <div>LOADING</div>;

  return (
    <div>
      <ul className="grid lg:grid-cols-2 gap-8 justify-center">
        {data?.map((service) => (
          <li
            key={`service-component-${service.id}`}
            className="flex gap-x-8 gap-y-4 justify-center"
          >
            <div className="relative min-w-[50px]">
              <Image
                className="h-auto object-contain"
                src={`${process.env.NEXT_PUBLIC_CMS_URI}${service.image.url}`}
                alt={
                  service.image.alternativeText ||
                  `Icon matching ${service.title}`
                }
                fill
              />
            </div>
            <div className="max-w-[400px]">
              <h2>{service.title}</h2>
              <p>{service.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
