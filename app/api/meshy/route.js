import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();

    if (!body.prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const response = await fetch(
      "https://api.meshy.ai/openapi/v2/text-to-3d",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.MESHY_API_KEY}`,
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          mode: body.mode || "preview",
          prompt: body.prompt,
          art_style: body.style || "realistic",
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        "Meshy API error:",
        response.status,
        errorText
      );
      return NextResponse.json(
        { error: "Meshy API request failed", details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
