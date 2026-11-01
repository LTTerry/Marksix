/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { getFancyBallTheme } from '../utils/constants';

interface FancyLottoBallProps {
  number: number;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  isHighlighted?: boolean;
  showPawWatermark?: boolean;
  animateSparkle?: boolean;
  className?: string;
}

export const FancyLottoBall: React.FC<FancyLottoBallProps> = ({
  number,
  size = 'md',
  isHighlighted = false,
  showPawWatermark = true,
  animateSparkle = false,
  className = '',
}) => {
  const theme = getFancyBallTheme(number);

  // Size configurations
  const sizeMap = {
    xs: {
      box: 'w-7 h-7 sm:w-8 sm:h-8',
      medallion: 'w-4 h-4 sm:w-4.5 sm:h-4.5',
      text: 'text-[10px] sm:text-xs',
      pawSize: 'w-1.5 h-1.5',
      underline: 'h-[1.5px] w-2.5',
    },
    sm: {
      box: 'w-8 h-8 sm:w-9 sm:h-9',
      medallion: 'w-5 h-5 sm:w-5.5 sm:h-5.5',
      text: 'text-xs sm:text-sm',
      pawSize: 'w-2 h-2',
      underline: 'h-[1.5px] w-3',
    },
    md: {
      box: 'w-14 h-14 sm:w-16 sm:h-16',
      medallion: 'w-8 h-8 sm:w-9.5 sm:h-9.5',
      text: 'text-base sm:text-xl',
      pawSize: 'w-3 h-3',
      underline: 'h-0.5 w-4',
    },
    lg: {
      box: 'w-20 h-20 sm:w-24 sm:h-24',
      medallion: 'w-11 h-11 sm:w-13 sm:h-13',
      text: 'text-2xl sm:text-3xl',
      pawSize: 'w-4 h-4',
      underline: 'h-0.5 w-6',
    },
    xl: {
      box: 'w-24 h-24 sm:w-28 sm:h-28',
      medallion: 'w-14 h-14 sm:w-16 sm:h-16',
      text: 'text-3xl sm:text-4xl',
      pawSize: 'w-5 h-5',
      underline: 'h-1 w-8',
    },
  };

  const currentSize = sizeMap[size];

  return (
    <div
      className={`relative rounded-full select-none shrink-0 group ${currentSize.box} ${className}`}
      style={{
        filter: isHighlighted
          ? `drop-shadow(0 0 14px ${theme.glowColor})`
          : 'drop-shadow(0 4px 8px rgba(0,0,0,0.45))',
      }}
    >
      {/* 3D Sphere Body with Gemstone Shading */}
      <div
        className="w-full h-full rounded-full lotto-ball-3d flex items-center justify-center relative overflow-hidden transition-transform duration-300 group-hover:scale-105"
        style={{
          background: theme.sphereBg,
        }}
      >
        {/* Curving Equator Racing Stripes */}
        <div
          className="absolute inset-x-0 h-[28%] pointer-events-none transform -rotate-12 opacity-85"
          style={{
            background: `linear-gradient(to bottom, transparent, ${theme.stripeColor} 30%, ${theme.stripeColor} 70%, transparent)`,
          }}
        />

        {/* Top Glare Specular Highlight (Optical Glass Shine) */}
        <div className="absolute top-1 left-2 w-[55%] h-[35%] rounded-full lotto-ball-glint pointer-events-none transform -rotate-25" />

        {/* Ambient Occlusion Bottom Shadow inside the sphere */}
        <div className="absolute inset-0 rounded-full pointer-events-none bg-gradient-to-t from-black/55 via-transparent to-transparent" />

        {/* Center Number Medallion (Mother-of-pearl porcelain disc with gold/gem ring) */}
        <div
          className={`relative z-10 rounded-full number-disk flex flex-col items-center justify-center border ${currentSize.medallion}`}
          style={{
            borderColor: theme.rimColor,
            boxShadow: `0 0 4px ${theme.glowColor}, inset 0 1px 2px rgba(0,0,0,0.25)`,
          }}
        >
          {/* Subtle Cat Paw Watermark */}
          {showPawWatermark && (size === 'md' || size === 'lg' || size === 'xl') && (
            <div className="absolute top-0.5 opacity-25 pointer-events-none">
              <svg viewBox="0 0 24 24" fill={theme.textColor} className={currentSize.pawSize}>
                <circle cx="7" cy="8" r="2.2" />
                <circle cx="12" cy="6" r="2.4" />
                <circle cx="17" cy="8" r="2.2" />
                <path d="M 12 11.5 C 9 11.5 6.5 13.5 6.5 16.5 C 6.5 19.5 9 21.5 12 21.5 C 15 21.5 17.5 19.5 17.5 16.5 C 17.5 13.5 15 11.5 12 11.5 Z" />
              </svg>
            </div>
          )}

          {/* Bold Numeral with Tabular Alignment */}
          <span
            className={`font-mono-nums font-black leading-none tracking-tighter ${currentSize.text}`}
            style={{ color: '#0F172A' }}
          >
            {number}
          </span>

          {/* Underline bar for 6, 9 and official lottery balls */}
          {(number === 6 || number === 9 || number === 16 || number === 19 || number === 26 || number === 29) && (
            <div
              className={`rounded-full mt-0.5 ${currentSize.underline}`}
              style={{ backgroundColor: theme.textColor }}
            />
          )}
        </div>

        {/* Outer Metallic Gold Rim Edge */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none border border-white/40"
          style={{
            boxShadow: `inset 0 0 6px ${theme.sparkleColor}`,
          }}
        />

        {/* Twinkling Star Sparkle for freshly drawn or highlighted balls */}
        {(animateSparkle || isHighlighted) && (
          <motion.div
            animate={{
              scale: [0.6, 1.3, 0.6],
              rotate: [0, 90, 180],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute top-1.5 right-2 text-white pointer-events-none z-20"
          >
            <Sparkles className="w-3.5 h-3.5 fill-white/80 text-amber-200" />
          </motion.div>
        )}
      </div>
    </div>
  );
};
