"use client";
import {getModel} from "../../../_utils/supabaseModels";
import { useUserAuth } from "../../../_utils/AuthContext";
import { useState, useEffect } from "react";
import ModelCard from "../../components/modelCard";
import Header from "../../components/head";
import Footer from "../../components/foot";

export default function ModelLibPage(){
  const[models, setModels] = useState([]);
  const { user } = useUserAuth();

  function formatDate(dateString) {
    const date = new Date(dateString);
    const formattedDate = date.toISOString().split('T')[0];
    return formattedDate;
  }

  useEffect(() => {
    async function GetModel() {
      try {
        const uid = user ? user.uid : null;
        if (uid) {
          const result = await getModel(uid);
          setModels(result);
        } else {
          console.log("No user logged in");
        }
      } catch (err) {
        console.error("Error fetching model:", err);
      }
    }

    GetModel();
  }, [user]);

  return (
    <div className="min-h-screen bg-[#0F172A] text-white font-inter">
      <Header />
      <main>
        <div className="models-container flex flex-wrap gap-6 justify-center p-8">
          {models.length > 0 ? (
            models.map((model, index) => (
              <ModelCard
                key={index}
                name={model.name}
                prompt={model.prompt}
                modelUrl={model.modelURL}
                creationDate={formatDate(model.created_at)}
              />
            ))
          ) : (
            <p>No models have been created yet. Go create your first one in the model generator page</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}