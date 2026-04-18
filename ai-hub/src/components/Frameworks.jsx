import React, { useState, useEffect } from 'react';
import { Terminal, Code, Layers, GitBranch, DatabaseIcon, AlertCircle } from 'lucide-react';

const DUMMY_FRAMEWORKS = [
  {
    id: 1,
    name: "LangChain",
    icon: "Layers",
    desc: "The standard framework for developing applications powered by language models. Rich ecosystem of integrations.",
    language: "Python / JS",
    tags: ["Agents", "RAG", "Chains"]
  },
  {
    id: 2,
    name: "LlamaIndex",
    icon: "DatabaseIcon",
    desc: "Data framework for connecting custom data sources to large language models. Best-in-class RAG capabilities.",
    language: "Python / TS",
    tags: ["RAG", "Data Connectors", "Vector Stores"]
  },
  {
    id: 3,
    name: "Vercel AI SDK",
    icon: "Code",
    desc: "Library to build AI-powered streaming text and chat UIs in React, Svelte, Vue, and Solid.",
    language: "TypeScript",
    tags: ["UI", "Streaming", "React"]
  },
  {
    id: 4,
    name: "DSPy",
    icon: "GitBranch",
    desc: "Framework for algorithmically optimizing LM prompts and weights. Replaces manual prompt engineering.",
    language: "Python",
    tags: ["Optimization", "Research", "Compilers"]
  }
];

const getIcon = (iconName) => {
  switch(iconName) {
    case "Layers": return <Layers className="w-6 h-6" />;
    case "DatabaseIcon": return <DatabaseIcon className="w-6 h-6" />;
    case "Code": return <Code className="w-6 h-6" />;
    case "GitBranch": return <GitBranch className="w-6 h-6" />;
    default: return <Terminal className="w-6 h-6" />;
  }
};

export default function Frameworks() {
  const [frameworks, setFrameworks] = useState(DUMMY_FRAMEWORKS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchFrameworks = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/frameworks');
        if (!response.ok) throw new Error('API not available');
        const data = await response.json();
        setFrameworks(data);
        setError(false);
      } catch (err) {
        console.log("Using fallback dummy data for Frameworks");
        setFrameworks(DUMMY_FRAMEWORKS);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchFrameworks();
  }, []);

  if (loading) {
    return <div className="text-slate-400 animate-pulse">Loading frameworks...</div>;
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Developer Frameworks</h2>
        <p className="text-slate-400">Tools to wire up models, data, and interfaces.</p>
      </div>

      {error && (
        <div className="bg-emerald-900/20 border border-emerald-900/50 p-4 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-emerald-500 mt-0.5" />
          <div>
            <h4 className="text-emerald-500 font-medium">Real-time API Offline</h4>
            <p className="text-slate-300 text-sm">Showing fallback static data. Check REQUIREMENTS.md to implement the backend API.</p>
          </div>
        </div>
      )}

      <div className="grid gap-4">
        {frameworks.map((fw) => (
          <div key={fw.id} className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col md:flex-row gap-5 hover:border-slate-700 transition-all">
            <div className="p-3 bg-slate-800 rounded-lg h-fit text-slate-300 w-fit">
              {getIcon(fw.icon)}
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold text-slate-100">{fw.name}</h3>
                <span className="text-xs font-mono bg-slate-800 text-slate-400 px-2 py-1 rounded">
                  {fw.language}
                </span>
              </div>

              <p className="text-slate-400 text-sm mb-3">
                {fw.desc}
              </p>

              <div className="flex gap-2">
                {fw.tags.map((tag, i) => (
                  <span key={i} className="text-xs text-blue-400 bg-blue-900/20 px-2 py-1 rounded-md border border-blue-900/50">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="md:border-l border-slate-800 md:pl-5 flex items-center justify-center pt-4 md:pt-0 border-t md:border-t-0">
              <button className="w-full md:w-auto px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2">
                <Terminal className="w-4 h-4" />
                Docs
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
