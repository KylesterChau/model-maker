import { supabase } from '../../../_utils/supabaseClient';

export async function POST(req) {
  try {
    const { name, prompt, modelUrl, userId } = await req.json();

    if (!modelUrl || !userId) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
    }

    const { data, error } = await supabase
      .from("models")
      .insert([{ name, prompt, status: "ready", storage_path: modelUrl, user_id: userId }])
      .select();

    if (error) throw error;

    return new Response(JSON.stringify(data[0]), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return new Response("Missing model ID", { status: 400 });

    const { data, error } = await supabase.from("models").select("*").eq("id", id).single();
    if (error) throw error;

    const { data: urlData } = supabase.storage.from("models").getPublicUrl(data.storage_path);
    return new Response(JSON.stringify({ ...data, modelUrl: urlData.publicUrl }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
