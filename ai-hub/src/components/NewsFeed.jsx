import React from 'react';
import { ExternalLink, Tag, Clock } from 'lucide-react';

const NEWS_DATA = [
  {
    id: 1,
    title: "DeepSeek Coder V2 Released: Open Source Intelligence",
    summary: "A new open-source code language model that achieves performance comparable to GPT-4 Turbo in coding tasks. Free API access available through their platform.",
    date: "2 hours ago",
    tags: ["LLM", "Open Source", "Coding"],
    link: "#",
    type: "Model Release"
  },
  {
    id: 2,
    title: "Hugging Face ZeroGPU Spaces Announced",
    summary: "Free A100 GPU access for open-source AI models. Developers can now host and run heavy models without infrastructure costs.",
    date: "5 hours ago",
    tags: ["Infrastructure", "Free Tier", "Hosting"],
    link: "#",
    type: "Platform Update"
  },
  {
    id: 3,
    title: "Llama 3 70B Quantized Running on Consumer Hardware",
    summary: "New quantization techniques allow running the 70B parameter model on 24GB VRAM with minimal perplexity degradation.",
    date: "1 day ago",
    tags: ["Optimization", "Local AI", "Research"],
    link: "#",
    type: "Research"
  },
  {
    id: 4,
    title: "Groq LPU API Now Offers Llama 3 8B at 800 T/s",
    summary: "The LPU inference engine has increased its free tier limits, offering unprecedented speeds for the latest open models.",
    date: "2 days ago",
    tags: ["API", "Inference", "Speed"],
    link: "#",
    type: "API Update"
  }
];

export default function NewsFeed() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Latest Updates</h2>
          <p className="text-slate-400">Curated AI news for computer scientists</p>
        </div>
      </div>

      <div className="grid gap-4">
        {NEWS_DATA.map((item) => (
          <div key={item.id} className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-all group">
            <div className="flex justify-between items-start gap-4">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    {item.type}
                  </span>
                  <div className="flex items-center text-xs text-slate-500">
                    <Clock className="w-3 h-3 mr-1" />
                    {item.date}
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-slate-100 group-hover:text-blue-400 transition-colors flex items-center gap-2">
                  {item.title}
                  <ExternalLink className="w-4 h-4 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                </h3>

                <p className="text-slate-400 text-sm leading-relaxed">
                  {item.summary}
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {item.tags.map((tag, idx) => (
                    <div key={idx} className="flex items-center text-xs text-slate-500 bg-slate-800/50 px-2 py-1 rounded-md">
                      <Tag className="w-3 h-3 mr-1.5" />
                      {tag}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
