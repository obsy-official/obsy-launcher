/**
 * Plays a pleasant ambient startup chime using Web Audio API synthesis.
 */
export const playStartupSound = () => {
  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();

    const playNote = (
      freq: number,
      startTime: number,
      duration: number,
      volume = 0.08,
    ) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime + startTime);

      gain.gain.setValueAtTime(0, ctx.currentTime + startTime);
      gain.gain.linearRampToValueAtTime(
        volume,
        ctx.currentTime + startTime + 1.0,
      );
      gain.gain.setTargetAtTime(0, ctx.currentTime + startTime + 1.0, 1.5);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + startTime);
      osc.stop(ctx.currentTime + startTime + duration);
    };

    const baseVol = 0.08;
    playNote(261.63, 0, 6.0, baseVol); // C4 (Base)
    playNote(392.0, 0.2, 6.0, baseVol * 0.8); // G4
    playNote(493.88, 0.4, 6.0, baseVol * 0.7); // B4
    playNote(587.33, 0.6, 6.0, baseVol * 0.6); // D5
    playNote(783.99, 0.8, 6.0, baseVol * 0.4); // G5 (Shimmer)
  } catch (error) {
    console.error("Audio play failed:", error);
  }
};
