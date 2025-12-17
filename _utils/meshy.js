export async function generate3DModel(prompt, options = {}) {
  if (!prompt) throw new Error("Prompt is required");

  const res = await fetch("/api/meshy", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      prompt,
      mode: options.mode || "full",
      style: options.style || "realistic",
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Meshy generate failed: ${res.status} ${text}`);
  }

  const data = await res.json();
  console.log("Meshy generate response:", data);

  return data;
}

export async function get3DModel(taskId) {
  if (!taskId) throw new Error("taskId is required");

  const res = await fetch(`/api/meshy/${encodeURIComponent(taskId)}`);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Meshy get failed: ${res.status} ${text}`);
  }

  const data = await res.json();
  const raw = data.raw ?? data;

  const status = raw.status ?? "PROCESSING";
  const progress = raw.progress ?? 0;

  const modelUrl = raw.model_urls?.glb || null;
  const thumbnail = raw.thumbnail_url || null;
  const video = raw.video_url || null;

  return { status, progress, modelUrl, thumbnail, video, raw };
}

export async function generateAndGetModel(prompt, options = {}) {
  const initial = await generate3DModel(prompt, options);

  const immediateUrl =
    initial?.model?.glb ||
    initial?.model_url ||
    initial?.file_url ||
    initial?.output?.model_url ||
    null;

  if (immediateUrl) {
    return { status: "SUCCEEDED", modelUrl: immediateUrl };
  }

  const taskId = initial.task_id || initial.id || initial.taskId || initial.job_id;
  if (!taskId) throw new Error("No taskId returned from Meshy");

  console.log(`Polling Meshy task: ${taskId}`);

  const maxAttempts = 50;
  const delayMs = 5000;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    await new Promise((r) => setTimeout(r, delayMs));

    const result = await get3DModel(taskId);

    console.log(`Attempt ${attempt}: status=${result.status}, progress=${result.progress}`);

    if (["FAILED", "ERROR"].includes(result.status)) {
      console.error("Meshy job failed:", result.raw);
      throw new Error("Meshy model generation failed");
    }

    if (result.modelUrl) {
      console.log("Model ready:", result.modelUrl);
      return { status: "SUCCEEDED", modelUrl: result.modelUrl, taskId };
    }

    if (options.mode === "preview" && result.progress >= 100) {
      console.log("Preview finished, returning thumbnail:", result.thumbnail);
      return {
        status: "COMPLETED_PREVIEW",
        thumbnail: result.thumbnail,
        taskId,
      };
    }
  }

  console.warn("Meshy job did not finish in time:", taskId);
  throw new Error("Model not ready after maximum attempts");
}

export async function saveModel(modelData) {
  console.log("Saving model data:", modelData);
}
