function isYouTubeEmbed() {
  return window.location.href.includes('youtube.com/embed/') 
    || window.location.href.includes('m.youtube.com');
}
  
if (isYouTubeEmbed()) {
  let fadeOutTimer = null;
  let isPaused = false;

  function scheduleFadeOut(overlay, delay) {
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

    const video = document.querySelector('video');
    if (video) {
      isPaused = video.classList.contains('paused-mode');
      // when the video is playing, add the fadein class back so the overlay is there when needed
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

    // Keep overlay visible when moving the mouse in the video area
    overlay.addEventListener('mousemove', () => {
      if (fadeOutTimer) {
        clearTimeout(fadeOutTimer);
        overlay.classList.add('fadein');
      }
    });

    overlay.addEventListener('mouseleave', () => {
      if (overlay.classList.contains('fadein')) {
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