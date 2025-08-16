export const runtime = "nodejs";
import axios from "axios";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const type = formData.get("type");
    const form = new FormData();

    if (type === "url") {
      form.append("image_url", formData.get("image_url") as string);
    } else {
      const file = formData.get("image_file") as File;
      const buffer = Buffer.from(await file.arrayBuffer());
      const blob = new Blob([buffer], { type: file.type });
      form.append("image_file", blob, file.name);
    }

    form.append("size", "auto");

    const response = await axios.post(
      "https://api.remove.bg/v1.0/removebg",
      form,
      {
        headers: {
          "X-Api-Key": process.env.REMOVEBG_API_KEY,
        },
        responseType: "arraybuffer",
      }
    );

    return new Response(response.data, {
      status: 200,
      headers: { "Content-Type": "image/png" },
    });
  } catch (err) {
    return Response.json({ error: err }, { status: 500 });
  }
}
