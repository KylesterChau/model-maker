export async function generate3DModel(prompt, options = {}) {
  if (!prompt) throw new Error("Prompt is required");

  const res = await fetch("/api/meshy", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      prompt,
      mode: options.mode || "preview",
      style: options.style || "realistic",
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("Meshy request failed:", res.status, text);
    throw new Error(`Failed to generate model: ${text}`);
  }

  return res.json();
}

export async function get3DModel(taskId) {
  if (!taskId) throw new Error("Task ID is required");

  const res = await fetch(`/api/meshy/${taskId}`);
  if (!res.ok) {
    const text = await res.text();
    console.error("Failed to fetch 3D model:", res.status, text);
    throw new Error(`Failed to fetch 3D model: ${res.status} ${text}`);
  }

  return res.json();
}
