import { supabase } from "./supabaseClient";

export async function saveModel({ name, prompt, modelUrl, userId }) {
  if (!modelUrl || !userId) {
    throw new Error("Missing required fields: modelUrl or userId");
  }

  const { data, error } = await supabase
    .from("models")
    .insert([{ name, prompt, status: "ready", storage_path: modelUrl, user_id: userId }])
    .select();

  if (error) throw error;
  return data[0];
}

export async function getModel(id) {
  if (!id) throw new Error("Missing model ID");

  const { data, error } = await supabase.from("models").select("*").eq("id", id).single();
  if (error) throw error;

  const { data: urlData } = supabase.storage.from("models").getPublicUrl(data.storage_path);

  return { ...data, modelUrl: urlData.publicUrl };
}
