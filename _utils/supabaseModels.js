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

export async function getModel(uid) {
  if (!uid) throw new Error("Missing user ID");

  console.log("Getting model for user ID:", uid);

  const { data, error } = await supabase
    .from("Models")
    .select("*")
    .eq("userID", uid);

  if (error) throw error;

  if (!data || data.length === 0) {
    throw new Error(`No models found for user ID: ${uid}`);
  }

  const modelsWithUrls = data.map((model) => {
    if (!model.modelURL) {
      console.warn(`Model with user ID: ${uid} is missing modelURL.`);
      return { ...model, modelUrl: null };
    }
    return { ...model, modelUrl: model.modelURL };
  });

  return modelsWithUrls;
}

