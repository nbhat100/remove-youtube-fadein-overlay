function isYouTubeEmbed() {
  return window.location.href.includes('youtube.com/embed/') 
    || window.location.href.includes('m.youtube.com');
}
  
if (isYouTubeEmbed()) {
  let fadeOutTimer = null;
  let isPaused = false;

  function scheduleFadeOut(overlay, delay) {
    // Clear any existing timer
    if (fadeOutTimer) {
      clearTimeout(fadeOutTimer);
    }
    
    // Remove fadein after specified delay
    fadeOutTimer = setTimeout(() => {
      overlay.classList.remove('fadein');
    }, delay);
  }

  function preventFadeIn() {
    const overlay = document.getElementById('player-control-overlay');
    if (!overlay) return;

    // Detect pause/play state changes
    const video = document.querySelector('video');
    if (video) {
      isPaused = video.classList.contains('paused-mode');
      if (!isPaused) {
          overlay.classList.add('fadein');
      }
    }

    // Observer to detect when fadein is added
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          const target = mutation.target;
          if (target.id === 'player-control-overlay' && target.classList.contains('fadein')) {
            // 1 second delay when paused, 3 seconds otherwise
            const delay = isPaused ? 1000 : 3000;
            scheduleFadeOut(overlay, delay);
          }
        }
      });
    });

    observer.observe(overlay, {
      attributes: true,
      attributeFilter: ['class']
    });

    // Keep overlay visible on mouse hover
    overlay.addEventListener('mouseenter', () => {
      if (fadeOutTimer) {
        clearTimeout(fadeOutTimer);
        overlay.classList.add('fadein');
      }
    });

    overlay.addEventListener('mouseleave', () => {
      if (overlay.classList.contains('fadein')) {
        // Almost immediate on mouse leave (100ms)
        scheduleFadeOut(overlay, 100);
      }
    });
  }

  // Wait for overlay to exist
  const checkOverlay = setInterval(() => {
    const overlay = document.getElementById('player-control-overlay');
    if (overlay) {
      preventFadeIn();
      clearInterval(checkOverlay);
    }
  }, 500);
}