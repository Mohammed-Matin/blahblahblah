import React, { useState, useEffect } from 'react';
import { Lightbulb, Code2, MessagesSquare, ChevronRight, AlertCircle } from 'lucide-react';

const DUMMY_PROMPTS = [
  {
    id: 1,
    title: "Chain of Thought (CoT)",
    description: "Force the model to break down its reasoning step-by-step before providing an answer. This significantly improves performance on complex logic and math problems.",
    example: "Q: I have 5 apples. I give 2 to John, and buy 3 more. How many do I have?\nA: Let's think step-by-step. Starting apples: 5. Give 2 away: 5-2=3. Buy 3 more: 3+3=6. Final answer: 6.",
    category: "Reasoning"
  },
  {
    id: 2,
    title: "Few-Shot Prompting",
    description: "Provide a few examples of the desired input-output behavior to teach the model the pattern before asking it to perform the task.",
    example: "Classify the sentiment:\n'This is great' -> Positive\n'I hate this' -> Negative\n'It is okay' -> Neutral\n'I am extremely happy' ->",
    category: "Classification"
  },
  {
    id: 3,
    title: "Role Prompting",
    description: "Assign a specific persona or role to the AI to guide its tone, expertise level, and formatting.",
    example: "You are a senior React developer with 10 years of experience. Review the following code for performance bottlenecks and suggest optimizations using modern hooks. Keep your tone professional but encouraging.",
    category: "Coding"
  }
];

export default function PromptGuide() {
  const [prompts, setPrompts] = useState(DUMMY_PROMPTS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/prompts');
        if (!response.ok) throw new Error('API not available');
        const data = await response.json();
        setPrompts(data);
        setError(false);
      } catch (err) {
        console.log("Using fallback dummy data for Prompts");
        setPrompts(DUMMY_PROMPTS);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPrompts();
  }, []);

  if (loading) {
    return <div className="text-slate-400 animate-pulse">Loading prompt guides...</div>;
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Prompt Engineering Guide</h2>
        <p className="text-slate-400">Techniques to get the best output from LLMs</p>
      </div>

      {error && (
        <div className="bg-amber-900/20 border border-amber-900/50 p-4 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-500 mt-0.5" />
          <div>
            <h4 className="text-amber-500 font-medium">Real-time API Offline</h4>
            <p className="text-slate-300 text-sm">Showing fallback static data. Check REQUIREMENTS.md to implement the backend API.</p>
          </div>
        </div>
      )}

      <div className="grid gap-6">
        {prompts.map((prompt) => (
          <div key={prompt.id} className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500">
                  <Lightbulb className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-100">{prompt.title}</h3>
                  <span className="text-xs text-amber-400 bg-amber-900/20 px-2 py-1 rounded-md border border-amber-900/50 inline-block mt-1">
                    {prompt.category}
                  </span>
                </div>
              </div>
            </div>

            <p className="text-slate-300 mb-6 leading-relaxed">
              {prompt.description}
            </p>

            <div className="bg-slate-950 rounded-lg p-4 border border-slate-800 relative group">
              <div className="absolute top-3 right-3 text-xs text-slate-500 uppercase font-bold tracking-wider">Example</div>
              <pre className="text-sm text-slate-300 font-mono whitespace-pre-wrap mt-2">
                {prompt.example}
              </pre>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
