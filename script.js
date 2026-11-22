/* ==========================================================================
   BILAL & WARISHA — 2ND ANNIVERSARY (23 NOVEMBER 2026)
   MASTER JAVASCRIPT CONTROLLER (11 DEDICATED SCREENS)
   ========================================================================== */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. CONFIGURATION & STATE
  // --------------------------------------------------------------------------
  const CONFIG = {
    CORRECT_PIN: '0415', // Secret 4-Digit Anniversary PIN
    FALLBACK_PINS: ['2311', '2026', '1123', '0000', '2326'],
    TYPEWRITER_SPEED: 26 // ms per char for fluid personal handwriting feel
  };

  const STATE = {
    currentScreen: 1,
    enteredPin: '',
    musicStarted: false,
    albumIndex: 0,
    envelopeOpened: false,
    letterTyped: false,
    balloonsPopped: new Set(),
    loveAnswers: ['', '', '', '', ''],
    loveIndex: 0,
    funnyAnswers: [null, null, null, null, null],
    funnyIndex: 0,
    activeQuizTab: 'love',
    candlesLit: false,
    candlesBlown: false,
    cakeCut: false,
    audioContext: null
  };

  // --------------------------------------------------------------------------
  // 2. ALBUM MEMORIES DATA (12 Distinct Teddy Bear Cute Illustrations)
  // --------------------------------------------------------------------------
  const MEMORIES = [
    {
      id: 1,
      image: 'assets/memories/memory_01.jpg',
      emoji: '📱',
      title: 'Instagram Par Pehli Mulaqat',
      tag: 'Memory 01 of 12',
      date: 'Pehla Raabta',
      desc: 'Woh ek aam sa din tha jab Instagram par pehli dafa aap se baat hui, aur mujhe kya pata tha ke ye choti si guftagu meri poori zindagi ko itna khoobsurat bana degi.'
    },
    {
      id: 2,
      image: 'assets/memories/memory_02.jpg',
      emoji: '🖼️',
      title: 'Pehli Pic',
      tag: 'Memory 02 of 12',
      date: 'Pehli Jhalak',
      desc: 'Jab aapki pehli pic dekhi, dil tham sa gaya tha. Woh muskurahat aur woh masoomiyat aaj bhi mere dil par raj karti hai.'
    },
    {
      id: 3,
      image: 'assets/memories/memory_03.jpg',
      emoji: '🤝',
      title: 'Pehli Dafa Haath Thamna',
      tag: 'Memory 03 of 12',
      date: 'Pehla Ehsaas',
      desc: 'Jab pehli baar aapka narm haath mere haath me aaya, poori duniya ka sukoon mujhe mehsoos hua. Laga tha waqt wahin rook gaya.'
    },
    {
      id: 4,
      image: 'assets/memories/memory_04.jpg',
      emoji: '🍫',
      title: 'Pehli Bar Chocolate Khilai Thi',
      tag: 'Memory 04 of 12',
      date: 'Meetha Pal',
      desc: 'Woh pehli bar aapne mujhe apne hathon se chocolate khilai thi, mere liye sirf ek mamuli chocolate nahi balki wo itna meetha pal mere liye sone se bhi zyada qeemti tha.'
    },
    {
      id: 5,
      image: 'assets/memories/memory_05.jpg',
      emoji: '🤗',
      title: 'Pehli Huggg',
      tag: 'Memory 05 of 12',
      date: 'Sukoon Ka Aashiyana',
      desc: 'Pehla hug bohot sari mohabbat, bohot saray emotions, aur bohot saray sukoon se bhara hua tha. Us lamhe me meri poori duniya tham gayi thi.'
    },
    {
      id: 6,
      image: 'assets/memories/memory_06.jpg',
      emoji: '💋',
      title: 'Pehli Forehead Kiss',
      tag: 'Memory 06 of 12',
      date: 'Izzat Ka Rishta',
      desc: 'Jab aapke forehead par kiss ki, dil me ek hi dua thi ke Allah aap se mera ye pak rishta hamesha qayam rakhe. Aap meri izzat aur meri jaan hain.'
    },
    {
      id: 7,
      image: 'assets/memories/memory_07.jpg',
      emoji: '😘',
      title: 'Pehli Cheek Kiss',
      tag: 'Memory 07 of 12',
      date: 'Meethi Sharat',
      desc: 'Jab aapne pehli baar mere cheek par kiss ki, dil me laddoo phoot rahe the. Hamari game me shart thi ke jo haara wo kiss karega, aur maine aapko jaan boojh kar game me phasa kar hara diya tha.'
    },
    {
      id: 8,
      image: 'assets/memories/memory_08.jpg',
      emoji: '🌹',
      title: 'Pehli Neck Kiss',
      tag: 'Memory 08 of 12',
      date: 'Khushboo-e-Jaan',
      desc: 'Jab maine pehli baar aapki neck par apne labon ko rakha tha, hyeee aapki neck se jo khushboo maine mehsoos ki thi, aapki wo khushboo mere andar sukoon ban kar utar rahi thi.'
    },
    {
      id: 9,
      image: 'assets/memories/memory_09.jpg',
      emoji: '😜',
      title: 'Pehla Tang Karna',
      tag: 'Memory 09 of 12',
      date: 'Shararatain',
      desc: 'Jab aapne pehli baar mujhe tang kiya tha bhai bol kar... pehle to mujhe itna kuch nahi laga, magar baad me ajeeb sa lagne laga tha! Phir maine aapko bola ke bas ab nahi boliye ga!'
    },
    {
      id: 10,
      image: 'assets/memories/memory_10.jpg',
      emoji: '💖',
      title: 'Hamari Sharatain',
      tag: 'Memory 10 of 12',
      date: 'Pyari Yaadein',
      desc: 'Waise hamari sharatain to beshumar hain — aapka mujhe tang karna, mera aapko tang karna, aapka mujhe gussa dilana, mera aapko manana, pyari shararatain aur haseen yaadein.'
    },
    {
      id: 11,
      image: 'assets/memories/memory_11.jpg',
      emoji: '💓',
      title: 'Dill',
      tag: 'Memory 11 of 12',
      date: 'Dil Ki Dhadkan',
      desc: 'Jab pehli baar maine aapke dil ki dhadkan ko mehsoos kiya, aapki narmi aur aapke ehsaas ne mere dil ko poora sukoon de diya. Aap mera dil aur meri rooh hain.'
    },
    {
      id: 12,
      image: 'assets/memories/memory_12.jpg',
      emoji: '💍',
      title: '23 November 2026 — 2nd Anniversary',
      tag: 'Memory 12 of 12',
      date: '23 November 2026',
      desc: '23 November hamari 2nd Anniversary ka din hai. Main bas itna kehna chahta hoon ke aap mere liye Allah Ta\'ala ki taraf se zindagi ka sab se haseen tohfa hain. Happy 2nd Anniversary Meri Jaan ❤️'
    }
  ];

  // --------------------------------------------------------------------------
  // 3. BALLOON MESSAGES DATA
  // --------------------------------------------------------------------------
  const BALLOON_MESSAGES = {
    1: {
      title: 'Aapki Izzat',
      icon: '💖',
      message: 'Mein apni akhri sans tak apki izzat karon ga.'
    },
    2: {
      title: 'Har Waqt Ka Sahara',
      icon: '🌹',
      message: 'Har mushkil waqt me main aapka mazboot sahara banon ga. Aap kabhi khud ko tanaha nahi samajhna.'
    },
    3: {
      title: 'Aapki Khushi',
      icon: '✨',
      message: 'Aapki khushi mere liye hamesha qeemti rahegi. Aapke chehre par muskurahat laana meri pehli priority hai.'
    },
    4: {
      title: 'Hamesha Ka Saath',
      icon: '🤝',
      message: 'Main aapka haath kabhi nahi chhorunga, chahay halat kitne bhi mushkil kyun na hon.'
    },
    5: {
      title: 'Sukoon Ka Aashiyana',
      icon: '🏡',
      message: 'Hamare ghar ko sukoon aur khushiyon se bhara aashiyana banaunga.'
    }
  };

  // --------------------------------------------------------------------------
  // 4. WEB AUDIO SYNTHESIZER (Guaranteed Zero Latency Sound Effects)
  // --------------------------------------------------------------------------
  function getAudioContext() {
    if (!STATE.audioContext) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        STATE.audioContext = new AudioCtx();
      }
    }
    if (STATE.audioContext && STATE.audioContext.state === 'suspended') {
      STATE.audioContext.resume();
    }
    return STATE.audioContext;
  }

  function playTone(freq, type, duration, gainLevel = 0.15) {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(gainLevel, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {}
  }

  function playKeypadBeep() { playTone(587.33, 'sine', 0.1, 0.12); }

  function playSuccessChime() {
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, idx) => {
      setTimeout(() => playTone(freq, 'sine', 0.35, 0.2), idx * 90);
    });
  }

  function playErrorBuzzer() { playTone(180, 'sawtooth', 0.25, 0.15); }
  function playCardFlipSound() { playTone(440, 'triangle', 0.12, 0.1); }
  function playSlideSound() { playTone(620, 'sine', 0.15, 0.08); }

  function playPopSound() {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(450, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.13);
    } catch (e) {}
  }

  function playCandleLightSound() {
    playTone(880, 'sine', 0.4, 0.18);
    setTimeout(() => playTone(1174.66, 'sine', 0.5, 0.15), 150);
  }

  function playCakeSliceSound() {
    playTone(520, 'sine', 0.2, 0.15);
    setTimeout(() => playTone(784, 'triangle', 0.35, 0.2), 120);
  }

  function playCelebrationChime() {
    const chord = [523.25, 659.25, 783.99, 987.77, 1046.50];
    chord.forEach((f, i) => {
      setTimeout(() => playTone(f, 'sine', 0.6, 0.18), i * 70);
    });
  }

  // --------------------------------------------------------------------------
  // 5. INVISIBLE CONTINUOUS AUTOPLAY BACKGROUND MUSIC
  // --------------------------------------------------------------------------
  const bgAudio = document.getElementById('bg-audio');

  function startBackgroundMusic() {
    if (!bgAudio || STATE.musicStarted) return;
    bgAudio.volume = 0.55;
    const playPromise = bgAudio.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        STATE.musicStarted = true;
      }).catch(() => {
        // Autoplay with sound held by browser until user gesture
      });
    }
  }

  // Attempt autoplay immediately
  startBackgroundMusic();

  // Attach immediate fallback on ANY first user gesture across the document
  const triggerFirstGesture = () => {
    getAudioContext();
    startBackgroundMusic();
  };
  ['click', 'touchstart', 'keydown', 'pointerdown'].forEach(evt => {
    window.addEventListener(evt, triggerFirstGesture, { once: true, passive: true });
  });

  // --------------------------------------------------------------------------
  // 6. SCREEN NAVIGATION & TRANSITIONS
  // --------------------------------------------------------------------------
  function goToScreen(screenNum) {
    if (screenNum < 1 || screenNum > 12) return;

    const currentEl = document.getElementById(`screen-${STATE.currentScreen}`);
    if (currentEl) {
      currentEl.classList.remove('active');
    }

    STATE.currentScreen = screenNum;
    const nextEl = document.getElementById(`screen-${screenNum}`);
    if (nextEl) {
      nextEl.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  // --------------------------------------------------------------------------
  // 7. SCREEN 1: WELCOME CONTENT ONLY
  // --------------------------------------------------------------------------
  const btnToPin = document.getElementById('btn-to-pin');
  if (btnToPin) {
    btnToPin.addEventListener('click', () => {
      startBackgroundMusic();
      goToScreen(2);
    });
  }

  // --------------------------------------------------------------------------
  // 8. SCREEN 2: PIN ENTRY ONLY
  // --------------------------------------------------------------------------
  const pinDots = document.querySelectorAll('#pin-dots .pin-dot');
  const pinFeedback = document.getElementById('pin-feedback');
  const keypadButtons = document.querySelectorAll('.keypad-btn');
  const pinHintBtn = document.getElementById('pin-hint-btn');

  function updatePinDisplay() {
    pinDots.forEach((dot, idx) => {
      if (idx < STATE.enteredPin.length) {
        dot.classList.add('filled');
      } else {
        dot.classList.remove('filled');
      }
    });
  }

  function handleKeypadInput(key) {
    getAudioContext();
    startBackgroundMusic();

    if (STATE.enteredPin.length >= 4) return;
    STATE.enteredPin += key;
    playKeypadBeep();
    updatePinDisplay();

    if (STATE.enteredPin.length === 4) {
      validatePin();
    }
  }

  function handleKeypadDelete() {
    getAudioContext();
    if (STATE.enteredPin.length > 0) {
      STATE.enteredPin = STATE.enteredPin.slice(0, -1);
      playKeypadBeep();
      updatePinDisplay();
      if (pinFeedback) {
        pinFeedback.textContent = '';
        pinFeedback.className = 'pin-feedback';
      }
    }
  }

  function validatePin() {
    const isCorrect = STATE.enteredPin === CONFIG.CORRECT_PIN || 
                      CONFIG.FALLBACK_PINS.includes(STATE.enteredPin);

    if (isCorrect) {
      playSuccessChime();
      if (pinFeedback) {
        pinFeedback.textContent = 'PIN Durust! Welcome Meri Little Fairy ❤️';
        pinFeedback.className = 'pin-feedback success';
      }
      setTimeout(() => {
        goToScreen(3);
      }, 750);
    } else {
      playErrorBuzzer();
      if (pinFeedback) {
        pinFeedback.textContent = 'Galat PIN! Hint: Hamara PIN 0415 💌';
        pinFeedback.className = 'pin-feedback error';
      }
      setTimeout(() => {
        STATE.enteredPin = '';
        updatePinDisplay();
      }, 900);
    }
  }

  keypadButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-key');
      const action = btn.getAttribute('data-action');

      btn.classList.add('pressed');
      setTimeout(() => btn.classList.remove('pressed'), 120);

      if (key !== null) {
        handleKeypadInput(key);
      } else if (action === 'delete') {
        handleKeypadDelete();
      } else if (action === 'confirm') {
        if (STATE.enteredPin.length === 4) {
          validatePin();
        } else {
          playErrorBuzzer();
          if (pinFeedback) {
            pinFeedback.textContent = 'Pehle 4-digit PIN enter karein...';
            pinFeedback.className = 'pin-feedback error';
          }
        }
      }
    });
  });

  if (pinHintBtn) {
    pinHintBtn.addEventListener('click', () => {
      STATE.enteredPin = CONFIG.CORRECT_PIN;
      updatePinDisplay();
      validatePin();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (STATE.currentScreen === 2) {
      if (e.key >= '0' && e.key <= '9') {
        handleKeypadInput(e.key);
      } else if (e.key === 'Backspace' || e.key === 'Delete') {
        handleKeypadDelete();
      } else if (e.key === 'Enter') {
        if (STATE.enteredPin.length === 4) {
          validatePin();
        }
      }
    }
  });

  // --------------------------------------------------------------------------
  // 9. SCREEN 3: FOR YOU (FLIP CARDS)
  // --------------------------------------------------------------------------
  const flipCards = document.querySelectorAll('.flip-card');
  const btnToAlbum = document.getElementById('btn-to-album');

  flipCards.forEach(card => {
    const toggleFlip = () => {
      getAudioContext();
      playCardFlipSound();
      const isFlipped = card.classList.toggle('flipped');
      card.setAttribute('aria-expanded', isFlipped ? 'true' : 'false');
    };

    card.addEventListener('click', toggleFlip);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleFlip();
      }
    });
  });

  if (btnToAlbum) {
    btnToAlbum.addEventListener('click', () => {
      goToScreen(4);
    });
  }

  // --------------------------------------------------------------------------
  // 10. SCREEN 4: BEAUTIFUL ALBUM (12 MEMORIES WITH TEDDY BEARS)
  // --------------------------------------------------------------------------
  const albumPrevBtn = document.getElementById('album-prev-btn');
  const albumNextBtn = document.getElementById('album-next-btn');
  const albumCard = document.getElementById('album-card');
  const albumCounter = document.getElementById('album-counter');
  const albumEmoji = document.getElementById('album-emoji');
  const albumRibbon = document.getElementById('album-ribbon');
  const albumPhoto = document.getElementById('album-photo');
  const albumTitle = document.getElementById('album-title');
  const albumDesc = document.getElementById('album-desc');
  const albumDotsContainer = document.getElementById('album-dots');
  const btnToLetterEnvelope = document.getElementById('btn-to-letter-envelope');

  if (albumDotsContainer) {
    albumDotsContainer.innerHTML = '';
    MEMORIES.forEach((mem, idx) => {
      const dot = document.createElement('span');
      dot.className = `album-dot ${idx === 0 ? 'active' : ''}`;
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-label', `Go to memory ${idx + 1}`);
      dot.addEventListener('click', () => {
        showMemory(idx);
      });
      albumDotsContainer.appendChild(dot);
    });
  }

  function showMemory(index) {
    if (index < 0) index = MEMORIES.length - 1;
    if (index >= MEMORIES.length) index = 0;

    STATE.albumIndex = index;
    const mem = MEMORIES[index];

    if (albumCard) {
      albumCard.style.opacity = '0.4';
      albumCard.style.transform = 'scale(0.97)';
    }

    setTimeout(() => {
      if (albumCounter) albumCounter.textContent = mem.tag;
      if (albumEmoji) albumEmoji.textContent = mem.emoji;
      if (albumRibbon) albumRibbon.textContent = mem.date;
      if (albumPhoto) {
        albumPhoto.src = mem.image;
        albumPhoto.alt = mem.title;
      }
      if (albumTitle) albumTitle.textContent = mem.title;
      if (albumDesc) albumDesc.textContent = mem.desc;

      const dots = document.querySelectorAll('.album-dot');
      dots.forEach((d, i) => {
        d.classList.toggle('active', i === index);
      });

      if (albumCard) {
        albumCard.style.opacity = '1';
        albumCard.style.transform = 'scale(1)';
      }
    }, 180);

    playSlideSound();
  }

  if (albumPrevBtn) {
    albumPrevBtn.addEventListener('click', () => {
      showMemory(STATE.albumIndex - 1);
    });
  }

  if (albumNextBtn) {
    albumNextBtn.addEventListener('click', () => {
      showMemory(STATE.albumIndex + 1);
    });
  }

  let touchStartX = 0;
  let touchEndX = 0;
  const albumCarousel = document.getElementById('album-carousel');

  if (albumCarousel) {
    albumCarousel.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    albumCarousel.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchEndX - touchStartX;
      if (Math.abs(diff) > 40) {
        if (diff < 0) showMemory(STATE.albumIndex + 1);
        else showMemory(STATE.albumIndex - 1);
      }
    }, { passive: true });
  }

  window.addEventListener('keydown', (e) => {
    if (STATE.currentScreen === 4) {
      if (e.key === 'ArrowLeft') showMemory(STATE.albumIndex - 1);
      if (e.key === 'ArrowRight') showMemory(STATE.albumIndex + 1);
    }
  });

  if (btnToLetterEnvelope) {
    btnToLetterEnvelope.addEventListener('click', () => {
      goToScreen(5);
    });
  }

  // --------------------------------------------------------------------------
  // 11. SCREEN 5: A LETTER FOR YOU (ROMANTIC ENVELOPE & TYPEWRITER)
  // --------------------------------------------------------------------------
  const interactiveEnvelope = document.getElementById('interactive-envelope');
  const envelopeStatusHint = document.getElementById('envelope-status-hint');
  const typewriterBody = document.getElementById('typewriter-body');
  const letterSigBlock = document.getElementById('letter-sig-block');
  const letterActions = document.getElementById('letter-actions');
  const btnToBalloons = document.getElementById('btn-to-balloons');

  const LETTER_FULL_TEXT = `Meri Little Fairy,

Kabhi kabhi dil me itni baatein hoti hain ke alfaaz unhein mukammal bayan nahi kar pate. Aap meri zindagi ka woh khoobsurat hissa hain jiske baghair meri har khushi adhoori si lagti hai.

Aapka saath mere liye sirf ek rishta nahi, balki sukoon, apnayat aur zindagi ka sab se haseen ehsaas hai.

Main dua karta hoon ke Allah hamare darmiyan mohabbat, izzat, wafadari aur sukoon hamesha qayam rakhe.

23 November 2026 ko hamari mohabbat ke 2 saal poore hone ja rahe hain. Aap meri zindagi ki sab se qeemti khushi hain.`;

  function openEnvelopeAndStartLetter() {
    if (STATE.envelopeOpened) return;
    STATE.envelopeOpened = true;

    getAudioContext();
    playSuccessChime();

    // 1. Open flap and slide letter up
    interactiveEnvelope.classList.add('opened');
    if (envelopeStatusHint) {
      envelopeStatusHint.innerHTML = '✨ <strong>Khat khul gaya!</strong> Bilal apni Little Fairy ke liye likh rahe hain...';
    }

    // 2. Start typewriter after letter emerges
    setTimeout(() => {
      typeLetterText(LETTER_FULL_TEXT, 0);
    }, 700);
  }

  function typeLetterText(text, charIdx) {
    const letterPaper = document.getElementById('emerging-letter');
    if (charIdx < text.length) {
      if (typewriterBody) {
        typewriterBody.textContent = text.substring(0, charIdx + 1);
      }
      // Smoothly auto-scroll container so current typing line is always visible
      if (letterPaper && (charIdx % 4 === 0 || charIdx === text.length - 1)) {
        letterPaper.scrollTop = letterPaper.scrollHeight;
      }
      setTimeout(() => {
        typeLetterText(text, charIdx + 1);
      }, CONFIG.TYPEWRITER_SPEED);
    } else {
      // Completed typing
      STATE.letterTyped = true;
      if (letterSigBlock) letterSigBlock.style.display = 'flex';
      if (letterActions) letterActions.style.display = 'block';
      if (envelopeStatusHint) {
        envelopeStatusHint.innerHTML = '❤️ <strong>Letter mukammal ho gaya!</strong> Ab aglay surprise ki taraf chalein...';
      }
      // Ensure smooth scroll to the bottom when completed
      if (letterPaper) {
        setTimeout(() => {
          letterPaper.scrollTop = letterPaper.scrollHeight;
        }, 120);
      }
    }
  }

  if (interactiveEnvelope) {
    interactiveEnvelope.addEventListener('click', openEnvelopeAndStartLetter);
  }

  if (btnToBalloons) {
    btnToBalloons.addEventListener('click', () => {
      goToScreen(6);
    });
  }

  // --------------------------------------------------------------------------
  // 12. SCREEN 6: POP THE BALLOONS
  // --------------------------------------------------------------------------
  const balloonElements = document.querySelectorAll('.balloon-item');
  const balloonsCountText = document.getElementById('balloons-count-text');
  const revealedMessagesContainer = document.getElementById('revealed-messages');
  const btnToCelebrate = document.getElementById('btn-to-celebrate');

  balloonElements.forEach(balloon => {
    const handlePop = () => {
      const bId = balloon.getAttribute('data-balloon');
      if (STATE.balloonsPopped.has(bId)) return;

      STATE.balloonsPopped.add(bId);
      playPopSound();
      balloon.classList.add('popped');

      if (balloonsCountText) {
        balloonsCountText.textContent = `Balloons Popped: ${STATE.balloonsPopped.size} of 5`;
      }

      const data = BALLOON_MESSAGES[bId];
      if (data) {
        openRomanticModal(data.icon, data.title, data.message);

        if (revealedMessagesContainer) {
          const card = document.createElement('div');
          card.className = 'revealed-card';
          card.innerHTML = `
            <div class="revealed-card-title">${data.icon} ${data.title}</div>
            <div class="revealed-card-text">&ldquo;${data.message}&rdquo;</div>
          `;
          revealedMessagesContainer.appendChild(card);
        }
      }

      spawnPopBurst(balloon);
    };

    balloon.addEventListener('click', handlePop);
    balloon.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handlePop();
      }
    });
  });

  function spawnPopBurst(elem) {
    const rect = elem.getBoundingClientRect();
    const stage = document.getElementById('balloons-stage');
    if (!stage) return;
    const stageRect = stage.getBoundingClientRect();

    const originX = rect.left - stageRect.left + rect.width / 2;
    const originY = rect.top - stageRect.top + rect.height / 2;

    for (let i = 0; i < 14; i++) {
      const p = document.createElement('span');
      p.textContent = i % 2 === 0 ? '✨' : '💖';
      p.style.position = 'absolute';
      p.style.left = `${originX}px`;
      p.style.top = `${originY}px`;
      p.style.fontSize = '14px';
      p.style.pointerEvents = 'none';
      p.style.zIndex = '30';
      p.style.transition = 'all 0.6s ease-out';
      stage.appendChild(p);

      const angle = (Math.PI * 2 * i) / 14;
      const dist = 40 + Math.random() * 45;
      const tx = Math.cos(angle) * dist;
      const ty = Math.sin(angle) * dist;

      requestAnimationFrame(() => {
        p.style.transform = `translate(${tx}px, ${ty}px) scale(0)`;
        p.style.opacity = '0';
      });

      setTimeout(() => {
        if (p.parentNode) p.parentNode.removeChild(p);
      }, 700);
    }
  }

  const btnToQuiz = document.getElementById('btn-to-quiz') || document.getElementById('btn-to-celebrate');
  if (btnToQuiz) {
    btnToQuiz.addEventListener('click', () => {
      goToScreen(7);
    });
  }

  // --------------------------------------------------------------------------
  // 13. SCREEN 7: INTERACTIVE QUIZ SECTION (Clean, Elegant, No Emojis)
  // --------------------------------------------------------------------------
  const LOVE_QUIZ_QUESTIONS = [
    'Ham dono ka sab se khoobsurat moment aapke liye kya hai?',
    'Aapko hamari sab se pyari memory kaunsi lagti hai?',
    'Aapko mere saath guzara hua kaunsa din dobara jeene ka dil chahta hai?',
    'Aap mere baare mein aisi kaunsi baat hain jo kabhi kisi ko nahi bata sakti?',
    'Aapko hamare rishtay mein sab se pyari cheez kya lagti hai?'
  ];

  const FUNNY_QUIZ_QUESTIONS = [
    {
      q: 'Pehle manaane ka kaam aksar kis ka hota hai?',
      options: ['Aapka (Bilal)', 'Mera (Warisha)', 'Jo zyada pyar karta hai']
    },
    {
      q: 'Ham dono mein se zyada dramaybaaz kaun hai?',
      options: ['Main Little Fairy', 'Aap (Bilal)', 'Dono hi Oscar winner hain']
    },
    {
      q: 'Ham dono mein se zyada jealous kaun hota hai?',
      options: ['Main foran jealous hoti hoon', 'Aap jealous ho jate hain', 'Haqiqat me dono hi']
    },
    {
      q: 'Kis ka mood sab se jaldi change hota hai?',
      options: ['Mera mausam jaisa mood', 'Aapka', 'Lekin hug milte hi theek ho jata hai']
    },
    {
      q: 'Ham dono mein se zyada ziddi kaun hai?',
      options: ['Main hi hoon', 'Bilal (Aap)', 'Hum dono barabar!']
    }
  ];

  // Tab Navigation Elements
  const tabLoveBtn = document.getElementById('tab-love-btn');
  const tabFunnyBtn = document.getElementById('tab-funny-btn');
  const quizLovePanel = document.getElementById('quiz-love-panel');
  const quizFunnyPanel = document.getElementById('quiz-funny-panel');
  const btnGoToFunnyTab = document.getElementById('btn-go-to-funny-tab');
  const btnQuizToCelebrate = document.getElementById('btn-quiz-to-celebrate');

  // Love Quiz Elements
  const loveProgressText = document.getElementById('love-progress-text');
  const loveProgressFill = document.getElementById('love-progress-fill');
  const loveQuizCard = document.getElementById('love-quiz-card');
  const loveQText = document.getElementById('love-q-text');
  const loveAnswerInput = document.getElementById('love-answer-input');
  const lovePrevBtn = document.getElementById('love-prev-btn');
  const loveNextBtn = document.getElementById('love-next-btn');
  const loveCompletionBox = document.getElementById('love-completion-box');

  // Funny Quiz Elements
  const funnyProgressText = document.getElementById('funny-progress-text');
  const funnyProgressFill = document.getElementById('funny-progress-fill');
  const funnyQuizCard = document.getElementById('funny-quiz-card');
  const funnyQText = document.getElementById('funny-q-text');
  const funnyOptionsContainer = document.getElementById('funny-options-container');
  const funnyPrevBtn = document.getElementById('funny-prev-btn');
  const funnyNextBtn = document.getElementById('funny-next-btn');
  const funnyCompletionBox = document.getElementById('funny-completion-box');

  function switchQuizTab(tab) {
    STATE.activeQuizTab = tab;
    if (tab === 'love') {
      if (tabLoveBtn) {
        tabLoveBtn.classList.add('active');
        tabLoveBtn.setAttribute('aria-selected', 'true');
      }
      if (tabFunnyBtn) {
        tabFunnyBtn.classList.remove('active');
        tabFunnyBtn.setAttribute('aria-selected', 'false');
      }
      if (quizLovePanel) {
        quizLovePanel.classList.add('active');
        quizLovePanel.style.display = 'block';
      }
      if (quizFunnyPanel) {
        quizFunnyPanel.classList.remove('active');
        quizFunnyPanel.style.display = 'none';
      }
    } else {
      if (tabFunnyBtn) {
        tabFunnyBtn.classList.add('active');
        tabFunnyBtn.setAttribute('aria-selected', 'true');
      }
      if (tabLoveBtn) {
        tabLoveBtn.classList.remove('active');
        tabLoveBtn.setAttribute('aria-selected', 'false');
      }
      if (quizFunnyPanel) {
        quizFunnyPanel.classList.add('active');
        quizFunnyPanel.style.display = 'block';
      }
      if (quizLovePanel) {
        quizLovePanel.classList.remove('active');
        quizLovePanel.style.display = 'none';
      }
    }
  }

  if (tabLoveBtn) tabLoveBtn.addEventListener('click', () => switchQuizTab('love'));
  if (tabFunnyBtn) tabFunnyBtn.addEventListener('click', () => switchQuizTab('funny'));
  if (btnGoToFunnyTab) btnGoToFunnyTab.addEventListener('click', () => switchQuizTab('funny'));

  // Love Quiz Functions
  function renderLoveQuestion() {
    const idx = STATE.loveIndex;
    if (loveProgressText) loveProgressText.textContent = `Question ${idx + 1} of 5`;
    if (loveProgressFill) loveProgressFill.style.width = `${((idx + 1) / 5) * 100}%`;
    if (loveQText) loveQText.textContent = LOVE_QUIZ_QUESTIONS[idx];
    if (loveAnswerInput) loveAnswerInput.value = STATE.loveAnswers[idx] || '';

    if (lovePrevBtn) lovePrevBtn.style.visibility = idx > 0 ? 'visible' : 'hidden';
    if (loveNextBtn) loveNextBtn.textContent = idx === 4 ? 'Finish' : 'Next';

    if (loveQuizCard) loveQuizCard.style.display = 'block';
    if (loveCompletionBox) loveCompletionBox.style.display = 'none';
  }

  if (loveAnswerInput) {
    loveAnswerInput.addEventListener('input', () => {
      STATE.loveAnswers[STATE.loveIndex] = loveAnswerInput.value;
    });
  }

  if (lovePrevBtn) {
    lovePrevBtn.addEventListener('click', () => {
      if (loveAnswerInput) STATE.loveAnswers[STATE.loveIndex] = loveAnswerInput.value;
      if (STATE.loveIndex > 0) {
        STATE.loveIndex--;
        renderLoveQuestion();
      }
    });
  }

  if (loveNextBtn) {
    loveNextBtn.addEventListener('click', () => {
      if (loveAnswerInput) STATE.loveAnswers[STATE.loveIndex] = loveAnswerInput.value;
      if (STATE.loveIndex < 4) {
        STATE.loveIndex++;
        renderLoveQuestion();
      } else {
        // Complete Love Quiz
        if (loveQuizCard) loveQuizCard.style.display = 'none';
        if (loveCompletionBox) loveCompletionBox.style.display = 'block';
        playSuccessChime();
      }
    });
  }

  // Funny Quiz Functions
  function renderFunnyQuestion() {
    const idx = STATE.funnyIndex;
    const item = FUNNY_QUIZ_QUESTIONS[idx];
    if (funnyProgressText) funnyProgressText.textContent = `Question ${idx + 1} of 5`;
    if (funnyProgressFill) funnyProgressFill.style.width = `${((idx + 1) / 5) * 100}%`;
    if (funnyQText) funnyQText.textContent = item.q;

    if (funnyOptionsContainer) {
      funnyOptionsContainer.innerHTML = '';
      item.options.forEach(opt => {
        const chip = document.createElement('button');
        chip.type = 'button';
        chip.className = `quiz-option-chip ${STATE.funnyAnswers[idx] === opt ? 'selected' : ''}`;
        chip.innerHTML = `<span>${opt}</span><span class="chip-marker">✓</span>`;
        chip.addEventListener('click', () => {
          STATE.funnyAnswers[idx] = opt;
          playTone(600, 'sine', 0.1, 0.1);
          renderFunnyQuestion();
        });
        funnyOptionsContainer.appendChild(chip);
      });
    }

    if (funnyPrevBtn) funnyPrevBtn.style.visibility = idx > 0 ? 'visible' : 'hidden';
    if (funnyNextBtn) funnyNextBtn.textContent = idx === 4 ? 'Finish' : 'Next';

    if (funnyQuizCard) funnyQuizCard.style.display = 'block';
    if (funnyCompletionBox) funnyCompletionBox.style.display = 'none';
  }

  if (funnyPrevBtn) {
    funnyPrevBtn.addEventListener('click', () => {
      if (STATE.funnyIndex > 0) {
        STATE.funnyIndex--;
        renderFunnyQuestion();
      }
    });
  }

  if (funnyNextBtn) {
    funnyNextBtn.addEventListener('click', () => {
      if (STATE.funnyIndex < 4) {
        STATE.funnyIndex++;
        renderFunnyQuestion();
      } else {
        // Complete Funny Quiz
        if (funnyQuizCard) funnyQuizCard.style.display = 'none';
        if (funnyCompletionBox) funnyCompletionBox.style.display = 'block';
        playSuccessChime();
      }
    });
  }

  if (btnQuizToCelebrate) {
    btnQuizToCelebrate.addEventListener('click', () => {
      goToScreen(8);
    });
  }

  // --------------------------------------------------------------------------
  // 14. SCREEN 8: LET'S CELEBRATE (CANDLES LIGHTING)
  // --------------------------------------------------------------------------
  const btnLightCandles = document.getElementById('btn-light-candles');
  const btnToBlown = document.getElementById('btn-to-blown');
  const candlePromptText = document.getElementById('candle-prompt-text');

  if (btnLightCandles) {
    btnLightCandles.addEventListener('click', () => {
      getAudioContext();
      playCandleLightSound();
      STATE.candlesLit = true;

      for (let i = 1; i <= 4; i++) {
        setTimeout(() => {
          const flame = document.getElementById(`flame-${i}`);
          if (flame) flame.classList.remove('flame-unlit');
          if (flame) flame.classList.add('lit');
        }, i * 220);
      }

      if (candlePromptText) {
        candlePromptText.innerHTML = '✨ <strong>Candles roshan ho gayin!</strong> Ab dil me ek meethi dua maang kar mombattiyan bujha dein...';
      }

      btnLightCandles.style.display = 'none';
      if (btnToBlown) {
        btnToBlown.style.display = 'inline-flex';
      }
    });
  }

  if (btnToBlown) {
    btnToBlown.addEventListener('click', () => {
      playTone(300, 'sine', 0.2, 0.1);
      goToScreen(9);
    });
  }

  // --------------------------------------------------------------------------
  // 15. SCREEN 9: CANDLES BLOWN OUT
  // --------------------------------------------------------------------------
  const btnToCakeCut = document.getElementById('btn-to-cake-cut');
  if (btnToCakeCut) {
    btnToCakeCut.addEventListener('click', () => {
      goToScreen(10);
    });
  }

  // --------------------------------------------------------------------------
  // 16. SCREEN 10: YUMMY CAKE CUT
  // --------------------------------------------------------------------------
  const btnPerformCut = document.getElementById('btn-perform-cut');
  const btnToDua = document.getElementById('btn-to-dua');
  const cakeKnife = document.getElementById('cake-knife');
  const cakeSlice = document.getElementById('cake-slice');
  const cutStatusMsg = document.getElementById('cut-status-msg');

  function performCakeCut() {
    if (STATE.cakeCut) return;
    STATE.cakeCut = true;

    getAudioContext();
    playCakeSliceSound();

    if (cakeKnife) {
      cakeKnife.classList.add('cutting');
    }

    setTimeout(() => {
      if (cakeSlice) {
        cakeSlice.classList.add('sliced');
      }
      playCelebrationChime();
      spawnConfettiShower();

      if (cakeKnife) {
        setTimeout(() => cakeKnife.classList.add('retract'), 600);
      }

      if (cutStatusMsg) {
        cutStatusMsg.innerHTML = '🎂 <strong>Yummy! Cake cut ho gaya!</strong> Ab hamare liye ek haseen dua aapki muntazir hai...';
      }

      if (btnPerformCut) btnPerformCut.style.display = 'none';
      if (btnToDua) btnToDua.style.display = 'inline-flex';
    }, 800);
  }

  if (btnPerformCut) {
    btnPerformCut.addEventListener('click', performCakeCut);
  }

  const interactiveCake = document.getElementById('interactive-cake');
  if (interactiveCake) {
    interactiveCake.addEventListener('click', performCakeCut);
  }

  function spawnConfettiShower() {
    const container = document.getElementById('cake-confetti-layer');
    if (!container) return;

    const colors = ['#ff4d6d', '#ff758c', '#d4af37', '#ffd1dc', '#ffffff', '#c9184a'];
    for (let i = 0; i < 48; i++) {
      const conf = document.createElement('div');
      conf.style.position = 'absolute';
      conf.style.width = `${6 + Math.random() * 8}px`;
      conf.style.height = `${8 + Math.random() * 10}px`;
      conf.style.background = colors[Math.floor(Math.random() * colors.length)];
      conf.style.borderRadius = i % 3 === 0 ? '50%' : '2px';
      conf.style.left = `${Math.random() * 100}%`;
      conf.style.top = '-20px';
      conf.style.opacity = '1';
      conf.style.transform = `rotate(${Math.random() * 360}deg)`;
      conf.style.transition = `all ${1.5 + Math.random() * 1.5}s cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
      container.appendChild(conf);

      requestAnimationFrame(() => {
        conf.style.top = `${180 + Math.random() * 100}px`;
        conf.style.transform = `rotate(${Math.random() * 720}deg) translateX(${Math.random() * 40 - 20}px)`;
        conf.style.opacity = '0';
      });

      setTimeout(() => {
        if (conf.parentNode) conf.parentNode.removeChild(conf);
      }, 3000);
    }
  }

  if (btnToDua) {
    btnToDua.addEventListener('click', () => {
      goToScreen(11);
    });
  }

  // --------------------------------------------------------------------------
  // 17. SCREEN 11: HAMARE LIYE EK DUA ❤️ (DEDICATED DUA SCREEN)
  // --------------------------------------------------------------------------
  const btnToPoetry = document.getElementById('btn-to-poetry');
  if (btnToPoetry) {
    btnToPoetry.addEventListener('click', () => {
      goToScreen(12);
    });
  }

  // --------------------------------------------------------------------------
  // 18. SCREEN 12: THIS POETRY IS FOR YOU ❤️ & RESTART
  // --------------------------------------------------------------------------
  const btnRestart = document.getElementById('btn-restart');

  if (btnRestart) {
    btnRestart.addEventListener('click', () => {
      // 1. Reset PIN
      STATE.enteredPin = '';
      updatePinDisplay();
      if (pinFeedback) {
        pinFeedback.textContent = '';
        pinFeedback.className = 'pin-feedback';
      }

      // 2. Reset Flip Cards
      flipCards.forEach(c => c.classList.remove('flipped'));

      // 3. Reset Album
      showMemory(0);

      // 4. Reset Envelope & Typewriter
      STATE.envelopeOpened = false;
      STATE.letterTyped = false;
      if (interactiveEnvelope) interactiveEnvelope.classList.remove('opened');
      if (typewriterBody) typewriterBody.textContent = '';
      if (letterSigBlock) letterSigBlock.style.display = 'none';
      if (letterActions) letterActions.style.display = 'none';
      if (envelopeStatusHint) {
        envelopeStatusHint.innerHTML = '💌 Tap the envelope to open your letter.';
      }

      // 5. Reset Balloons
      STATE.balloonsPopped.clear();
      balloonElements.forEach(b => b.classList.remove('popped'));
      if (balloonsCountText) balloonsCountText.textContent = 'Balloons Popped: 0 of 5';
      if (revealedMessagesContainer) revealedMessagesContainer.innerHTML = '';

      // 6. Reset Quiz State
      STATE.loveAnswers = ['', '', '', '', ''];
      STATE.loveIndex = 0;
      STATE.funnyAnswers = [null, null, null, null, null];
      STATE.funnyIndex = 0;
      switchQuizTab('love');
      renderLoveQuestion();
      renderFunnyQuestion();

      // 7. Reset Candles
      STATE.candlesLit = false;
      for (let i = 1; i <= 4; i++) {
        const flame = document.getElementById(`flame-${i}`);
        if (flame) flame.classList.add('flame-unlit');
        if (flame) flame.classList.remove('lit');
      }
      if (btnLightCandles) btnLightCandles.style.display = 'inline-flex';
      if (btnToBlown) btnToBlown.style.display = 'none';
      if (candlePromptText) {
        candlePromptText.textContent = 'Candles abhi bujhi hain. Button dabaiye aur candles ko roshan karein...';
      }

      // 8. Reset Cake Cut
      STATE.cakeCut = false;
      if (cakeKnife) {
        cakeKnife.classList.remove('cutting');
        cakeKnife.classList.remove('retract');
      }
      if (cakeSlice) cakeSlice.classList.remove('sliced');
      if (btnPerformCut) btnPerformCut.style.display = 'inline-flex';
      if (btnToDua) btnToDua.style.display = 'none';
      if (cutStatusMsg) {
        cutStatusMsg.textContent = 'Knife ko cake par chalayein ya niche diye gaye button par click karein...';
      }

      // 9. Return to Screen 1 (Welcome Screen)
      goToScreen(1);
    });
  }

  // --------------------------------------------------------------------------
  // 18. REUSABLE ROMANTIC MODAL DIALOG
  // --------------------------------------------------------------------------
  const modalOverlay = document.getElementById('romantic-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalDoneBtn = document.getElementById('modal-done-btn');
  const modalIcon = document.getElementById('modal-icon');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');

  function openRomanticModal(icon, title, body) {
    if (modalIcon) modalIcon.textContent = icon || '💌';
    if (modalTitle) modalTitle.textContent = title || 'Hamara Waada';
    if (modalBody) modalBody.innerHTML = `&ldquo;${body}&rdquo;`;
    if (modalOverlay) {
      modalOverlay.classList.add('active');
      modalOverlay.setAttribute('aria-hidden', 'false');
    }
  }

  function closeRomanticModal() {
    if (modalOverlay) {
      modalOverlay.classList.remove('active');
      modalOverlay.setAttribute('aria-hidden', 'true');
    }
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeRomanticModal);
  if (modalDoneBtn) modalDoneBtn.addEventListener('click', closeRomanticModal);
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeRomanticModal();
    });
  }

  // --------------------------------------------------------------------------
  // 19. AMBIENT ROSE PETALS & HEARTS CANVAS
  // --------------------------------------------------------------------------
  const canvas = document.getElementById('ambient-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const PARTICLE_COUNT = 28;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: 7 + Math.random() * 9,
        speedY: 0.8 + Math.random() * 1.2,
        speedX: Math.sin(i) * 0.7,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 1.8,
        type: Math.random() > 0.4 ? 'petal' : 'heart',
        opacity: 0.35 + Math.random() * 0.45
      });
    }

    function renderAmbientParticles() {
      ctx.clearRect(0, 0, width, height);

      particles.forEach(p => {
        p.y += p.speedY;
        p.x += Math.sin(p.y * 0.01) * 0.8;
        p.rotation += p.rotationSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = p.opacity;

        if (p.type === 'petal') {
          ctx.fillStyle = '#ff758c';
          ctx.beginPath();
          ctx.moveTo(0, -p.size);
          ctx.quadraticCurveTo(p.size * 0.8, -p.size * 0.5, p.size * 0.5, p.size * 0.6);
          ctx.quadraticCurveTo(0, p.size, -p.size * 0.5, p.size * 0.6);
          ctx.quadraticCurveTo(-p.size * 0.8, -p.size * 0.5, 0, -p.size);
          ctx.fill();
        } else {
          ctx.fillStyle = '#ff4d6d';
          const s = p.size * 0.6;
          ctx.beginPath();
          ctx.moveTo(0, s * 0.3);
          ctx.bezierCurveTo(-s, -s * 0.5, -s * 1.5, s * 0.5, 0, s * 1.5);
          ctx.bezierCurveTo(s * 1.5, s * 0.5, s, -s * 0.5, 0, s * 0.3);
          ctx.fill();
        }

        ctx.restore();
      });

      requestAnimationFrame(renderAmbientParticles);
    }

    requestAnimationFrame(renderAmbientParticles);
  }

  // --------------------------------------------------------------------------
  // 20. INITIALIZATION
  // --------------------------------------------------------------------------
  showMemory(0);
  renderLoveQuestion();
  renderFunnyQuestion();

})();
