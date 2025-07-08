# Spotify 2.0 Clone

A modern, feature-rich music streaming application built with React, Tailwind CSS, and Vite. This project now features **real Spotify API integration** with OAuth authentication, ngrok tunneling for local development, and a seamless user experience.

## 🎵 Features

### Core Features
- **Real Spotify API Integration** - Search and play music from Spotify's vast library
- **OAuth Authentication** - Secure login with your Spotify account
- **Preview Playback** - Listen to 30-second previews for most tracks
- **User Playlists** - Browse your Spotify playlists
- **Search Functionality** - Real-time search across songs, artists, albums, and playlists
- **Player Controls** - Full-featured music player with play/pause, next/previous, volume control
- **Albums & Genres** - Browse music by albums and genres
- **Responsive Design** - Works seamlessly on all devices

### Player Features
- **Spotify Preview Playback** - 30-second previews for most tracks
- Play/Pause controls with loading states
- Next/Previous track navigation
- Volume control with slider
- Progress bar with seek functionality
- Repeat and shuffle functionality
- Current song display with cover art
- Error handling for audio playback

### Navigation
- Home page with featured content from Spotify
- Search page with real-time Spotify search
- Library section with your playlists
- Playlists management
- Genre browsing

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- A Spotify account (free or premium)
- [ngrok](https://ngrok.com/) account for local HTTPS tunneling

### Installation

1. Clone the repository:
```bash
git clone https://github.com/iamavirals0101/clone.git
cd clone
```

2. Install dependencies:
```bash
npm install
```

3. Set up Spotify API credentials and ngrok:
   - **See [`SPOTIFY_SETUP.md`](./SPOTIFY_SETUP.md) for a step-by-step guide!**
   - You will:
     - Create a Spotify Developer App
     - Set your redirect URI to your ngrok HTTPS URL
     - Add your Client ID and Secret to the config
     - Start ngrok and update your code/dashboard as needed

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to your ngrok HTTPS URL (e.g. `https://xxxx.ngrok-free.app`)

## 🛠️ Tech Stack

- **React** - Modern React with hooks and context
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Context API** - State management for music player and data
- **Axios** - HTTP client for API requests
- **Spotify Web API** - Real music data and playback

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Sidebar.jsx     # Navigation sidebar
│   └── PlayerBar.jsx   # Music player controls
├── contexts/           # React contexts
│   ├── MusicPlayerContext.jsx  # Music player state management
│   └── SpotifyContext.jsx      # Spotify API/auth state
├── services/           # API services
│   └── spotifyApi.js   # Spotify API integration
├── pages/              # Page components
│   ├── Home.jsx        # Home page
│   ├── Search.jsx      # Search functionality
│   ├── Library.jsx     # User library
│   ├── Playlists.jsx   # Playlist management
│   └── Genres.jsx      # Genre browsing
└── App.jsx             # Main application component
```

## 📝 Spotify Integration & ngrok Workflow

- **OAuth Login:** Securely authenticate with your Spotify account
- **ngrok Tunnel:** Expose your local dev server to the internet with HTTPS (required by Spotify)
- **Redirect URI:** Must match your ngrok URL (e.g. `https://xxxx.ngrok-free.app/callback`)
- **Preview Playback:** Listen to 30-second previews for most tracks (full playback requires Premium and extra setup)
- **User Playlists:** Browse your own Spotify playlists after login

**See [`SPOTIFY_SETUP.md`](./SPOTIFY_SETUP.md) for full setup instructions!**

## ⚠️ Security Warning
- **Never commit your Client Secret or .env files to public repositories!**
- For production, always use environment variables and keep secrets out of source control.

## 🔒 Licensing
- **Spotify API:** Subject to Spotify's terms of use
- **Project Code:** MIT License

---

**Note:** This application is for educational purposes and is not affiliated with Spotify. All music data is sourced from the official Spotify API.
