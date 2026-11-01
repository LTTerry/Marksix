/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Volume2,
  VolumeX,
  Ticket,
  Cat,
  Sparkles,
  Code2,
  Github,
} from 'lucide-react';
import { CatId, DrawRecord, LotteryConfig } from './types';
import { CAT_PROFILES } from './utils/constants';
import { sounds } from './utils/audio';
import { CatOperatorCard } from './components/CatOperatorCard';
import { LotteryMachine } from './components/LotteryMachine';
import { ResultsRack } from './components/ResultsRack';
import { TicketCheckerModal } from './components/TicketCheckerModal';
import { DrawHistory } from './components/DrawHistory';
import { EmbedModal } from './components/EmbedModal';

export default function App() {
  const [operatorCat, setOperatorCat] = useState<CatId>('blue');
  const [lotteryConfig] = useState<LotteryConfig>({
    gameMode: '6/49',
    minNumber: 1,
    maxNumber: 49,
    drawCount: 6,
    allowDuplicates: false,
    drawSpeed: 'normal',
  });

  const [isDrawing, setIsDrawing] = useState(false);
  const [isPawPressing, setIsPawPressing] = useState(false);
  const [drawnNumbers, setDrawnNumbers] = useState<number[]>([]);
  const [activeBallIndex, setActiveBallIndex] = useState(0);
  const [currentRollingNumber, setCurrentRollingNumber] = useState<number | null>(null);
  const [statusMessage, setStatusMessage] = useState('Blue and Milk are ready. Tap the button to start!');
  const [isMuted, setIsMuted] = useState(false);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [isEmbedModalOpen, setIsEmbedModalOpen] = useState(false);
  const [history, setHistory] = useState<DrawRecord[]>([]);

  const tumblingAudioInterval = useRef<number | null>(null);

  // Active cat info (Blue or Milk)
  const activeCatInfo = CAT_PROFILES[operatorCat];

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (tumblingAudioInterval.current) {
        window.clearInterval(tumblingAudioInterval.current);
      }
    };
  }, []);

  const toggleSound = () => {
    const muted = sounds.toggleMute();
    setIsMuted(muted);
  };

  // Perform the 6 non-duplicate numbers draw sequence triggered by the animated cat
  const triggerDraw = async () => {
    if (isDrawing || isPawPressing) return;

    // Reset current board
    setDrawnNumbers([]);
    setCurrentRollingNumber(null);
    setIsPawPressing(true);

    // 1. Cat leaps and prepares strike
    sounds.playCatMeow(operatorCat);
    setStatusMessage(`${activeCatInfo.name} is springing forward to press the button!`);

    // 2. Mechanical button impact sound as the cat hits the button
    setTimeout(() => {
      sounds.playPawPress();
      setStatusMessage(`${activeCatInfo.name} slammed the big button! Tumbler spinning!`);
    }, 480);

    // 3. Cat rebounds to perch, tumbler activates, sequential extraction begins
    setTimeout(() => {
      setIsPawPressing(false);
      setIsDrawing(true);
      executeBallExtraction();
    }, 1100);
  };

  const executeBallExtraction = () => {
    // Generate exactly 6 NON-DUPLICATE numbers strictly within 1 to 49
    const pool = Array.from({ length: 49 }, (_, i) => i + 1);
    const chosen6: number[] = [];

    while (chosen6.length < 6) {
      const idx = Math.floor(Math.random() * pool.length);
      chosen6.push(pool.splice(idx, 1)[0]);
    }

    // Start gentle tumbling audio clicks
    tumblingAudioInterval.current = window.setInterval(() => {
      sounds.playTumblerClick();
    }, 180);

    const speedDelay = 950;
    let currentStep = 0;
    const collected: number[] = [];

    const drawNext = () => {
      if (currentStep < 6) {
        const nextNum = chosen6[currentStep];
        setActiveBallIndex(currentStep);
        setCurrentRollingNumber(nextNum);
        sounds.playBallReveal(currentStep);

        setStatusMessage(
          `${activeCatInfo.name} pulled Ball #${currentStep + 1}: ${nextNum}! (${6 - currentStep - 1} remaining)`
        );

        collected.push(nextNum);
        setDrawnNumbers([...collected]);

        currentStep++;
        setTimeout(drawNext, speedDelay);
      } else {
        // All 6 balls drawn!
        if (tumblingAudioInterval.current) {
          window.clearInterval(tumblingAudioInterval.current);
          tumblingAudioInterval.current = null;
        }

        setIsDrawing(false);
        setCurrentRollingNumber(null);
        sounds.playJackpotFanfare();
        setStatusMessage('All 6 winning numbers locked in! Check your ticket below.');

        // Blast celebratory confetti
        confetti({
          particleCount: 80,
          spread: 75,
          origin: { y: 0.55 },
        });

        // Record to session history
        const newRecord: DrawRecord = {
          id: `${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          roundNumber: history.length + 1,
          timestamp: new Date(),
          numbers: [...collected],
          operatorCat,
          gameMode: '6/49',
          maxNumber: 49,
        };

        setHistory((prev) => [newRecord, ...prev]);
      }
    };

    // First ball starts after a brief suspenseful delay
    setTimeout(drawNext, 700);
  };

  const handleClearHistory = () => {
    setHistory([]);
    sounds.playPawPress();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* 1. Top Navigation Bar */}
      <header className="w-full border-b border-slate-800 bg-slate-950/90 backdrop-blur-md sticky top-0 z-30 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-2.5 whitespace-nowrap shrink-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center text-slate-950 shadow-md">
            <Cat className="w-5 h-5" />
          </div>
          <span className="text-lg font-bold tracking-tight text-white font-display">
            Feline Lotto 6 / 49
          </span>
        </div>

        {/* Zone 2: Navigation / Info */}
        <div className="hidden md:flex items-center gap-2 text-xs font-medium text-slate-400">
          <span>6 Non-Duplicate Numbers</span>
          <span aria-hidden="true">·</span>
          <span>Range: 1 to 49</span>
          <span aria-hidden="true">·</span>
          <span className="text-amber-400 font-semibold">Starring Blue &amp; Milk</span>
        </div>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={toggleSound}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            title={isMuted ? 'Unmute Sound FX' : 'Mute Sound FX'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>

          <button
            type="button"
            onClick={() => setIsEmbedModalOpen(true)}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 hover:text-white transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 shadow-sm"
            title="Get embed link, GitHub README badge, or GitHub Pages code"
          >
            <Github className="w-3.5 h-3.5 text-amber-400" />
            <span>Embed / GitHub</span>
          </button>

          <button
            type="button"
            onClick={() => setIsTicketModalOpen(true)}
            className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 shadow-sm"
          >
            <Ticket className="w-3.5 h-3.5" />
            <span>Check My 6 Numbers</span>
          </button>
        </div>
      </header>

      {/* Main Game Stage */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col items-center">
        {/* Header */}
        <div className="text-center max-w-2xl mb-6">
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight font-display text-balance">
            6-Number Cat Lottery Draw
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Watch <strong className="text-white">Blue</strong> (grey cat) and <strong className="text-white">Milk</strong> (cream cat) jump in and press the button of the machine to draw 6 non-duplicate numbers from 1 to 49.
          </p>
        </div>

        {/* Cat Operators Selection Row: Blue and Milk */}
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <CatOperatorCard
            cat={CAT_PROFILES.blue}
            isActive={operatorCat === 'blue'}
            isDrawing={isDrawing}
            onSelect={(id) => {
              if (isDrawing) return;
              setOperatorCat(id);
              sounds.playCatMeow('blue');
              setStatusMessage('Blue assigned to press the button!');
            }}
          />
          <CatOperatorCard
            cat={CAT_PROFILES.milk}
            isActive={operatorCat === 'milk'}
            isDrawing={isDrawing}
            onSelect={(id) => {
              if (isDrawing) return;
              setOperatorCat(id);
              sounds.playCatMeow('milk');
              setStatusMessage('Milk assigned to press the button!');
            }}
          />
        </div>

        {/* The Physical Lottery Tumbler Machine with Animated Cat Jumping & Button Press */}
        <LotteryMachine
          isDrawing={isDrawing}
          isPawPressing={isPawPressing}
          drawnNumbers={drawnNumbers}
          activeBallIndex={activeBallIndex}
          currentRollingNumber={currentRollingNumber}
          operatorCat={operatorCat}
          activeCatInfo={activeCatInfo}
          onTriggerDraw={triggerDraw}
          statusMessage={statusMessage}
        />

        {/* Results Rack with 6 Drawn Numbers */}
        <ResultsRack
          drawnNumbers={drawnNumbers}
          isDrawing={isDrawing}
          onOpenTicketChecker={() => setIsTicketModalOpen(true)}
          maxNumber={49}
        />

        {/* Draw History and Number Frequency Analytics */}
        <DrawHistory
          records={history}
          onClearHistory={handleClearHistory}
          maxNumber={49}
        />
      </main>

      {/* Ticket Verification Modal */}
      <TicketCheckerModal
        isOpen={isTicketModalOpen}
        onClose={() => setIsTicketModalOpen(false)}
        latestDraw={drawnNumbers}
        maxNumber={49}
      />

      {/* Google Sites Embed Modal */}
      <EmbedModal
        isOpen={isEmbedModalOpen}
        onClose={() => setIsEmbedModalOpen(false)}
        appUrl={
          typeof window !== 'undefined' && window.location.origin.includes('run.app')
            ? window.location.href
            : 'https://ais-pre-eqhj2bgeehexiojaj52u3r-398961891283.asia-northeast1.run.app'
        }
      />

      {/* Footer */}
      <footer className="w-full border-t border-slate-900 bg-slate-950 py-5 text-center text-xs text-slate-400">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            Feline Lotto 6/49 &copy; 2026 · Starring Blue &amp; Milk
          </span>
          <span className="text-[11px] text-slate-400">
            Guaranteed 6 Unique Numbers from Pool of 1 to 49
          </span>
        </div>
      </footer>
    </div>
  );
}
