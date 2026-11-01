/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, Sparkles, Wind } from 'lucide-react';
import { CatId, CatInfo } from '../types';
import { AnimatedCatActor } from './AnimatedCatActor';
import { FancyLottoBall } from './FancyLottoBall';

interface LotteryMachineProps {
  isDrawing: boolean;
  isPawPressing: boolean;
  drawnNumbers: number[];
  activeBallIndex: number;
  currentRollingNumber: number | null;
  operatorCat: CatId;
  activeCatInfo: CatInfo;
  onTriggerDraw: () => void;
  statusMessage: string;
}

export const LotteryMachine: React.FC<LotteryMachineProps> = ({
  isDrawing,
  isPawPressing,
  drawnNumbers,
  activeBallIndex,
  currentRollingNumber,
  operatorCat,
  activeCatInfo,
  onTriggerDraw,
  statusMessage,
}) => {
  // Generate 26 fancy multi-gemstone balls inside the drum with varying depth & trajectories
  const tumblerBalls = useMemo(() => {
    return Array.from({ length: 26 }).map((_, i) => ({
      id: i,
      num: ((i * 7 + 4) % 49) + 1,
      x: 14 + Math.random() * 72,
      y: 22 + Math.random() * 58,
      depth: 0.85 + (i % 4) * 0.08,
      delay: (i * 0.11) % 1.6,
      duration: 1.1 + (i % 5) * 0.28,
    }));
  }, []);

  return (
    <div className="relative w-full max-w-2xl mx-auto flex flex-col items-center">
      {/* Real Cat Actor perched atop the lottery machine and lunging to press the button */}
      <div className="mb-2">
        <AnimatedCatActor
          operatorCat={operatorCat}
          catInfo={activeCatInfo}
          isPressing={isPawPressing}
          isDrawing={isDrawing}
        />
      </div>

      {/* Main Lottery Tumbler Unit */}
      <div className="relative w-full flex flex-col items-center">
        {/* Machine Head Arch & Neon Marquee */}
        <div className="w-64 sm:w-80 h-10 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-t-3xl border-t border-x border-amber-400/50 flex items-center justify-between px-6 shadow-xl relative z-10">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
            <span className="text-[11px] font-black tracking-widest text-amber-300 uppercase">
              GOLDEN TUMBLER 6 / 49
            </span>
          </div>
          <div className="flex items-center gap-1 text-[10px] text-amber-400/80 font-mono-nums font-bold">
            <Zap className="w-3 h-3 text-amber-400" />
            <span>PNEUMATIC 49-BALL</span>
          </div>
        </div>

        {/* Spherical Glass Tumbler Drum with LED Chase Perimeter */}
        <div className="relative w-76 h-76 sm:w-92 sm:h-92 rounded-full border-4 border-slate-700/80 drum-glass flex items-center justify-center overflow-hidden shadow-2xl">
          {/* LED Perimeter Glow Ring */}
          <div
            className={`absolute inset-0 rounded-full border-2 border-dashed pointer-events-none transition-all duration-500 ${
              isDrawing
                ? 'border-amber-400/60 shadow-[inset_0_0_25px_rgba(245,158,11,0.35)] animate-ring-chaser'
                : 'border-slate-700/40'
            }`}
          />

          {/* Internal Swirling Air Cyclone effect */}
          {isDrawing && (
            <div className="absolute inset-4 rounded-full pointer-events-none animate-air-cyclone flex items-center justify-center opacity-60">
              <div className="w-full h-full rounded-full border border-cyan-400/25 border-t-amber-300/40" />
              <div className="absolute w-3/4 h-3/4 rounded-full border border-sky-300/30 border-b-rose-400/30 transform rotate-45" />
            </div>
          )}

          {/* Internal rotating mechanical impeller agitator */}
          <div
            className={`absolute w-52 h-52 rounded-full border border-dashed border-amber-400/25 flex items-center justify-center transition-all duration-700 ${
              isDrawing ? 'animate-tumbler' : ''
            }`}
          >
            <div className="w-4 h-4 rounded-full bg-amber-400 shadow-md ring-2 ring-yellow-200" />
            <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-amber-300/50 to-transparent" />
            <div className="absolute h-full w-0.5 bg-gradient-to-b from-transparent via-amber-300/50 to-transparent" />
            <div className="absolute w-36 h-36 rounded-full border border-amber-300/15" />
          </div>

          {/* Central Suction Chute & Vacuum Tube */}
          <div className="absolute top-0 w-16 h-40 bg-gradient-to-b from-slate-900/95 via-slate-800/50 to-transparent border-x border-cyan-400/40 z-10 flex flex-col items-center pointer-events-none shadow-lg">
            <div className="w-full h-2.5 bg-cyan-400/50 shadow-sm" />
            <div className="flex-1 w-full flex flex-col items-center justify-center relative overflow-hidden">
              {isDrawing && (
                <>
                  <motion.div
                    animate={{ y: [-20, 30], opacity: [0.1, 0.9, 0.1] }}
                    transition={{ repeat: Infinity, duration: 0.5 }}
                    className="w-2 h-20 bg-gradient-to-b from-cyan-300 via-amber-300 to-transparent rounded-full blur-[1px]"
                  />
                  <div className="absolute bottom-2 flex items-center gap-1 text-[9px] text-cyan-300 font-bold uppercase tracking-tighter opacity-80">
                    <Wind className="w-3 h-3 animate-bounce" />
                    <span>SUCTION</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Fancy Gemstone Balls Tumbling inside the Glass Drum */}
          {tumblerBalls.map((b) => (
            <motion.div
              key={b.id}
              animate={
                isDrawing
                  ? {
                      x: [
                        `${b.x - 50}%`,
                        `${((b.x + 35) % 80) - 40}%`,
                        `${((b.x + 75) % 90) - 45}%`,
                        `${b.x - 50}%`,
                      ],
                      y: [
                        `${b.y - 50}%`,
                        `${((b.y + 45) % 75) - 35}%`,
                        `${((b.y + 25) % 85) - 45}%`,
                        `${b.y - 50}%`,
                      ],
                      rotate: [0, 180, 360, 540],
                      scale: [b.depth, b.depth * 1.15, b.depth * 0.9, b.depth],
                    }
                  : {
                      y: [`${b.y - 50}%`, `${b.y - 44}%`, `${b.y - 50}%`],
                      scale: [b.depth, b.depth * 1.03, b.depth],
                    }
              }
              transition={
                isDrawing
                  ? {
                      repeat: Infinity,
                      duration: b.duration * 0.75,
                      ease: 'linear',
                      delay: b.delay * 0.25,
                    }
                  : {
                      repeat: Infinity,
                      duration: 2.8 + b.delay,
                      ease: 'easeInOut',
                    }
              }
              className="absolute pointer-events-none select-none z-1"
              style={{
                left: `${b.x}%`,
                top: `${b.y}%`,
              }}
            >
              <FancyLottoBall
                number={b.num}
                size="xs"
                showPawWatermark={false}
              />
            </motion.div>
          ))}

          {/* Currently pulled / extracted ball in the spotlight chute */}
          <AnimatePresence>
            {currentRollingNumber !== null && (
              <motion.div
                initial={{ scale: 0.2, y: 90, opacity: 0, rotate: -180 }}
                animate={{
                  scale: [0.2, 1.35, 1.15],
                  y: [90, 10, 0],
                  opacity: 1,
                  rotate: 0,
                }}
                exit={{ scale: 0.7, y: -90, opacity: 0 }}
                transition={{ duration: 0.5, ease: 'backOut' }}
                className="absolute z-30 flex flex-col items-center justify-center filter drop-shadow-[0_0_25px_rgba(251,191,36,0.8)]"
              >
                {/* Radiant spotlight aura behind the winning ball */}
                <div className="absolute w-36 h-36 rounded-full bg-gradient-to-tr from-amber-400/30 via-yellow-300/40 to-transparent blur-md -z-10 animate-pulse" />

                <FancyLottoBall
                  number={currentRollingNumber}
                  size="lg"
                  isHighlighted={true}
                  animateSparkle={true}
                />

                <div className="mt-1 px-3 py-0.5 rounded-full bg-slate-950/90 border border-amber-400/80 text-[10px] font-bold text-amber-300 uppercase tracking-wider shadow-lg flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" />
                  <span>Ball #{activeBallIndex + 1} of 6</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Glass optical reflections and highlights */}
          <div className="absolute inset-0 rounded-full pointer-events-none border border-white/15" />
          <div className="absolute -top-12 left-10 w-52 h-28 bg-gradient-to-b from-white/25 to-transparent rounded-full transform -rotate-25 pointer-events-none blur-xs" />
          <div className="absolute bottom-4 right-8 w-28 h-14 bg-gradient-to-t from-white/10 to-transparent rounded-full transform rotate-15 pointer-events-none blur-xs" />
        </div>

        {/* Machine Pedestal / Base Stand */}
        <div className="w-80 sm:w-96 bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 rounded-b-2xl border-b border-x border-slate-700/80 p-5 flex flex-col items-center shadow-2xl relative z-10 -mt-2">
          {/* Status Message Screen / LED Display */}
          <div className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3.5 py-2 mb-4 flex items-center justify-between shadow-inner">
            <div className="flex items-center gap-2 overflow-hidden">
              <span
                className={`w-2 h-2 rounded-full shrink-0 ${
                  isDrawing ? 'bg-amber-400 animate-ping' : 'bg-emerald-500'
                }`}
              />
              <span className="font-mono-nums text-xs text-amber-400 font-semibold truncate tracking-wide">
                {statusMessage}
              </span>
            </div>
            <div className="text-[10px] text-slate-400 shrink-0 font-mono-nums ml-2">
              {drawnNumbers.length} / 6 BALLS
            </div>
          </div>

          {/* THE BIG RED ARCADE BUTTON */}
          <div className="relative flex flex-col items-center">
            {/* Operator Cat Hint Banner */}
            <div className="flex items-center gap-1.5 text-xs text-slate-300 mb-2">
              <span className="text-amber-400 font-bold">{activeCatInfo.name}</span>
              <span>will strike the button</span>
            </div>

            {/* Glowing Mechanical Arcade Push Button Housing */}
            <div className="relative p-3 rounded-full bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 border-4 border-slate-600 shadow-2xl">
              <button
                type="button"
                disabled={isDrawing || isPawPressing}
                onClick={onTriggerDraw}
                title={`Tap to have ${activeCatInfo.name} press the button and draw 6 fancy numbers!`}
                className={`group relative w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-b from-rose-500 via-red-600 to-red-800 flex flex-col items-center justify-center text-white font-bold transition-all duration-150 border-4 border-red-400/80 shadow-lg ${
                  isPawPressing
                    ? 'scale-90 translate-y-2 shadow-inner ring-4 ring-amber-400'
                    : 'hover:scale-105 active:scale-95'
                } ${isDrawing ? 'cursor-not-allowed opacity-90' : 'cursor-pointer animate-glow-button'}`}
              >
                {/* Surface Reflection Highlight */}
                <div className="absolute top-1.5 left-5 w-16 h-8 bg-gradient-to-b from-white/40 to-transparent rounded-full -rotate-12 pointer-events-none" />

                {/* Stamped Paw Icon */}
                <div className="w-10 h-10 mb-1 filter drop-shadow">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-white/90">
                    <circle cx="7" cy="8" r="2.2" />
                    <circle cx="12" cy="6" r="2.4" />
                    <circle cx="17" cy="8" r="2.2" />
                    <circle cx="4.5" cy="12.5" r="1.8" />
                    <circle cx="19.5" cy="12.5" r="1.8" />
                    <path d="M 12 11.5 C 9 11.5 6.5 13.5 6.5 16.5 C 6.5 19.5 9 21.5 12 21.5 C 15 21.5 17.5 19.5 17.5 16.5 C 17.5 13.5 15 11.5 12 11.5 Z" />
                  </svg>
                </div>

                {/* Button Action Text */}
                <span className="text-xs font-black tracking-wider uppercase drop-shadow-md text-center leading-tight">
                  {isDrawing ? 'DRAWING...' : 'PRESS BUTTON'}
                </span>
                <span className="text-[9px] font-medium text-red-200 tracking-tight">
                  {isDrawing ? 'Balls Tumbling' : 'DRAW 6 NUMBERS'}
                </span>
              </button>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-400">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>
              {activeCatInfo.name} pounces &amp; releases 6 gemstone lotto balls
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
