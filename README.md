# Cyber-Synthesizer Portfolio

A retro arcade-themed professional portfolio website with a cyber-synth aesthetic.

## Setup Instructions

### 1. Add Your Profile Image

Place your profile image in this directory and name it `profile.jpg`. The image will be automatically styled with a pixelated, retro effect.

**Supported formats:** `.jpg`, `.jpeg`, `.png`

### 2. Customize Your Content

Edit `index.html` to update:

- **Player Select Section:**
  - Update skill levels in the character stats
  - Modify the system log entries with your actual bio information

- **Quest Log Section:**
  - Replace project cards with your actual projects
  - Update difficulty badges (LEGENDARY, HARD, CASUAL)
  - Add your project descriptions and tech stacks

- **High Scores Section:**
  - Update the experience/resume table with your actual work history and education

- **Config/Contact Section:**
  - Update email address in the mailto link
  - Add your actual GitHub, LinkedIn, and Twitter URLs

### 3. Customize Your Spotify Playlist

The Spotify embed is already integrated. If you want to change the playlist:

1. Go to Spotify and open your desired playlist
2. Click the "..." menu → "Share" → "Embed playlist"
3. Copy the iframe code
4. Replace the iframe in the `jukebox-section` of `index.html`

### 4. Open the Website

Simply open `index.html` in your web browser, or use a local server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (if you have http-server installed)
npx http-server
```

Then navigate to `http://localhost:8000` in your browser.

## Features

- ✨ Retro arcade console aesthetic
- 🎮 Interactive navigation with game-themed transitions
- 🎵 Integrated Spotify playlist player
- 🖱️ Custom pixelated cursor
- 💫 Smooth animations and hover effects
- 📱 Responsive design
- ♿ Accessible keyboard navigation (Arrow keys, Escape)

## Keyboard Controls

- **Arrow Right**: Navigate to next section
- **Arrow Left**: Navigate to previous section
- **Escape**: Return to main menu

## Browser Compatibility

Works best in modern browsers (Chrome, Firefox, Safari, Edge). Some effects may vary in older browsers.

## Customization Tips

- Adjust colors in `styles.css` by modifying CSS variables in the `:root` selector
- Change fonts by updating the Google Fonts import in `index.html`
- Modify transition speeds in `script.js` for different animation timings

Enjoy your cyber-synth portfolio! 🎮✨

