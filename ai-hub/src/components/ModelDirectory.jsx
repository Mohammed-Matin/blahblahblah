import React, { useState, useEffect } from 'react';
import { Server, Key, Shield, Zap, Box, CheckCircle2, AlertCircle } from 'lucide-react';

const DUMMY_PROVIDERS = [
  {
    id: 1,
    name: "Groq",
    description: "Ultra-fast LPU inference for open models (Llama 3, Mixtral).",
    tier: "Generous Free Tier",
    limits: "500k tokens/day",
    models: ["Llama 3 8B/70B", "Mixtral 8x7B", "Gemma"],
    color: "orange"
  },
  {
    id: 2,
    name: "Together AI",
    description: "Broad ecosystem of open-source models via single API.",
    tier: "$5 Free Credit",
    limits: "Varies by model",
    models: ["Qwen", "Llama", "Mistral", "DBRX"],
    color: "blue"
  },
  {
    id: 3,
    name: "Google Gemini",
    description: "Gemini 1.5 Flash and Pro models via Google AI Studio.",
    tier: "Free Tier Available",
    limits: "15 RPM / 1M TPM",
    models: ["Gemini 1.5 Pro", "Gemini 1.5 Flash"],
    color: "emerald"
  },
  {
    id: 4,
    name: "Hugging Face Inference",
    description: "Serverless inference API for 100k+ models.",
    tier: "Free Tier",
    limits: "Rate limited based on load",
    models: ["Any hosted model"],
    color: "yellow"
  }
];

export default function ModelDirectory() {
  const [providers, setProviders] = useState(DUMMY_PROVIDERS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/models');
        if (!response.ok) throw new Error('API not available');
        const data = await response.json();
        setProviders(data);
        setError(false);
      } catch (err) {
        console.log("Using fallback dummy data for Models");
        setProviders(DUMMY_PROVIDERS);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchModels();
  }, []);

  if (loading) {
    return <div className="text-slate-400 animate-pulse">Loading APIs & Models...</div>;
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Free APIs & Inference</h2>
        <p className="text-slate-400">Build without breaking the bank. Top free tiers for developers.</p>
      </div>

      {error && (
        <div className="bg-purple-900/20 border border-purple-900/50 p-4 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-purple-500 mt-0.5" />
          <div>
            <h4 className="text-purple-500 font-medium">Real-time API Offline</h4>
            <p className="text-slate-300 text-sm">Showing fallback static data. Check REQUIREMENTS.md to implement the backend API.</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {providers.map((provider) => (
          <div key={provider.id} className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-blue-500/10 text-blue-500`}>
                  <Server className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-100">{provider.name}</h3>
              </div>
              <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                {provider.tier}
              </span>
            </div>

            <p className="text-slate-400 text-sm mb-4 h-10">
              {provider.description}
            </p>

            <div className="space-y-3">
              <div className="flex items-center text-sm text-slate-300 bg-slate-800/50 p-2 rounded-md">
                <Zap className="w-4 h-4 mr-2 text-yellow-500" />
                <span className="text-slate-500 mr-2">Limits:</span>
                {provider.limits}
              </div>

              <div className="flex items-start text-sm text-slate-300 bg-slate-800/50 p-2 rounded-md">
                <Box className="w-4 h-4 mr-2 text-purple-500 mt-0.5" />
                <div>
                  <span className="text-slate-500 mr-2">Key Models:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {provider.models.map((m, i) => (
                      <span key={i} className="text-xs bg-slate-700 px-1.5 py-0.5 rounded text-slate-300">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-6 bg-blue-900/20 border border-blue-900/50 rounded-xl">
        <h3 className="text-lg font-bold text-blue-400 mb-2 flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Local Alternatives (Privacy First)
        </h3>
        <p className="text-slate-300 text-sm mb-4">
          Prefer running models locally? Here are the best tools for local inference:
        </p>
        <div className="flex flex-wrap gap-3">
          <div className="bg-slate-900 border border-slate-700 px-4 py-2 rounded-lg text-sm font-medium">Ollama</div>
          <div className="bg-slate-900 border border-slate-700 px-4 py-2 rounded-lg text-sm font-medium">LM Studio</div>
          <div className="bg-slate-900 border border-slate-700 px-4 py-2 rounded-lg text-sm font-medium">llama.cpp</div>
          <div className="bg-slate-900 border border-slate-700 px-4 py-2 rounded-lg text-sm font-medium">vLLM</div>
        </div>
      </div>
    </div>
  );
}
