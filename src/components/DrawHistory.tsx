/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo } from 'react';
import { History, Trash2, Flame, Snowflake } from 'lucide-react';
import { DrawRecord } from '../types';
import { CAT_PROFILES } from '../utils/constants';
import { FancyLottoBall } from './FancyLottoBall';

interface DrawHistoryProps {
  records: DrawRecord[];
  onClearHistory: () => void;
  maxNumber: number;
}

export const DrawHistory: React.FC<DrawHistoryProps> = ({
  records,
  onClearHistory,
  maxNumber,
}) => {
  // Calculate hot (most frequent) and cold (least frequent) numbers
  const { hotNumbers, coldNumbers } = useMemo(() => {
    if (records.length === 0) return { hotNumbers: [], coldNumbers: [] };

    const freqMap: Record<number, number> = {};
    for (let i = 1; i <= maxNumber; i++) {
      freqMap[i] = 0;
    }

    records.forEach((r) => {
      r.numbers.forEach((n) => {
        freqMap[n] = (freqMap[n] || 0) + 1;
      });
    });

    const entries = Object.entries(freqMap).map(([num, count]) => ({
      num: Number(num),
      count,
    }));

    const sortedByCountDesc = [...entries].sort((a, b) => b.count - a.count);
    const sortedByCountAsc = [...entries].sort((a, b) => a.count - b.count);

    return {
      hotNumbers: sortedByCountDesc.slice(0, 5).filter((x) => x.count > 0),
      coldNumbers: sortedByCountAsc.slice(0, 5),
    };
  }, [records, maxNumber]);

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 bg-slate-900/60 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl backdrop-blur-sm">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <History className="w-5 h-5 text-amber-400" />
          <h2 className="text-lg font-bold text-white font-display">Draw Session History</h2>
          <span className="text-xs font-mono-nums text-slate-400">
            ({records.length} {records.length === 1 ? 'round' : 'rounds'})
          </span>
        </div>

        {records.length > 0 && (
          <button
            type="button"
            onClick={onClearHistory}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-rose-950/60 hover:text-rose-400 text-slate-400 text-xs font-medium transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear History</span>
          </button>
        )}
      </div>

      {/* Hot and Cold Number Analysis */}
      {records.length >= 2 && (
        <div className="my-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Hot Numbers */}
          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-amber-900/40 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-semibold text-amber-300">Hot Numbers:</span>
            </div>
            <div className="flex items-center gap-1.5">
              {hotNumbers.map((h) => (
                <FancyLottoBall
                  key={h.num}
                  number={h.num}
                  size="xs"
                  showPawWatermark={false}
                />
              ))}
            </div>
          </div>

          {/* Cold Numbers */}
          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-sky-900/40 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Snowflake className="w-4 h-4 text-sky-400" />
              <span className="text-xs font-semibold text-sky-300">Cold Numbers:</span>
            </div>
            <div className="flex items-center gap-1.5">
              {coldNumbers.map((c) => (
                <FancyLottoBall
                  key={c.num}
                  number={c.num}
                  size="xs"
                  showPawWatermark={false}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* History Log List */}
      <div className="mt-4">
        {records.length === 0 ? (
          <div className="py-10 text-center text-slate-400 text-xs">
            No previous draws yet. Tap &ldquo;PRESS BUTTON&rdquo; to trigger your first 6-number draw!
          </div>
        ) : (
          <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
            {records.map((rec) => {
              const operator = CAT_PROFILES[rec.operatorCat] || CAT_PROFILES.blue;

              return (
                <div
                  key={rec.id}
                  className="p-3 bg-slate-950/70 border border-slate-800/80 rounded-xl flex flex-wrap items-center justify-between gap-3 hover:border-slate-700 transition-colors"
                >
                  {/* Round & Cat Badge */}
                  <div className="flex items-center gap-2.5">
                    <img
                      src={operator.image}
                      alt={operator.name}
                      referrerPolicy="no-referrer"
                      className="w-8 h-8 rounded-full object-cover border border-amber-400/50 shrink-0 shadow-sm"
                    />
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-1.5">
                        <span>Round #{rec.roundNumber}</span>
                        <span className="text-[10px] text-amber-400/90 font-medium font-sans">
                          · {operator.name}
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono-nums">
                        {new Date(rec.timestamp).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                          second: '2-digit',
                        })}
                      </div>
                    </div>
                  </div>

                  {/* 6 Fancy Gemstone Numbers List */}
                  <div className="flex items-center gap-2 flex-wrap">
                    {rec.numbers.map((n, i) => (
                      <FancyLottoBall
                        key={i}
                        number={n}
                        size="xs"
                        showPawWatermark={false}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
