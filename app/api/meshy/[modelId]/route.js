export async function GET(req, context) {
  try {
    const { modelId } = await context.params;

    if (!modelId) {
      return new Response(
        JSON.stringify({ error: "modelId route parameter is required" }),
        { status: 400 }
      );
    }

    const response = await fetch(
      `https://api.meshy.ai/v2/text-to-3d/${modelId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.MESHY_API_KEY}`,
        },
      }
    );

    if (!response.ok) {
      const text = await response.text();
      console.error("Meshy GET error:", text);
      return new Response(
        JSON.stringify({ error: text }),
        { status: response.status }
      );
    }

    const data = await response.json();

    const modelUrl =
      data.modelUrl ||
      data.file_url ||
      data.output_url ||
      null;

    return new Response(
      JSON.stringify({
        task_id: modelId,
        modelUrl,
        raw: data,
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error("GET /api/meshy/[modelId] error:", err);
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500 }
    );
  }
}
