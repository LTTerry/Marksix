/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CatInfo } from '../types';

export const CAT_PROFILES: Record<'blue' | 'milk', CatInfo> = {
  blue: {
    id: 'blue',
    name: 'Blue',
    breed: 'British Shorthair (Silver / Grey Shaded)',
    role: 'Chief Button Operator',
    furTone: 'grey',
    image: '/assets/aistudio/WhatsApp_Image_2026-09-28_at_19.21.35_30fef511.jpeg',
    personality: 'Laser-eyed grey beauty. Perches attentively and strikes the button with surgical precision.',
    luckyQuote: 'Calculating the 6 luckiest non-duplicate numbers from 1 to 49!',
  },
  milk: {
    id: 'milk',
    name: 'Milk',
    breed: 'Exotic Shorthair (Cream / Ginger Tabby)',
    role: 'Master Tumbler Slapper',
    furTone: 'cream',
    image: '/assets/aistudio/IMG_3187.JPG_a400102b.jpeg',
    personality: 'Chubby cheeks with a delicate bell collar. Slams the button with royal fluffy paw energy.',
    luckyQuote: 'Full-body pounce activated for the 6 winning lottery balls!',
  },
};

export interface BallTheme {
  name: string;
  sphereBg: string;
  stripeColor: string;
  glowColor: string;
  rimColor: string;
  textColor: string;
  sparkleColor: string;
}

export const LUXURY_BALL_PALETTES: BallTheme[] = [
  {
    name: 'Imperial Gold',
    sphereBg: 'radial-gradient(circle at 35% 30%, #FFE57F 0%, #F59E0B 45%, #B45309 85%, #78350F 100%)',
    stripeColor: 'rgba(254, 240, 138, 0.45)',
    glowColor: 'rgba(245, 158, 11, 0.6)',
    rimColor: '#FDE047',
    textColor: '#78350F',
    sparkleColor: '#FEF08A',
  },
  {
    name: 'Ruby Royale',
    sphereBg: 'radial-gradient(circle at 35% 30%, #FDA4AF 0%, #E11D48 45%, #9F1239 85%, #4C0519 100%)',
    stripeColor: 'rgba(254, 205, 211, 0.45)',
    glowColor: 'rgba(225, 29, 72, 0.6)',
    rimColor: '#FECDD3',
    textColor: '#881337',
    sparkleColor: '#FFE4E6',
  },
  {
    name: 'Sapphire Star',
    sphereBg: 'radial-gradient(circle at 35% 30%, #7DD3FC 0%, #0284C7 45%, #0369A1 85%, #082F49 100%)',
    stripeColor: 'rgba(186, 230, 253, 0.45)',
    glowColor: 'rgba(2, 132, 199, 0.6)',
    rimColor: '#BAE6FD',
    textColor: '#075985',
    sparkleColor: '#E0F2FE',
  },
  {
    name: 'Emerald Fortune',
    sphereBg: 'radial-gradient(circle at 35% 30%, #6EE7B7 0%, #059669 45%, #047857 85%, #022C22 100%)',
    stripeColor: 'rgba(167, 243, 208, 0.45)',
    glowColor: 'rgba(5, 150, 105, 0.6)',
    rimColor: '#A7F3D0',
    textColor: '#065F46',
    sparkleColor: '#D1FAE5',
  },
  {
    name: 'Amethyst Crown',
    sphereBg: 'radial-gradient(circle at 35% 30%, #D8B4FE 0%, #9333EA 45%, #6B21A8 85%, #3B0764 100%)',
    stripeColor: 'rgba(233, 213, 255, 0.45)',
    glowColor: 'rgba(147, 51, 234, 0.6)',
    rimColor: '#E9D5FF',
    textColor: '#581C87',
    sparkleColor: '#F3E8FF',
  },
  {
    name: 'Solar Topaz',
    sphereBg: 'radial-gradient(circle at 35% 30%, #FDBA74 0%, #EA580C 45%, #C2410C 85%, #7C2D12 100%)',
    stripeColor: 'rgba(254, 215, 170, 0.45)',
    glowColor: 'rgba(234, 88, 12, 0.6)',
    rimColor: '#FED7AA',
    textColor: '#9A3412',
    sparkleColor: '#FFEDD5',
  },
  {
    name: 'Diamond Ice',
    sphereBg: 'radial-gradient(circle at 35% 30%, #A5F3FC 0%, #0891B2 45%, #0E7490 85%, #164E63 100%)',
    stripeColor: 'rgba(207, 250, 254, 0.5)',
    glowColor: 'rgba(8, 145, 178, 0.6)',
    rimColor: '#CFFAFE',
    textColor: '#155E75',
    sparkleColor: '#ECFEFF',
  },
];

export function getFancyBallTheme(num: number): BallTheme {
  const index = (num - 1) % LUXURY_BALL_PALETTES.length;
  return LUXURY_BALL_PALETTES[index];
}
