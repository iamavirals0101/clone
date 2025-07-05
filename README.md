# Spotify 2.0 Clone

A modern, feature-rich music streaming application built with React, Tailwind CSS, and Vite. This project replicates the core functionality of Spotify with an enhanced user experience.

## 🎵 Features

### Core Features
- **Music Playlists** - Browse and play curated playlists
- **Search Functionality** - Search for songs, artists, albums, and playlists
- **Player Controls** - Full-featured music player with play/pause, next/previous, volume control
- **Albums & Genres** - Browse music by albums and genres
- **Responsive Design** - Works seamlessly on all devices

### Player Features
- Play/Pause controls
- Next/Previous track navigation
- Volume control with slider
- Progress bar with seek functionality
- Repeat modes (None, One, All)
- Shuffle functionality
- Current song display with cover art

### Navigation
- Home page with featured content
- Search page with real-time filtering
- Library section
- Playlists management
- Genre browsing

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd spotify
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🛠️ Tech Stack

- **React 19** - Modern React with hooks and context
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Context API** - State management for music player

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Sidebar.jsx     # Navigation sidebar
│   └── PlayerBar.jsx   # Music player controls
├── contexts/           # React contexts
│   └── MusicPlayerContext.jsx  # Music player state management
├── data/              # Mock data and API functions
│   └── mockData.js    # Sample songs, playlists, albums
├── pages/             # Page components
│   ├── Home.jsx       # Home page with featured content
│   └── Search.jsx     # Search functionality
└── App.jsx            # Main application component
```

## 🎨 Features in Detail

### Home Page
- Welcome message with personalized greeting
- Featured playlists with hover effects
- Recent albums section
- Trending songs list
- Interactive play buttons

### Search Page
- Real-time search across songs, artists, albums
- Browse categories when no search is active
- Filtered results with play functionality
- No results handling

### Music Player
- Full-featured player bar at the bottom
- Current song information display
- Playback controls (play/pause, next/previous)
- Volume control with visual feedback
- Progress bar with seek functionality
- Repeat and shuffle modes

### Sidebar Navigation
- Clean navigation with active state indicators
- User library section
- Playlist shortcuts
- User profile section

## 🎯 Usage

1. **Browse Music**: Use the sidebar to navigate between different sections
2. **Search**: Click on Search to find specific songs, artists, or albums
3. **Play Music**: Click on any song or playlist to start playing
4. **Control Playback**: Use the player bar at the bottom to control music playback
5. **Adjust Volume**: Use the volume slider in the player bar

## 🔧 Customization

The app uses Tailwind CSS for styling, making it easy to customize:
- Colors can be modified in the Tailwind config
- Layout can be adjusted using Tailwind utility classes
- Mock data can be extended in `src/data/mockData.js`

## 🚀 Future Enhancements

- Real audio playback integration
- User authentication
- Backend API integration
- Offline mode
- Social features (sharing, following)
- Advanced playlist management
- Audio visualization

## 📝 License

This project is for educational purposes and is not affiliated with Spotify.

---

**Note**: This is a frontend demo application. For a production music streaming service, you would need to integrate with a real music API and implement proper audio playback functionality.
