'use client';
import React, { useState } from 'react';
import { generateAndGetModel } from '../../../_utils/meshy';
import Header from '../../components/head';
import Footer from '../../components/foot';

export default function ModelGenPage() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [savedModel, setSavedModel] = useState(null);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt.');
      return;
    }

    setError('');
    setLoading(true);
    setSavedModel(null);

    try {
      const result = await generateAndGetModel(prompt, { mode: 'preview' });

      console.log('Model successfully fetched:', result);
      setSavedModel(result);
    } catch (err) {
      console.error('Error generating model:', err);
      setError(err.message || 'Failed to generate model');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-white font-inter">
      <Header />

      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Describe your model..."
        className="w-full p-2 border rounded mb-4"
      />

      <button
        onClick={handleGenerate}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? 'Generating model...' : 'Generate Model'}
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {savedModel && (
        <div className="mt-6 border-t pt-4">
          <h2 className="text-xl font-semibold mb-2">Model Result</h2>

          {savedModel.modelUrl ? (
            <model-viewer
              src={savedModel.modelUrl}
              alt="3D Model"
              auto-rotate
              camera-controls
              style={{ width: '100%', height: '400px' }}
            ></model-viewer>
          ) : savedModel.thumbnail ? (
            <img
              src={savedModel.thumbnail}
              alt="Preview Thumbnail"
              style={{ width: '100%', maxHeight: '400px', objectFit: 'contain' }}
            />
          ) : (
            <p>No model or preview available.</p>
          )}

          {savedModel.modelUrl && (
            <a
              href={savedModel.modelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-2 text-blue-600 underline"
            >
              Download GLB
            </a>
          )}
        </div>
      )}
      <Footer />
    </div>
  );
}
