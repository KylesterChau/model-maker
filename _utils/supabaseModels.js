import { supabase } from "./supabaseClient";

export async function saveModel({ modelName, prompt, savedModel, user }) {
  if (!modelName || !savedModel?.modelUrl) {
    console.error("Missing required data: modelName or modelUrl");
    return;
  }

  console.log("Saving model with the following data:");
  console.log("Model Name:", modelName);
  console.log("Model URL:", savedModel.modelUrl);
  console.log("Prompt:", prompt);
  console.log("User ID:", user ? user.uid : "No user");

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const response = await fetch(`${supabaseUrl}/rest/v1/Models`, {
    method: "POST",
    headers: {
      "apikey": supabaseKey,
      "Authorization": `Bearer ${supabaseKey}`,
      "Content-Type": "application/json",
      "Prefer": "return=representation"
    },
    body: JSON.stringify({
      name: modelName,
      prompt: prompt,
      modelURL: savedModel.modelUrl,
      userID: user ? user.uid : null
    })
  });

  if (response.ok) {
    const result = await response.json();
    console.log("Model saved successfully:", result);
    return result;
  } else {
    const errorText = await response.text();
    console.error("Error saving model:", errorText);
    return null;
  }
}




export async function getModel(id) {
  if (!id) throw new Error("Missing model ID");

  const { data, error } = await supabase
    .from("models")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  const { publicURL, error: urlError } = supabase.storage
    .from("models")
    .getPublicUrl(data.storage_path);

  if (urlError) throw urlError;

  return { ...data, modelUrl: publicURL };
}
