import { Github } from 'lucide-react';

import logo from '@/assets/logo.svg';

const Hero = () => {
  return (
    <header className="flex flex-col items-center justify-center gap-8 py-3">
      <nav className="flex items-center justify-between w-full">
        <img src={logo} alt="sumz_logo" className="block object-contain w-20" />
        <a
          href="https://github.com/srmasharad/openai-article-summarizer"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white transition-all rounded-lg bg-slate-900 hover:bg-slate-900/80 focus-visible:ring-offset-2 focus-visible:ring-2 focus-visible:ring-slate-900/40 focus-visible:outline-none"
        >
          <Github size={16} className="mr-2" />
          Github
        </a>
      </nav>

      <div className="flex flex-col gap-6 py-4 text-3xl font-bold text-center text-slate-900">
        <div className="flex flex-col gap-1">
          <h1>Summarize Articles with</h1>
          <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 from-20% via-orange-600 via-40% to-orange-400 to-80%">
            OpenAI GPT-4
          </h2>
        </div>
        <p className="max-w-screen-sm text-base font-normal text-gray-500">
          Simplify your reading with Summize, an open-source article summarizer
          that transforms lengthy articles into clear and concise summaries.
        </p>
      </div>
    </header>
  );
};

export default Hero;
