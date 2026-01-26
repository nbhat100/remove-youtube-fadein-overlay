# Embedded YouTube No Fade Controls

A Chrome/Chromium browser extension that prevents YouTube's embedded player controls from automatically fading out, improving the user experience when watching embedded YouTube videos.

## Features

- **Persistent Controls**: Keeps YouTube embedded player controls visible instead of letting them fade away
- **Smart Timing**: 
  - 3-second fade delay when video is playing
  - 1-second fade delay when video is paused
  - 100ms fade delay when your mouse leaves the player
- **Hover Support**: Controls remain visible when hovering over the player
- **Automatic Detection**: Works on all YouTube embedded videos and mobile YouTube pages
- **Lightweight**: Minimal performance impact with efficient DOM monitoring

## Compatibility

- Chrome/Chromium-based browsers
- Firefox
- Manifest V3 compatible
- Works on:
  - Standard YouTube embeds (`youtube.com/embed/`)
  - Mobile YouTube (`m.youtube.com`)
  - Any website with embedded YouTube players

## Installation

1. Clone or download this repository
2. Open browser and go to developer mode browser extensions
    a. Chrome
        i. Go to Chrome and navigate to `chrome://extensions/`
        ii. Enable "Developer mode" (toggle in the top right)
        iii. Click "Load unpacked"
        iiii. Select the project folder
    b. Firefox
        i. Go to Firefox and navigate to `about:debugging#/runtime/this-firefox`
        ii. Click on "Load Temporary Add-On"
        iii. Select any file in the project folder
3. The extension icon should appear in your browser toolbar

## How It Works

The extension uses a MutationObserver to detect when the player control overlay's `fadein` class is added. When detected, it:

1. Monitors the video's play/pause state
2. Schedules the controls to fade out based on context:
   - Playing video: 3 seconds
   - Paused video: 1 second
   - Mouse leaving player: 100ms
3. Cancels the fade-out timer if you hover over the controls
4. Restarts monitoring for the next fade-in event

## Project Structure

```
remove-yt-fade-in/
├── manifest.json      # Extension configuration and permissions
├── content.js         # Main script that prevents controls from fading
├── script.html        # HTML resources (if any)
├── README.md          # This file
└── icons/
    ├── icon16.png     # 16x16 icon
    ├── icon48.png     # 48x48 icon
    └── icon128.png    # 128x128 icon
```

## Development

The extension is built with vanilla JavaScript and no external dependencies. To modify:

1. Edit `content.js` for the main functionality
2. Update `manifest.json` if changing permissions or metadata
3. Reload the extension in `chrome://extensions/` after making changes

## Troubleshooting

- **Extension not working?** Ensure it's enabled in `chrome://extensions/`
- **Controls still fading?** Try hard-refreshing the page (Cmd+Shift+R or Ctrl+Shift+R)
- **Only works on some sites?** The extension currently targets YouTube embeds and mobile YouTube pages

## Contributing

Feel free to submit issues or pull requests to improve the extension.
