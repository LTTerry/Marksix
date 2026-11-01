/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Copy, Check, Ticket, ArrowDownUp, Sparkles } from 'lucide-react';
import { FancyLottoBall } from './FancyLottoBall';
import { getFancyBallTheme } from '../utils/constants';

interface ResultsRackProps {
  drawnNumbers: number[];
  isDrawing: boolean;
  onOpenTicketChecker: () => void;
  maxNumber: number;
}

export const ResultsRack: React.FC<ResultsRackProps> = ({
  drawnNumbers,
  isDrawing,
  onOpenTicketChecker,
  maxNumber,
}) => {
  const [copied, setCopied] = useState(false);
  const [isSorted, setIsSorted] = useState(false);

  const displayNumbers = isSorted
    ? [...drawnNumbers].sort((a, b) => a - b)
    : drawnNumbers;

  const handleCopy = () => {
    if (drawnNumbers.length === 0) return;
    const text = displayNumbers.join(', ');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sum = drawnNumbers.reduce((acc, curr) => acc + curr, 0);
  const evens = drawnNumbers.filter((n) => n % 2 === 0).length;
  const odds = drawnNumbers.length - evens;
  const isComplete = drawnNumbers.length === 6;

  return (
    <div className="w-full max-w-4xl mx-auto mt-6 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-6 backdrop-blur-md shadow-2xl">
      {/* Rack Title and Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2 font-display">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span>Winning 6-Number Draw Tray</span>
            {isComplete && (
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center gap-1">
                <span>Verified Draw Complete</span>
              </span>
            )}
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            {isDrawing
              ? 'Extracting 3D gemstone lottery spheres into the prize rack...'
              : isComplete
              ? 'All 6 jewel-toned lottery spheres verified and locked'
              : 'Press the Big Red Button to draw the 6 winning gemstone balls'}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {drawnNumbers.length > 0 && (
            <>
              <button
                type="button"
                onClick={() => setIsSorted(!isSorted)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors"
                title="Toggle between Draw Order and Numerical Order"
              >
                <ArrowDownUp className="w-3.5 h-3.5 text-amber-400" />
                <span>{isSorted ? 'Draw Order' : 'Sort Numbers'}</span>
              </button>

              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors"
                title="Copy 6 numbers to clipboard"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </>
          )}

          <button
            type="button"
            onClick={onOpenTicketChecker}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all shadow-md active:scale-95"
          >
            <Ticket className="w-3.5 h-3.5" />
            <span>Check My 6 Numbers</span>
          </button>
        </div>
      </div>

      {/* 6-Slot Luxurious Ball Tray Rack */}
      <div className="mt-6 mb-4 py-6 px-3 sm:px-8 bg-slate-950/90 rounded-2xl border border-amber-900/30 shadow-[inset_0_2px_12px_rgba(0,0,0,0.8)] flex items-center justify-between gap-3 sm:gap-6 overflow-x-auto relative">
        {/* Soft Ambient Gold Floor Glow */}
        <div className="absolute inset-x-12 bottom-1 h-3 bg-amber-500/10 blur-md pointer-events-none" />

        {Array.from({ length: 6 }).map((_, index) => {
          const num = displayNumbers[index];
          const hasNumber = typeof num === 'number';
          const theme = hasNumber ? getFancyBallTheme(num) : null;

          return (
            <div key={index} className="flex flex-col items-center shrink-0 relative group">
              {/* Ball Slot Number Indicator */}
              <span className="text-[10px] font-mono-nums font-bold text-slate-400 mb-2 uppercase tracking-wider">
                Slot #{index + 1}
              </span>

              {/* The 3D Ball Sphere or Velvet Cradle */}
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center">
                {hasNumber ? (
                  <motion.div
                    initial={{ scale: 0, rotate: -240, y: -60 }}
                    animate={{ scale: 1, rotate: 0, y: 0 }}
                    transition={{
                      type: 'spring',
                      stiffness: 300,
                      damping: 17,
                    }}
                    className="relative cursor-pointer"
                  >
                    <FancyLottoBall
                      number={num}
                      size="md"
                      isHighlighted={isComplete}
                      animateSparkle={index === drawnNumbers.length - 1}
                    />
                  </motion.div>
                ) : (
                  /* Elegant empty velvet cradle ring */
                  <div className="w-full h-full rounded-full border-2 border-dashed border-slate-700/60 bg-slate-900/60 flex flex-col items-center justify-center text-slate-600 shadow-inner">
                    <span className="text-xs font-mono-nums font-bold">--</span>
                  </div>
                )}
              </div>

              {/* Gemstone Label Tag */}
              <div className="mt-2 text-[10px] text-center font-medium truncate max-w-[72px]">
                {hasNumber && theme ? (
                  <span
                    className="font-semibold tracking-tight"
                    style={{ color: theme.rimColor }}
                  >
                    {theme.name.split(' ')[0]}
                  </span>
                ) : (
                  <span className="text-slate-600">Empty</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Statistical Summary Strip */}
      {drawnNumbers.length > 0 && (
        <div className="mt-4 pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-4 flex-wrap">
            <span>
              Sum: <strong className="text-white font-mono-nums">{sum}</strong>
            </span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>
              Even / Odd:{' '}
              <strong className="text-white font-mono-nums">
                {evens} / {odds}
              </strong>
            </span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>
              Range:{' '}
              <strong className="text-white font-mono-nums">
                {Math.min(...drawnNumbers)} – {Math.max(...drawnNumbers)}
              </strong>{' '}
              (within 1–{maxNumber})
            </span>
          </div>

          <div className="text-[11px] text-amber-300 font-semibold flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>3D Gemstone Spheres with Specular Gold Luster</span>
          </div>
        </div>
      )}
    </div>
  );
};
