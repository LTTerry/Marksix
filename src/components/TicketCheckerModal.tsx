/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { X, Sparkles, Wand2, Award, CheckCircle2 } from 'lucide-react';
import { sounds } from '../utils/audio';
import { FancyLottoBall } from './FancyLottoBall';

interface TicketCheckerModalProps {
  isOpen: boolean;
  onClose: () => void;
  latestDraw: number[];
  maxNumber: number;
}

export const TicketCheckerModal: React.FC<TicketCheckerModalProps> = ({
  isOpen,
  onClose,
  latestDraw,
  maxNumber,
}) => {
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [hasEvaluated, setHasEvaluated] = useState(false);

  if (!isOpen) return null;

  const toggleNumber = (num: number) => {
    setHasEvaluated(false);
    if (selectedNumbers.includes(num)) {
      setSelectedNumbers(selectedNumbers.filter((n) => n !== num));
    } else {
      if (selectedNumbers.length < 6) {
        setSelectedNumbers([...selectedNumbers, num].sort((a, b) => a - b));
      }
    }
  };

  const handleQuickPick = () => {
    const picked: number[] = [];
    while (picked.length < 6) {
      const rand = Math.floor(Math.random() * maxNumber) + 1;
      if (!picked.includes(rand)) {
        picked.push(rand);
      }
    }
    picked.sort((a, b) => a - b);
    setSelectedNumbers(picked);
    setHasEvaluated(false);
    sounds.playPawPress();
  };

  const handleClear = () => {
    setSelectedNumbers([]);
    setHasEvaluated(false);
  };

  const handleCheckTicket = () => {
    if (selectedNumbers.length !== 6) return;
    setHasEvaluated(true);

    const matches = selectedNumbers.filter((n) => latestDraw.includes(n));
    if (matches.length >= 3) {
      sounds.playJackpotFanfare();
      confetti({
        particleCount: matches.length >= 5 ? 120 : 60,
        spread: 70,
        origin: { y: 0.6 },
      });
    } else {
      sounds.playCatMeow('milk');
    }
  };

  const matchedNumbers = selectedNumbers.filter((n) => latestDraw.includes(n));
  const matchCount = matchedNumbers.length;

  const getTierResult = () => {
    if (matchCount === 6) {
      return {
        title: 'GRAND 6/49 JACKPOT! 🏆',
        desc: 'Incredible! You matched all 6 numbers! Blue and Milk crown you the champion!',
        color: 'text-amber-400 bg-amber-950/80 border-amber-500',
      };
    }
    if (matchCount === 5) {
      return {
        title: '2nd Tier Winner! (5 of 6 Matches)',
        desc: 'Phenomenal luck! 5 out of 6 winning numbers hit!',
        color: 'text-emerald-400 bg-emerald-950/80 border-emerald-500',
      };
    }
    if (matchCount === 4) {
      return {
        title: '3rd Tier Prize! (4 of 6 Matches)',
        desc: 'Great picks! 4 numbers matched the cat draw!',
        color: 'text-sky-400 bg-sky-950/80 border-sky-500',
      };
    }
    if (matchCount === 3) {
      return {
        title: 'Lucky Consolation! (3 of 6 Matches)',
        desc: '3 matches! Free treats and extra good luck on the next tumble!',
        color: 'text-amber-300 bg-amber-950/50 border-amber-600',
      };
    }
    return {
      title: `${matchCount} Matches`,
      desc: 'No major prize this time, but Blue and Milk are ready to draw again for you!',
      color: 'text-slate-300 bg-slate-900 border-slate-700',
    };
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-bold text-white">Check Your 6 Numbers</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Compare Against Draw Box */}
          <div className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-xl">
            <div className="text-xs text-slate-400 font-medium mb-2 flex items-center justify-between">
              <span>LATEST 6-BALL DRAW RESULT:</span>
              <span className="font-mono-nums text-amber-400">
                {latestDraw.length === 6 ? '6 Balls Drawn' : 'Draw in progress...'}
              </span>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {latestDraw.length > 0 ? (
                latestDraw.map((n) => (
                  <FancyLottoBall
                    key={n}
                    number={n}
                    size="sm"
                    showPawWatermark={false}
                  />
                ))
              ) : (
                <span className="text-xs text-slate-400 italic">
                  Press the big button to draw 6 numbers first!
                </span>
              )}
            </div>
          </div>

          {/* User's Selected Ticket Numbers */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Your Ticket ({selectedNumbers.length}/6 Selected)
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleQuickPick}
                  className="flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 font-medium px-2 py-0.5 rounded bg-amber-950/40 border border-amber-800/60"
                >
                  <Wand2 className="w-3 h-3" />
                  Quick Pick 6
                </button>
                {selectedNumbers.length > 0 && (
                  <button
                    type="button"
                    onClick={handleClear}
                    className="text-xs text-slate-400 hover:text-slate-200"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Display Selected Badges */}
            <div className="min-h-14 p-3 bg-slate-950/90 border border-slate-800 rounded-xl flex items-center gap-2.5 flex-wrap">
              {selectedNumbers.length === 0 ? (
                <span className="text-xs text-slate-400 italic">
                  Select 6 numbers from the 1–49 grid below or tap Quick Pick 6
                </span>
              ) : (
                selectedNumbers.map((num) => {
                  const isMatch = latestDraw.includes(num);
                  return (
                    <div key={num} className="relative">
                      <FancyLottoBall
                        number={num}
                        size="sm"
                        isHighlighted={hasEvaluated && isMatch}
                        animateSparkle={hasEvaluated && isMatch}
                      />
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Number Selector Grid 1 to 49 */}
          <div>
            <div className="text-xs text-slate-400 mb-2">
              Select 6 non-duplicate numbers between 1 and 49:
            </div>
            <div className="grid grid-cols-7 sm:grid-cols-10 gap-1.5 max-h-48 overflow-y-auto p-1 bg-slate-950/40 rounded-xl border border-slate-800/60">
              {Array.from({ length: 49 }).map((_, i) => {
                const num = i + 1;
                const isSelected = selectedNumbers.includes(num);
                return (
                  <button
                    key={num}
                    type="button"
                    onClick={() => toggleNumber(num)}
                    className={`h-8 rounded-lg font-mono-nums text-xs font-semibold transition-all ${
                      isSelected
                        ? 'bg-amber-500 text-slate-950 font-bold scale-95 shadow-sm'
                        : 'bg-slate-800/70 hover:bg-slate-700 text-slate-300'
                    }`}
                  >
                    {num}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Evaluation Result Box */}
          {hasEvaluated && (
            <div className={`p-4 rounded-xl border ${getTierResult().color}`}>
              <div className="flex items-center gap-2 font-bold text-sm">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{getTierResult().title}</span>
              </div>
              <p className="text-xs mt-1 leading-relaxed opacity-90">
                {getTierResult().desc}
              </p>
              <div className="mt-2 text-xs font-medium">
                Matched numbers: {matchedNumbers.length > 0 ? matchedNumbers.join(', ') : 'None'}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-3.5 border-t border-slate-800 bg-slate-950/70">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-medium text-slate-300 hover:bg-slate-800 transition-colors"
          >
            Close
          </button>
          <button
            type="button"
            disabled={selectedNumbers.length !== 6 || latestDraw.length !== 6}
            onClick={handleCheckTicket}
            className={`px-5 py-2 rounded-lg text-xs font-bold transition-all shadow-md flex items-center gap-1.5 ${
              selectedNumbers.length === 6 && latestDraw.length === 6
                ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 cursor-pointer active:scale-95'
                : 'bg-slate-800 text-slate-400 cursor-not-allowed'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Verify Ticket (6/6)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
