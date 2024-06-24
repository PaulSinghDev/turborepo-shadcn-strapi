import { getServices } from "../../../../services/api/getServices";

export async function GET() {
  const data = await getServices();
  return Response.json({ success: true, data });
}
