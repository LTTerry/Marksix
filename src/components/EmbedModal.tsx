/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  X,
  Copy,
  Check,
  ExternalLink,
  Code2,
  Globe,
  Github,
  Download,
  Sparkles,
} from 'lucide-react';

interface EmbedModalProps {
  isOpen: boolean;
  onClose: () => void;
  appUrl: string;
}

export const EmbedModal: React.FC<EmbedModalProps> = ({
  isOpen,
  onClose,
  appUrl,
}) => {
  const [activeTab, setActiveTab] = useState<'github' | 'googlesites'>('github');
  const [copiedType, setCopiedType] = useState<string | null>(null);

  if (!isOpen) return null;

  const resolvedUrl =
    appUrl ||
    (typeof window !== 'undefined'
      ? window.location.href
      : 'https://ais-pre-eqhj2bgeehexiojaj52u3r-398961891283.asia-northeast1.run.app');

  // GitHub README snippet
  const githubReadmeSnippet = `### 🐾 Feline Lotto 6/49 — Starring Blue & Milk

[![Play Live Game](https://img.shields.io/badge/PLAY_LIVE_GAME-Feline_Lotto_6%2F49-FFB800?style=for-the-badge&logo=google-chrome&logoColor=black)](${resolvedUrl})

> **Interactive 6-Number Lottery Game**: Watch **Blue** (grey cat) and **Milk** (cream cat) lunge in and press the big button to draw 6 non-duplicate gemstone balls (1 to 49)!
>
> 🚀 **[Click here to play the live interactive game](${resolvedUrl})**`;

  // Standalone HTML for GitHub Pages (index.html)
  const githubPagesHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Feline Lotto 6/49 - Starring Blue & Milk</title>
  <style>
    * { box-sizing: border-box; }
    html, body {
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      background-color: #020617;
    }
    iframe {
      width: 100%;
      height: 100%;
      border: none;
      display: block;
    }
  </style>
</head>
<body>
  <iframe
    src="${resolvedUrl}"
    title="Feline Lotto 6/49"
    allow="autoplay"
    allowfullscreen
  ></iframe>
</body>
</html>`;

  // Standard iFrame for Google Sites or web embeds
  const iframeSnippet = `<iframe
  src="${resolvedUrl}"
  width="100%"
  height="920"
  style="border:none; border-radius:16px; overflow:hidden; width:100%; min-height:920px;"
  allow="autoplay"
  loading="lazy"
></iframe>`;

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  const handleDownloadHtml = () => {
    const blob = new Blob([githubPagesHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'index.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/50 flex items-center justify-center text-amber-400">
              <Code2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-display">
                Embed &amp; Share Game
              </h3>
              <p className="text-xs text-slate-400">
                Add Blue &amp; Milk&apos;s lotto game to GitHub or Google Sites
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center px-6 pt-3 border-b border-slate-800 bg-slate-950/40 gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('github')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold border-b-2 transition-all ${
              activeTab === 'github'
                ? 'border-amber-400 text-amber-300 bg-amber-400/10 rounded-t-lg'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Github className="w-4 h-4" />
            <span>GitHub (README &amp; Pages)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('googlesites')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold border-b-2 transition-all ${
              activeTab === 'googlesites'
                ? 'border-amber-400 text-amber-300 bg-amber-400/10 rounded-t-lg'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>Google Sites &amp; Web iFrame</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {activeTab === 'github' ? (
            <>
              {/* Note on GitHub iFrame Policy */}
              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                <span className="font-semibold text-amber-300">💡 GitHub Security Note:</span>{' '}
                GitHub strictly blocks raw <code className="text-amber-400 font-mono text-[11px]">&lt;iframe&gt;</code> tags inside Markdown files (<code className="text-slate-300">README.md</code>). The two standard, working ways to embed it on GitHub are via a <strong className="text-white">GitHub README Badge / Card</strong> or hosting on <strong className="text-white">GitHub Pages (gh-pages)</strong>.
              </div>

              {/* Option A: GitHub README Markdown Badge */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                      Option A: GitHub README.md Badge &amp; Live Card
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(githubReadmeSnippet, 'readme')}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-amber-950 text-amber-300 border border-amber-800 hover:bg-amber-900 text-xs font-semibold transition-colors"
                  >
                    {copiedType === 'readme' ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Copied Markdown!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Markdown</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-3 bg-slate-900 rounded-lg border border-slate-800 font-mono text-[11px] text-amber-200/90 overflow-x-auto whitespace-pre-wrap select-all">
                  {githubReadmeSnippet}
                </pre>
                <p className="text-[11px] text-slate-400 mt-2">
                  Paste this into your repository&apos;s <code className="text-slate-200 font-mono">README.md</code> to render a gold launcher button and direct link.
                </p>
              </div>

              {/* Option B: GitHub Pages (Live Fullscreen App) */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                      Option B: Host on GitHub Pages (yourname.github.io/cat-lottery)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleDownloadHtml}
                      className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors border border-slate-700"
                      title="Download index.html file to push to your GitHub repo"
                    >
                      <Download className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Download index.html</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(githubPagesHtml, 'ghpages')}
                      className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-950 text-emerald-300 border border-emerald-800 hover:bg-emerald-900 text-xs font-semibold transition-colors"
                    >
                      {copiedType === 'ghpages' ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Copied HTML!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy HTML</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800 text-xs text-slate-300 space-y-2">
                  <p className="font-semibold text-white">How to deploy to GitHub Pages in 3 steps:</p>
                  <ol className="list-decimal list-inside space-y-1.5 text-slate-400 pl-1">
                    <li>Create a new repository on GitHub (e.g. <code className="text-slate-200 font-mono">feline-lotto</code>).</li>
                    <li>Add an <code className="text-slate-200 font-mono">index.html</code> file with the code above (or use the Download button).</li>
                    <li>Go to repo <strong className="text-white">Settings &rarr; Pages</strong>, select Branch: <strong className="text-white">main</strong>, and click <strong className="text-emerald-400">Save</strong>.</li>
                  </ol>
                  <p className="text-[11px] text-amber-300/90 pt-1">
                    Your interactive game will be live at: <code className="font-mono text-white">https://&lt;username&gt;.github.io/feline-lotto/</code>
                  </p>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Google Sites / Standard Web Embed Content */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                      Google Sites URL (Embed by URL)
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(resolvedUrl, 'url')}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-950 text-emerald-300 border border-emerald-800 hover:bg-emerald-900 text-xs font-semibold transition-colors"
                  >
                    {copiedType === 'url' ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Copied URL!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy URL</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 font-mono text-xs text-slate-300 break-all select-all">
                  {resolvedUrl}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                      Standard HTML iFrame
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(iframeSnippet, 'code')}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-amber-950 text-amber-300 border border-amber-800 hover:bg-amber-900 text-xs font-semibold transition-colors"
                  >
                    {copiedType === 'code' ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Copied iFrame Code!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy iFrame</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-3 bg-slate-900 rounded-lg border border-slate-800 font-mono text-[11px] text-amber-200/90 overflow-x-auto whitespace-pre-wrap select-all">
                  {iframeSnippet}
                </pre>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-3.5 border-t border-slate-800 bg-slate-950/70">
          <a
            href={resolvedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
          >
            <span>Open live preview</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
