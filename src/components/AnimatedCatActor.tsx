/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CatId, CatInfo } from '../types';

interface AnimatedCatActorProps {
  operatorCat: CatId;
  catInfo: CatInfo;
  isPressing: boolean;
  isDrawing: boolean;
  onPet?: () => void;
}

export const AnimatedCatActor: React.FC<AnimatedCatActorProps> = ({
  operatorCat,
  catInfo,
  isPressing,
  isDrawing,
  onPet,
}) => {
  const isBlue = operatorCat === 'blue';
  const furColor = isBlue ? '#94A3B8' : '#FBBF24';
  const collarColor = isBlue ? '#38BDF8' : '#F43F5E';

  return (
    <div className="relative w-full flex flex-col items-center justify-center z-20 pointer-events-none">
      {/* 1. Perched Cat (visible when not in mid-air lunge) */}
      <motion.div
        animate={
          isPressing
            ? {
                y: [0, -18, 140, 150, 0],
                x: [0, isBlue ? -10 : 10, isBlue ? 5 : -5, 0],
                scale: [1, 1.08, 1.25, 1.2, 1],
                rotate: [0, isBlue ? -8 : 8, isBlue ? 12 : -12, 0],
              }
            : isDrawing
            ? {
                y: [-2, 3, -2],
                rotate: [-1.5, 1.5, -1.5],
                scale: [1, 1.02, 1],
              }
            : {
                y: [0, -4, 0],
                rotate: [-0.5, 0.5, -0.5],
              }
        }
        transition={
          isPressing
            ? {
                duration: 1.1,
                times: [0, 0.25, 0.5, 0.68, 1],
                ease: 'easeInOut',
              }
            : {
                repeat: Infinity,
                duration: isDrawing ? 0.8 : 2.5,
                ease: 'easeInOut',
              }
        }
        className="relative flex flex-col items-center pointer-events-auto cursor-pointer"
        onClick={onPet}
        title={`Click to pet ${catInfo.name}!`}
      >
        {/* Cat Speech Bubble when actively lunging / drawing */}
        <AnimatePresence>
          {isPressing && (
            <motion.div
              initial={{ scale: 0.3, y: 15, opacity: 0 }}
              animate={{ scale: [0.3, 1.15, 1], y: -25, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="absolute -top-12 z-50 whitespace-nowrap px-3.5 py-1.5 rounded-full bg-amber-400 text-slate-950 text-xs font-black shadow-xl border-2 border-yellow-200 flex items-center gap-1.5"
            >
              <span className="text-sm">🐾</span>
              <span>
                {isBlue ? 'BLUE: *BAP!* Lucky 6 Incoming!' : 'MILK: *SLAM!* Tumble the balls!'}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Real Cat Photo Cutout Actor with 3D Pop Collar & Name Badge */}
        <div className="relative group flex flex-col items-center">
          {/* Animated Ears Indicator Glow */}
          <div
            className={`absolute -top-1 w-28 h-6 rounded-t-full transition-opacity ${
              isDrawing ? 'opacity-80 bg-amber-400/30 blur-xs' : 'opacity-0'
            }`}
          />

          {/* Actual Cat Photo in high-fidelity rounded organic portrait */}
          <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full p-1 bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-600 shadow-2xl overflow-hidden border-2 border-amber-300/80">
            <img
              src={catInfo.image}
              alt={catInfo.name}
              referrerPolicy="no-referrer"
              className={`w-full h-full object-cover rounded-full transform transition-transform duration-300 ${
                isPressing ? 'scale-110' : 'group-hover:scale-105'
              }`}
            />
            {/* Glossy lighting overlay */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-t from-slate-950/40 via-transparent to-white/20 pointer-events-none" />
          </div>

          {/* Cat Paw reaching out in front when slamming */}
          <motion.div
            animate={
              isPressing
                ? {
                    y: [0, 40, 85, 90, 0],
                    scale: [0.8, 1.1, 1.4, 1.3, 0.8],
                    opacity: [0, 1, 1, 1, 0],
                  }
                : { opacity: 0 }
            }
            transition={{
              duration: 1.1,
              times: [0, 0.25, 0.5, 0.65, 1],
            }}
            className="absolute bottom-2 z-40 pointer-events-none flex flex-col items-center"
          >
            {/* Fluffy Cat Paw SVG with actual fur tone of Blue or Milk */}
            <div className="w-16 h-20 filter drop-shadow-xl">
              <svg viewBox="0 0 80 100" fill="none" className="w-full h-full">
                {/* Arm extension */}
                <path
                  d="M 25 0 C 25 30 15 50 15 75 C 15 90 28 98 42 98 C 58 98 68 88 68 72 C 68 45 55 20 55 0 Z"
                  fill={furColor}
                />
                {/* Toe pads (Beans) */}
                <ellipse cx="28" cy="85" rx="6" ry="6" fill="#FB7185" />
                <ellipse cx="42" cy="88" rx="7" ry="7" fill="#FB7185" />
                <ellipse cx="56" cy="85" rx="6" ry="6" fill="#FB7185" />
                <ellipse cx="42" cy="74" rx="10" ry="7" fill="#F43F5E" />
              </svg>
            </div>
          </motion.div>

          {/* Name Tag & Status Ribbon */}
          <div className="mt-2 flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-700 shadow-md">
            <span
              className={`w-2 h-2 rounded-full ${
                isDrawing ? 'bg-amber-400 animate-ping' : 'bg-emerald-400'
              }`}
            />
            <span className="text-xs font-bold text-white tracking-wide">
              {catInfo.name}
            </span>
            <span className="text-[10px] text-amber-400 font-medium">
              ({isBlue ? 'Grey Shorthair' : 'Cream Exotic'})
            </span>
          </div>
        </div>

        {/* Impact Shockwave on Button strike */}
        {isPressing && (
          <motion.div
            initial={{ scale: 0.2, opacity: 0 }}
            animate={{ scale: [0.2, 1.6, 2.2], opacity: [0, 0.85, 0] }}
            transition={{ delay: 0.48, duration: 0.45 }}
            className="absolute bottom-[-130px] w-36 h-36 rounded-full border-4 border-amber-400 bg-amber-400/20 blur-[1px] pointer-events-none"
          />
        )}
      </motion.div>
    </div>
  );
};
