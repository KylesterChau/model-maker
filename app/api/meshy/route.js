export async function POST(req) {
  try {
    const { prompt, mode, style } = await req.json();

    if (!prompt) {
      return new Response(JSON.stringify({ error: "Prompt is required" }), { status: 400 });
    }

    const response = await fetch("https://api.meshy.ai/v2/text-to-3d", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.MESHY_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
        mode: mode || "full",
        style: style || "realistic",
      }),
    });

    const data = await response.json();
    console.log("Meshy API POST response:", data);

    const taskId = data.task_id || data.id || data.result || null;

    if (!taskId) {
      return new Response(JSON.stringify({ error: "No task ID returned by Meshy", raw: data }), { status: 500 });
    }

    return new Response(JSON.stringify({
      task_id: taskId,
      modelUrl: data.modelUrl || null,
      raw: data
    }), { status: 200 });

  } catch (err) {
    console.error("POST /api/meshy error:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}