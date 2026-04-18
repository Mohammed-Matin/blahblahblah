import React, { useState, useEffect } from 'react';
import { Wrench, ExternalLink, Code, AlertCircle, Terminal, Package } from 'lucide-react';

const DUMMY_TOOLS = [
  {
    id: 1,
    name: "Cursor",
    description: "The AI-first Code Editor. A fork of VS Code with deeply integrated AI features like codebase querying and inline code generation.",
    pricing: "Free Tier / $20/mo",
    url: "https://cursor.sh",
    tags: ["IDE", "Copilot"]
  },
  {
    id: 2,
    name: "GitHub Copilot",
    description: "Your AI pair programmer. Plugs into most popular IDEs to suggest code and entire functions in real-time right from your editor.",
    pricing: "$10/mo (Free for students/OSS)",
    url: "https://github.com/features/copilot",
    tags: ["Extension", "Completion"]
  },
  {
    id: 3,
    name: "Aider",
    description: "AI pair programming in your terminal. Connects to GPT-4/Claude 3 to edit code in your local git repo. Works entirely via CLI.",
    pricing: "Free (Bring your own API key)",
    url: "https://aider.chat/",
    tags: ["CLI", "Open Source"]
  },
  {
    id: 4,
    name: "CodiumAI",
    description: "Meaningful code tests for busy developers. Analyzes your code and generates comprehensive test suites automatically.",
    pricing: "Free Tier Available",
    url: "https://www.codium.ai/",
    tags: ["Testing", "VS Code"]
  }
];

export default function CodingTools() {
  const [tools, setTools] = useState(DUMMY_TOOLS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchTools = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/tools');
        if (!response.ok) throw new Error('API not available');
        const data = await response.json();
        setTools(data);
        setError(false);
      } catch (err) {
        console.log("Using fallback dummy data for Tools");
        setTools(DUMMY_TOOLS);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchTools();
  }, []);

  if (loading) {
    return <div className="text-slate-400 animate-pulse">Loading AI coding tools...</div>;
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">AI Coding Tools</h2>
        <p className="text-slate-400">IDEs, extensions, and CLIs to supercharge your workflow</p>
      </div>

      {error && (
        <div className="bg-rose-900/20 border border-rose-900/50 p-4 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-rose-500 mt-0.5" />
          <div>
            <h4 className="text-rose-500 font-medium">Real-time API Offline</h4>
            <p className="text-slate-300 text-sm">Showing fallback static data. Check REQUIREMENTS.md to implement the backend API.</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tools.map((tool) => (
          <div key={tool.id} className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-all flex flex-col h-full group">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-rose-500/10 text-rose-500">
                  {tool.tags.includes("IDE") ? <Code className="w-6 h-6" /> :
                   tool.tags.includes("CLI") ? <Terminal className="w-6 h-6" /> :
                   <Package className="w-6 h-6" />}
                </div>
                <h3 className="text-xl font-bold text-slate-100 group-hover:text-rose-400 transition-colors">
                  {tool.name}
                </h3>
              </div>
            </div>

            <p className="text-slate-400 text-sm mb-6 flex-grow">
              {tool.description}
            </p>

            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {tool.tags.map((tag, idx) => (
                  <span key={idx} className="text-xs bg-slate-800 text-slate-300 px-2.5 py-1 rounded-md border border-slate-700">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <span className="text-sm text-slate-400 font-medium">{tool.pricing}</span>
                <a
                  href={tool.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-sm text-rose-400 hover:text-rose-300 transition-colors font-medium bg-rose-500/10 hover:bg-rose-500/20 px-3 py-1.5 rounded-lg"
                >
                  Visit <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
