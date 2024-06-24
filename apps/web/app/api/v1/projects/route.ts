import { NextRequest } from "next/server";
import { getProjects } from "../../../../services/api/getProjects";
import { getProjectBySlug } from "../../../../services/api/getProjectBySlug";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.has("page") ? Number(searchParams.get("page")) : 1;
  const pageSize = searchParams.has("pageSize")
    ? Number(searchParams.get("pageSize"))
    : 8;

  const data = await getProjects(page, pageSize);
  return Response.json({ success: true, data });
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  if (!body.slug)
    return Response.json(
      {},
      { status: 400, statusText: "Invalid request. Slug is required" }
    );

  const data = await getProjectBySlug(body.slug);
}
