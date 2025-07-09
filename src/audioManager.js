class AudioManager {
  constructor() {
    this.ambientMusic = null;
    this.crashSounds = [];
    this.audioContext = null;
    this.isInitialized = false;
    this.isMusicPlaying = false;
  }

  async initialize() {
    try {
      // Create audio context
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      
      // Create ambient music (using Web Audio API oscillators for a retro game feel)
      this.createAmbientMusic();
      
      // Create crash sound effects
      this.createCrashSounds();
      
      this.isInitialized = true;
      console.log('Audio Manager initialized successfully');
    } catch (error) {
      console.warn('Audio initialization failed:', error);
    }
  }

  createAmbientMusic() {
    // Create a simple ambient loop using oscillators
    this.ambientMusic = {
      oscillators: [],
      gainNodes: [],
      isPlaying: false
    };
  }

  createCrashSounds() {
    // Create 3 different crash sound effects using different frequencies
    for (let i = 0; i < 3; i++) {
      this.crashSounds.push({
        type: 'crash',
        index: i
      });
    }
  }

  startAmbientMusic() {
    // COMMENTED OUT: Ambient music temporarily disabled
    // if (!this.isInitialized || this.isMusicPlaying) return;

    // try {
    //   // Resume audio context if suspended (required for browser autoplay policies)
    //   if (this.audioContext.state === 'suspended') {
    //     this.audioContext.resume();
    //   }

    //   // Create a simple ambient melody
    //   this.playAmbientLoop();
    //   this.isMusicPlaying = true;
    // } catch (error) {
    //   console.warn('Failed to start ambient music:', error);
    // }
  }

  stopAmbientMusic() {
    // COMMENTED OUT: Ambient music temporarily disabled
    // if (!this.isInitialized || !this.isMusicPlaying) return;

    // try {
    //   // Stop all oscillators
    //   this.ambientMusic.oscillators.forEach(osc => {
    //     try {
    //       osc.stop();
    //     } catch (e) {
    //       // Oscillator might already be stopped
    //     }
    //   });
      
    //   this.ambientMusic.oscillators = [];
    //   this.ambientMusic.gainNodes = [];
    //   this.isMusicPlaying = false;
    // } catch (error) {
    //   console.warn('Failed to stop ambient music:', error);
    // }
  }

  playAmbientLoop() {
    // COMMENTED OUT: Ambient music temporarily disabled
    return;
    
    /*
    if (!this.audioContext) return;

    // Create a more vibrant and pleasant chord progression
    // Using a I-vi-IV-V progression in C major (C-Am-F-G) which is very pleasing
    const chordProgression = [
      // C major chord (C-E-G)
      { 
        chord: [261.63, 329.63, 392.00], // C4, E4, G4
        bass: 130.81, // C3
        duration: 3,
        melody: [523.25, 587.33, 659.25] // C5, D5, E5
      },
      // A minor chord (A-C-E)
      { 
        chord: [220.00, 261.63, 329.63], // A3, C4, E4
        bass: 110.00, // A2
        duration: 3,
        melody: [440.00, 493.88, 523.25] // A4, B4, C5
      },
      // F major chord (F-A-C)
      { 
        chord: [174.61, 220.00, 261.63], // F3, A3, C4
        bass: 87.31, // F2
        duration: 3,
        melody: [349.23, 392.00, 440.00] // F4, G4, A4
      },
      // G major chord (G-B-D)
      { 
        chord: [196.00, 246.94, 293.66], // G3, B3, D4
        bass: 98.00, // G2
        duration: 3,
        melody: [392.00, 440.00, 493.88] // G4, A4, B4
      }
    ];

    let startTime = this.audioContext.currentTime;
    const totalDuration = chordProgression.reduce((sum, chord) => sum + chord.duration, 0);

    chordProgression.forEach((chordData, chordIndex) => {
      // Create bass line
      this.createBassNote(chordData.bass, startTime, chordData.duration);

      // Create chord harmony
      chordData.chord.forEach((freq, noteIndex) => {
        this.createHarmonyNote(freq, startTime, chordData.duration, noteIndex);
      });

      // Create melody line with subtle variations
      this.createMelodyLine(chordData.melody, startTime, chordData.duration, chordIndex);

      // Add ambient pad
      this.createAmbientPad(chordData.chord, startTime, chordData.duration);

      startTime += chordData.duration;
    });

    // Schedule next loop with slight tempo variation for organic feel
    const baseDelay = totalDuration * 1000;
    const tempoVariation = (Math.random() - 0.5) * 200; // ±100ms variation
    setTimeout(() => {
      if (this.isMusicPlaying) {
        this.playAmbientLoop();
      }
    }, baseDelay + tempoVariation);
    */
  }

  createBassNote(frequency, startTime, duration) {
    // COMMENTED OUT: Ambient music helper method temporarily disabled
    return;
    /*
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    const filterNode = this.audioContext.createBiquadFilter();

    // Bass processing chain
    oscillator.connect(filterNode);
    filterNode.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.setValueAtTime(frequency, startTime);
    oscillator.type = 'triangle'; // Warmer bass sound

    // Low-pass filter for bass
    filterNode.type = 'lowpass';
    filterNode.frequency.setValueAtTime(200, startTime);
    filterNode.Q.setValueAtTime(2, startTime);

    // Bass envelope
    gainNode.gain.setValueAtTime(0, startTime);
    gainNode.gain.linearRampToValueAtTime(0.15, startTime + 0.05);
    gainNode.gain.setValueAtTime(0.12, startTime + duration * 0.7);
    gainNode.gain.linearRampToValueAtTime(0, startTime + duration);

    oscillator.start(startTime);
    oscillator.stop(startTime + duration);

    this.ambientMusic.oscillators.push(oscillator);
    this.ambientMusic.gainNodes.push(gainNode);
    */
  }

  createHarmonyNote(frequency, startTime, duration, noteIndex) {
    // COMMENTED OUT: Ambient music helper method temporarily disabled
    return;
    /*
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    const filterNode = this.audioContext.createBiquadFilter();

    oscillator.connect(filterNode);
    filterNode.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.setValueAtTime(frequency, startTime);
    oscillator.type = 'sawtooth'; // Rich harmonics

    // Gentle filtering
    filterNode.type = 'lowpass';
    filterNode.frequency.setValueAtTime(2000 + noteIndex * 500, startTime);
    filterNode.Q.setValueAtTime(1, startTime);

    // Staggered entry for richness
    const delay = noteIndex * 0.1;
    const adjustedStart = startTime + delay;
    const adjustedDuration = duration - delay;

    // Harmony envelope
    gainNode.gain.setValueAtTime(0, adjustedStart);
    gainNode.gain.linearRampToValueAtTime(0.06, adjustedStart + 0.2);
    gainNode.gain.setValueAtTime(0.04, adjustedStart + adjustedDuration * 0.8);
    gainNode.gain.linearRampToValueAtTime(0, adjustedStart + adjustedDuration);

    oscillator.start(adjustedStart);
    oscillator.stop(adjustedStart + adjustedDuration);

    this.ambientMusic.oscillators.push(oscillator);
    this.ambientMusic.gainNodes.push(gainNode);
    */
  }

  createMelodyLine(melodyFreqs, startTime, duration, chordIndex) {
    // COMMENTED OUT: Ambient music helper method temporarily disabled
    return;
    /*
    const noteDuration = duration / melodyFreqs.length;
    
    melodyFreqs.forEach((freq, index) => {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      const filterNode = this.audioContext.createBiquadFilter();

      oscillator.connect(filterNode);
      filterNode.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      // Add slight detuning for organic feel
      const detune = (Math.random() - 0.5) * 2;
      oscillator.frequency.setValueAtTime(freq + detune, startTime);
      oscillator.type = 'sine'; // Pure tone for melody

      // Bright filter for melody
      filterNode.type = 'highpass';
      filterNode.frequency.setValueAtTime(100, startTime);
      filterNode.Q.setValueAtTime(0.5, startTime);

      const noteStart = startTime + index * noteDuration;
      const noteEnd = noteStart + noteDuration * 0.8; // Small gap between notes

      // Melody envelope with variation
      const volume = 0.08 + (Math.sin(chordIndex + index) * 0.02); // Subtle volume variation
      gainNode.gain.setValueAtTime(0, noteStart);
      gainNode.gain.linearRampToValueAtTime(volume, noteStart + 0.05);
      gainNode.gain.linearRampToValueAtTime(volume * 0.7, noteEnd - 0.1);
      gainNode.gain.linearRampToValueAtTime(0, noteEnd);

      oscillator.start(noteStart);
      oscillator.stop(noteEnd);

      this.ambientMusic.oscillators.push(oscillator);
      this.ambientMusic.gainNodes.push(gainNode);
    });
    */
  }

  createAmbientPad(chordFreqs, startTime, duration) {
    // COMMENTED OUT: Ambient music helper method temporarily disabled
    return;
    /*
    // Create a subtle ambient pad using multiple detuned oscillators for each note
    chordFreqs.forEach((baseFreq, index) => {
      for (let i = 0; i < 2; i++) {
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        const filterNode = this.audioContext.createBiquadFilter();

        oscillator.connect(filterNode);
        filterNode.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        // Slight detuning for chorus effect
        const detune = (i - 0.5) * 4;
        oscillator.frequency.setValueAtTime(baseFreq + detune, startTime);
        oscillator.type = 'triangle';

        // Gentle low-pass filtering
        filterNode.type = 'lowpass';
        filterNode.frequency.setValueAtTime(1000, startTime);
        filterNode.Q.setValueAtTime(0.7, startTime);

        // Very subtle pad volume
        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(0.02, startTime + 0.5);
        gainNode.gain.setValueAtTime(0.015, startTime + duration - 0.5);
        gainNode.gain.linearRampToValueAtTime(0, startTime + duration);

        oscillator.start(startTime);
        oscillator.stop(startTime + duration);

        this.ambientMusic.oscillators.push(oscillator);
        this.ambientMusic.gainNodes.push(gainNode);
      }
    });
    */
  }

  playCrashSound() {
    if (!this.isInitialized) return;

    try {
      // Resume audio context if suspended
      if (this.audioContext.state === 'suspended') {
        this.audioContext.resume();
      }

      // Select random crash sound (0, 1, or 2)
      const soundIndex = Math.floor(Math.random() * 3);
      this.playSpecificCrashSound(soundIndex);
    } catch (error) {
      console.warn('Failed to play crash sound:', error);
    }
  }

  playSpecificCrashSound(index) {
    if (!this.audioContext) return;

    const currentTime = this.audioContext.currentTime;
    
    // Create different crash sounds based on index
    const crashConfigs = [
      // Crash sound 1: Low frequency explosion
      {
        frequencies: [80, 120, 200],
        durations: [0.1, 0.15, 0.2],
        type: 'sawtooth'
      },
      // Crash sound 2: High frequency impact
      {
        frequencies: [400, 800, 1200],
        durations: [0.05, 0.1, 0.15],
        type: 'square'
      },
      // Crash sound 3: Mixed frequency crunch
      {
        frequencies: [150, 350, 600],
        durations: [0.08, 0.12, 0.18],
        type: 'triangle'
      }
    ];

    const config = crashConfigs[index];

    config.frequencies.forEach((freq, i) => {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      oscillator.frequency.setValueAtTime(freq, currentTime);
      oscillator.type = config.type;

      // Create crash envelope
      gainNode.gain.setValueAtTime(0, currentTime);
      gainNode.gain.linearRampToValueAtTime(0.3, currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.01, currentTime + config.durations[i]);

      oscillator.start(currentTime + i * 0.02);
      oscillator.stop(currentTime + config.durations[i]);
    });
  }

  playJumpSound() {
    if (!this.isInitialized) return;

    try {
      // Resume audio context if suspended
      if (this.audioContext.state === 'suspended') {
        this.audioContext.resume();
      }

      this.createMarioJumpSound();
    } catch (error) {
      console.warn('Failed to play jump sound:', error);
    }
  }

  createMarioJumpSound() {
    if (!this.audioContext) return;

    const currentTime = this.audioContext.currentTime;
    
    // Mario-style jump sound: quick frequency sweep upward
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    // Mario jump sound characteristics: starts low, sweeps up quickly
    oscillator.frequency.setValueAtTime(220, currentTime); // Start at A3
    oscillator.frequency.exponentialRampToValueAtTime(880, currentTime + 0.1); // Sweep up to A5
    oscillator.frequency.exponentialRampToValueAtTime(440, currentTime + 0.2); // Settle at A4

    oscillator.type = 'square'; // Square wave for that classic 8-bit sound

    // Quick attack, short sustain, fast decay
    gainNode.gain.setValueAtTime(0, currentTime);
    gainNode.gain.linearRampToValueAtTime(0.2, currentTime + 0.01); // Quick attack
    gainNode.gain.linearRampToValueAtTime(0.15, currentTime + 0.05); // Brief sustain
    gainNode.gain.exponentialRampToValueAtTime(0.01, currentTime + 0.2); // Fast decay

    oscillator.start(currentTime);
    oscillator.stop(currentTime + 0.2);
  }

  toggleMusic() {
    if (this.isMusicPlaying) {
      this.stopAmbientMusic();
    } else {
      this.startAmbientMusic();
    }
  }
}

// Create global audio manager instance
export const audioManager = new AudioManager();

// Initialize on first user interaction (required for browser autoplay policies)
let isAudioInitialized = false;

function initializeAudioOnInteraction() {
  if (!isAudioInitialized) {
    audioManager.initialize().then(() => {
      audioManager.startAmbientMusic();
    });
    isAudioInitialized = true;
    
    // Remove event listeners after initialization
    document.removeEventListener('click', initializeAudioOnInteraction);
    document.removeEventListener('keydown', initializeAudioOnInteraction);
    document.removeEventListener('touchstart', initializeAudioOnInteraction);
  }
}

// Add event listeners for user interaction
document.addEventListener('click', initializeAudioOnInteraction);
document.addEventListener('keydown', initializeAudioOnInteraction);
document.addEventListener('touchstart', initializeAudioOnInteraction);
