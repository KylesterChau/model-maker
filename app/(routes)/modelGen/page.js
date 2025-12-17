'use client';
import { useState } from 'react';
import { generateAndGetModel } from '../../../_utils/meshy';
import { saveModel } from '../../../_utils/supabaseModels';
import { useUserAuth } from "../../../_utils/AuthContext";
import Header from '../../components/head';
import Footer from '../../components/foot';
import Popup from '../../components/popUp';

export default function ModelGenPage() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [savedModel, setSavedModel] = useState(null);
  const [error, setError] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [modelName, setModelName] = useState("");
  const { user } = useUserAuth();
  
  async function handleGenerate(){
    if (!prompt.trim()) {
      setError('Please enter a prompt.');
      return;
    }

    setError('');
    setLoading(true);
    setSavedModel(null);

    try {
      const result = await generateAndGetModel(prompt, { mode: 'preview' });

      if (!result || !result.modelUrl) {
        throw new Error('Model generation returned invalid data.');
      }

      console.log('Model successfully fetched:', result);
      setSavedModel(result);
    } catch (err) {
      console.error('Error generating model:', err);
      setError(err.message || 'Failed to generate model');
    } finally {
      setLoading(false);
    }
  }

  async function SaveModeltoDb(name, model) {
    if (!model || !model.modelUrl) {
      console.error("Missing required model data:", model);
      return;
    }
    console.log(model);
    if (!name) {
      console.error("Missing model name");
      return;
    }

    try {
      const result = await saveModel({
        modelName: name,
        prompt: prompt,
        savedModel: model,
        user: user
      });

      console.log("Model saved successfully:", result);
    } catch (err) {
      console.error("Error saving model:", err);
    }
  }

  return (
    <div className="min-h-screen bg-[#0F172A] text-white font-inter">
      <Header />
      <main>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe your model..."
          className="w-full p-3 rounded-lg border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow shadow-sm mb-4"
        />
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? 'Generating model...' : 'Generate Model'}
        </button>

        {error && <p className="text-red-500 mt-4">{error}</p>}

        {savedModel && (
          <div className="mt-6">
            <a
              href="https://www.meshy.ai/3d-tools/online-viewer/glb"
              className="text-blue-400 hover:underline"
            >
              GLB Viewer site
            </a>
            <button
              onClick={() => window.open(savedModel.modelUrl, '_blank')}
              className="ml-4 bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
            >
              Download Model
            </button>
            <button
              onClick={() => setIsPopupOpen(true)}
              className="ml-4 bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
            >
              Save Model
            </button>
            <Popup
              isOpen={isPopupOpen}
              onClose={() => setIsPopupOpen(false)}
              onConfirm={() => SaveModeltoDb(modelName, savedModel)}
              modelName={modelName}
              setModelName={setModelName}
              savedModel={savedModel}
            />
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
