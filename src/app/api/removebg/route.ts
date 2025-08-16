import axios from "axios";

export async function POST(req: Request) {
  try {
    const { imageUrl } = await req.json();
    const form = new FormData();

    form.append("image_url", imageUrl);
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
