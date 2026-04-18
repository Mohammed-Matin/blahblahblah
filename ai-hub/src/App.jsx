import React, { useEffect, useRef, useState } from 'react';
import { Layout, Search, BookOpen, Cpu, Terminal, Zap, Globe, MessageSquare } from 'lucide-react';
import Lenis from 'lenis';
import NewsFeed from './components/NewsFeed';
import ModelDirectory from './components/ModelDirectory';
import Frameworks from './components/Frameworks';

function App() {
  const [activeTab, setActiveTab] = useState('news');
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const wrapper = scrollContainerRef.current;

    if (!wrapper) {
      return undefined;
    }

    const lenis = new Lenis({
      wrapper,
      content: wrapper.firstElementChild ?? wrapper,
      duration: 1.1,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.2,
    });

    let rafId = 0;

    const raf = (time) => {
      lenis.raf(time);
      rafId = window.requestAnimationFrame(raf);
    };

    rafId = window.requestAnimationFrame(raf);

    return () => {
      window.cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex font-mono">
      {/* Sidebar */}
      <div className="w-64 border-r border-slate-800 bg-slate-900 flex flex-col hidden md:flex">
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <Zap className="w-8 h-8 text-blue-500" />
            <h1 className="text-xl font-bold tracking-tight">AI<span className="text-blue-500">Hub</span>.cs</h1>
          </div>
          <p className="text-xs text-slate-400 mt-2">Updates & Free APIs for CS</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => setActiveTab('news')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'news' ? 'bg-blue-600/10 text-blue-500' : 'hover:bg-slate-800 text-slate-300'}`}
          >
            <BookOpen className="w-5 h-5" />
            Latest Updates
          </button>
          <button
            onClick={() => setActiveTab('models')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'models' ? 'bg-purple-600/10 text-purple-500' : 'hover:bg-slate-800 text-slate-300'}`}
          >
            <Cpu className="w-5 h-5" />
            Free APIs & Models
          </button>
          <button
            onClick={() => setActiveTab('frameworks')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'frameworks' ? 'bg-emerald-600/10 text-emerald-500' : 'hover:bg-slate-800 text-slate-300'}`}
          >
            <Terminal className="w-5 h-5" />
            Dev Frameworks
          </button>
        </nav>
        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Globe className="w-4 h-4" />
            <span>v1.0.0-beta</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Topbar */}
        <header className="h-16 border-b border-slate-800 bg-slate-900/50 flex items-center justify-between px-6 backdrop-blur-sm z-10">
          <div className="flex items-center md:hidden gap-3">
            <Zap className="w-6 h-6 text-blue-500" />
            <h1 className="text-lg font-bold">AI Hub</h1>
          </div>

          <div className="relative w-full max-w-md hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search papers, models, APIs..."
              className="w-full bg-slate-800 border border-slate-700 rounded-full py-1.5 pl-10 pr-4 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-slate-200 placeholder-slate-400 transition-all"
            />
          </div>

          <div className="flex items-center gap-4">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors">
              <div className="w-5 h-5" />
            </a>
          </div>
        </header>

        {/* Content Area */}
        <main ref={scrollContainerRef} className="flex-1 overflow-y-auto no-scrollbar p-4 md:p-8">
          <div className="max-w-6xl mx-auto">
            {activeTab === 'news' && <NewsFeed />}
            {activeTab === 'models' && <ModelDirectory />}
            {activeTab === 'frameworks' && <Frameworks />}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
