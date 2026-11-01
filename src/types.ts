/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type CatId = 'blue' | 'milk';

export interface CatInfo {
  id: CatId;
  name: string;
  breed: string;
  role: string;
  furTone: 'grey' | 'cream';
  image: string;
  personality: string;
  luckyQuote: string;
}

export interface LotteryConfig {
  gameMode: '6/49';
  minNumber: 1;
  maxNumber: 49;
  drawCount: 6;
  allowDuplicates: false;
  drawSpeed: 'dramatic' | 'normal' | 'turbo';
}

export interface DrawRecord {
  id: string;
  roundNumber: number;
  timestamp: Date;
  numbers: number[];
  operatorCat: CatId;
  gameMode: string;
  maxNumber: number;
}

export interface TicketMatchResult {
  ticketNumbers: number[];
  drawnNumbers: number[];
  matchedNumbers: number[];
  tier: string;
}
