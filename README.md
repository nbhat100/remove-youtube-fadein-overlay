# YouTube Embedded Player - Quick Fade Controls

A lightweight browser extension that improves the user experience of embedded YouTube players by automatically hiding the control overlay after a short delay.

## What It Does

When you pause an embedded YouTube video, the control overlay (play button, progress bar, etc.) sometimes stays visible indefinitely. This extension automatically hides the overlay after:

- **1 second** when the video is paused
- **100ms** when you move your mouse away from the controls
- **Never hides** while your mouse is hovering over the controls

This creates a cleaner viewing experience while keeping controls easily accessible when needed.

## Features

- Automatic fade-out of player controls
- Works only on embedded YouTube players (not youtube.com)
- Smart hover detection - controls stay visible when you need them
- Lightweight and efficient
- Privacy-focused - runs entirely locally, no data collection

## Installation

### Download or Clone

```bash
git clone https://github.com/nbhat100/remove-youtube-fadein-overlay.git
```

### Chrome/Edge/Brave

1. Navigate to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top-right corner)
3. Click "Load unpacked"
4. Select the extension folder

### Firefox

1. Navigate to `about:debugging#/runtime/this-firefox`
2. Click "Load Temporary Add-on"
3. Select any file in the project folder

The extension is now active on all embedded YouTube players.

## File Structure

```
remove-youtube-fadein-overlay/
├── manifest.json       # Extension configuration
├── content.js          # Main logic for control hiding
├── README.md           # This file
└── icons/              # Includes icon PNGs for browser extension images
    ├── icon16.png      # Toolbar icon (16x16)
    ├── icon48.png      # Extension page icon (48x48)
    ├── icon128.png     # Web Store icon (128x128) 
```

## How It Works

The extension uses a MutationObserver to monitor when YouTube adds the `fadein` class to the control overlay. When detected:

1. Checks if the video is paused or playing
2. Sets an appropriate timeout (1s for paused, 3s for playing)
3. Removes the `fadein` class after the delay, hiding the overlay
4. Cancels the timeout if you hover over the controls

## Compatibility

- Chrome, Edge, Brave (Chromium-based browsers)
- Firefox
- Works on embedded YouTube players (`youtube.com/embed/`)
- Does not affect the main YouTube website

## Privacy

This extension:
- Runs entirely locally in your browser
- Does not collect, store, or transmit any data
- Does not require any special permissions
- Only affects embedded YouTube players you visit

## Contributing

Issues and pull requests are welcome! Feel free to suggest improvements or report bugs.

## Disclaimer

This is an independent project and is not affiliated with, endorsed by, or connected to YouTube or Google in any way.