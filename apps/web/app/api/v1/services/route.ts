import { NextRequest } from "next/server";
import { getServices } from "../../../../services/api/getServices";

export async function GET(request: NextRequest) {
  const data = await getServices();
  return Response.json(data);
}
