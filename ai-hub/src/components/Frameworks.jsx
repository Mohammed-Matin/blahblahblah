import React from 'react';
import { Terminal, Code, Layers, GitBranch, Cpu } from 'lucide-react';

const FRAMEWORKS = [
  {
    name: "LangChain",
    icon: <Layers className="w-6 h-6" />,
    desc: "The standard framework for developing applications powered by language models. Rich ecosystem of integrations.",
    language: "Python / JS",
    tags: ["Agents", "RAG", "Chains"]
  },
  {
    name: "LlamaIndex",
    icon: <DatabaseIcon className="w-6 h-6" />,
    desc: "Data framework for connecting custom data sources to large language models. Best-in-class RAG capabilities.",
    language: "Python / TS",
    tags: ["RAG", "Data Connectors", "Vector Stores"]
  },
  {
    name: "Vercel AI SDK",
    icon: <Code className="w-6 h-6" />,
    desc: "Library to build AI-powered streaming text and chat UIs in React, Svelte, Vue, and Solid.",
    language: "TypeScript",
    tags: ["UI", "Streaming", "React"]
  },
  {
    name: "DSPy",
    icon: <GitBranch className="w-6 h-6" />,
    desc: "Framework for algorithmically optimizing LM prompts and weights. Replaces manual prompt engineering.",
    language: "Python",
    tags: ["Optimization", "Research", "Compilers"]
  }
];

// Reusable dummy icon since Database isn't imported from lucide-react above
function DatabaseIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5V19A9 3 0 0 0 21 19V5" />
      <path d="M3 12A9 3 0 0 0 21 12" />
    </svg>
  );
}

export default function Frameworks() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Developer Frameworks</h2>
        <p className="text-slate-400">Tools to wire up models, data, and interfaces.</p>
      </div>

      <div className="grid gap-4">
        {FRAMEWORKS.map((fw, idx) => (
          <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col md:flex-row gap-5 hover:border-slate-700 transition-all">
            <div className="p-3 bg-slate-800 rounded-lg h-fit text-slate-300 w-fit">
              {fw.icon}
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
