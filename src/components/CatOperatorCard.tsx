/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, CheckCircle2 } from 'lucide-react';
import { CatInfo, CatId } from '../types';
import { sounds } from '../utils/audio';

interface CatOperatorCardProps {
  cat: CatInfo;
  isActive: boolean;
  isDrawing: boolean;
  onSelect: (id: CatId) => void;
}

export const CatOperatorCard: React.FC<CatOperatorCardProps> = ({
  cat,
  isActive,
  isDrawing,
  onSelect,
}) => {
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([]);
  const [petCount, setPetCount] = useState(0);

  const handlePet = (e: React.MouseEvent) => {
    e.stopPropagation();
    sounds.playCatMeow(cat.id);
    setPetCount((prev) => prev + 1);

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newHeart = { id: Date.now() + Math.random(), x, y };
    setHearts((prev) => [...prev, newHeart]);

    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 1000);
  };

  return (
    <div
      onClick={() => onSelect(cat.id)}
      className={`relative group rounded-2xl cursor-pointer transition-all duration-300 overflow-hidden border ${
        isActive
          ? 'bg-slate-900/90 border-amber-400 ring-2 ring-amber-400/40 shadow-xl shadow-amber-500/10'
          : 'bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
      }`}
    >
      {/* Top Banner Ribbon */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-800/80 bg-slate-950/60">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
          <span className="text-xs font-semibold tracking-wider uppercase text-amber-300">
            {cat.role}
          </span>
        </div>
        {isActive && (
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded-full">
            <CheckCircle2 className="w-3 h-3" />
            Active Operator
          </span>
        )}
      </div>

      <div className="p-4 flex gap-4 items-center">
        {/* Cat Photo Thumbnail with Interactive Pettings */}
        <div
          onClick={handlePet}
          title="Click to pet this cat!"
          className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden shrink-0 border-2 border-slate-700/80 group-hover:border-amber-400/80 transition-all duration-300 shadow-md"
        >
          <img
            src={cat.image}
            alt={cat.name}
            referrerPolicy="no-referrer"
            className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
              isDrawing && isActive ? 'animate-pulse' : ''
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

          {/* Floating pet heart animations */}
          <AnimatePresence>
            {hearts.map((h) => (
              <motion.div
                key={h.id}
                initial={{ opacity: 1, scale: 0.5, y: 0 }}
                animate={{ opacity: 0, scale: 1.5, y: -45 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                style={{ left: h.x, top: h.y }}
                className="absolute pointer-events-none text-rose-400 -translate-x-1/2 -translate-y-1/2"
              >
                <Heart className="w-5 h-5 fill-rose-500" />
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Interactive Pet prompt overlay */}
          <div className="absolute bottom-1 right-1 bg-slate-950/80 backdrop-blur-xs text-[10px] text-amber-300 px-1.5 py-0.5 rounded flex items-center gap-0.5 opacity-90 group-hover:opacity-100 transition-opacity">
            <Sparkles className="w-2.5 h-2.5" />
            <span>Pet ({petCount})</span>
          </div>
        </div>

        {/* Cat Bio Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-1.5 truncate">
              {cat.name}
            </h3>
            <span className="text-[11px] text-slate-400 shrink-0 font-medium">
              {cat.breed.split('(')[0].trim()}
            </span>
          </div>

          <p className="text-xs text-slate-300 mt-1 line-clamp-2 leading-relaxed">
            {cat.personality}
          </p>

          <div className="mt-2.5 pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-400 italic text-[11px] truncate max-w-[200px]">
              &ldquo;{cat.luckyQuote}&rdquo;
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onSelect(cat.id);
              }}
              className={`text-[11px] font-semibold px-2.5 py-1 rounded transition-colors shrink-0 ${
                isActive
                  ? 'bg-amber-400 text-slate-950'
                  : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
              }`}
            >
              {isActive ? 'Selected' : 'Assign Paw'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
