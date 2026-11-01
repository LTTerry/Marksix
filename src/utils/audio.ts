/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Synthesized Web Audio API sound effects for zero-dependency, ultra-reliable audio feedback

class SoundEffects {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }

  // Realistic arcade button mechanical click + paw tap
  public playPawPress() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;

    // Heavy mechanical punch
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(35, now + 0.08);

    gain.gain.setValueAtTime(0.5, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.1);

    // Sparkle trigger ring
    const highOsc = this.ctx.createOscillator();
    const highGain = this.ctx.createGain();
    highOsc.type = 'sine';
    highOsc.frequency.setValueAtTime(780, now + 0.02);
    highOsc.frequency.exponentialRampToValueAtTime(1200, now + 0.08);
    highGain.gain.setValueAtTime(0.2, now + 0.02);
    highGain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

    highOsc.connect(highGain);
    highGain.connect(this.ctx.destination);
    highOsc.start(now + 0.02);
    highOsc.stop(now + 0.16);
  }

  // Cute cat meow sound
  public playCatMeow(variant: 'blue' | 'milk' | 'silver' | 'peach' = 'blue') {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    // Milk is slightly chubbier/sweeter pitch; Blue is sharp, alert and curious
    const isMilk = variant === 'milk' || variant === 'peach';
    const baseFreq = isMilk ? 390 : 490;
    const peakFreq = isMilk ? 640 : 780;
    const endFreq = isMilk ? 350 : 430;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.linearRampToValueAtTime(peakFreq, now + 0.14);
    osc.frequency.exponentialRampToValueAtTime(endFreq, now + 0.38);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.25, now + 0.07);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.42);
  }

  // Lottery ball pop-out sound with rising musical pitch based on ball index (0 to 6)
  public playBallReveal(ballIndex: number) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;

    // Pop sound
    const popOsc = this.ctx.createOscillator();
    const popGain = this.ctx.createGain();
    popOsc.type = 'triangle';
    popOsc.frequency.setValueAtTime(120, now);
    popOsc.frequency.exponentialRampToValueAtTime(500, now + 0.04);
    popGain.gain.setValueAtTime(0.35, now);
    popGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
    popOsc.connect(popGain);
    popGain.connect(this.ctx.destination);
    popOsc.start(now);
    popOsc.stop(now + 0.09);

    // Musical bell chime (Pentatonic scale: C5, D5, E5, G5, A5, C6, D6)
    const scale = [523.25, 587.33, 659.25, 783.99, 880.0, 1046.5, 1174.66];
    const pitch = scale[Math.min(ballIndex, scale.length - 1)];

    const chimeOsc = this.ctx.createOscillator();
    const chimeGain = this.ctx.createGain();
    chimeOsc.type = 'sine';
    chimeOsc.frequency.setValueAtTime(pitch, now + 0.03);

    chimeGain.gain.setValueAtTime(0.28, now + 0.03);
    chimeGain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

    chimeOsc.connect(chimeGain);
    chimeGain.connect(this.ctx.destination);
    chimeOsc.start(now + 0.03);
    chimeOsc.stop(now + 0.62);
  }

  // Machine tumbler blower noise / rattle
  public playTumblerClick() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(300 + Math.random() * 200, now);
    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.05);
  }

  // Victory fanfare after all 7 numbers are drawn
  public playJackpotFanfare() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const notes = [
      { f: 523.25, d: 0.12, offset: 0 },       // C5
      { f: 659.25, d: 0.12, offset: 0.12 },    // E5
      { f: 783.99, d: 0.12, offset: 0.24 },    // G5
      { f: 1046.5, d: 0.35, offset: 0.36 },    // C6
    ];

    const start = this.ctx.currentTime;
    notes.forEach((n) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(n.f, start + n.offset);
      gain.gain.setValueAtTime(0.3, start + n.offset);
      gain.gain.exponentialRampToValueAtTime(0.001, start + n.offset + n.d);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(start + n.offset);
      osc.stop(start + n.offset + n.d + 0.05);
    });
  }

  // Purr vibration
  public playPurr() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(45, now);
    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.52);
  }
}

export const sounds = new SoundEffects();
