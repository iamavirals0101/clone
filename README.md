# Spotify 2.0 Clone

A modern, feature-rich music streaming application built with React, Tailwind CSS, and Vite. This project replicates the core functionality of Spotify with an enhanced user experience and **real music API integration**.

## 🎵 Features

### Core Features
- **Real Music API Integration** - Powered by Jamendo Music API for authentic music content
- **Free Music Collection** - Curated free music from Bensound and other sources
- **Music Playlists** - Browse and play curated playlists with real audio
- **Search Functionality** - Real-time search across songs, artists, albums, and playlists
- **Player Controls** - Full-featured music player with play/pause, next/previous, volume control
- **Albums & Genres** - Browse music by albums and genres with dynamic content
- **Responsive Design** - Works seamlessly on all devices

### Player Features
- **Real Audio Playback** - Actual music streaming with HTML5 Audio API
- Play/Pause controls with loading states
- Next/Previous track navigation
- Volume control with slider
- Progress bar with seek functionality
- Repeat modes (None, One, All)
- Shuffle functionality
- Current song display with cover art
- Error handling for audio playback

### Navigation
- Home page with featured content from API
- Search page with real-time API search
- Library section with dynamic content
- Playlists management with real music
- Genre browsing with API-powered content

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Internet connection for API access

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
- **Context API** - State management for music player and data
- **Axios** - HTTP client for API requests
- **Jamendo Music API** - Free music API with proper licensing

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Sidebar.jsx     # Navigation sidebar
│   └── PlayerBar.jsx   # Music player controls
├── contexts/           # React contexts
│   ├── MusicPlayerContext.jsx  # Music player state management
│   └── MusicDataContext.jsx    # API data management
├── services/           # API services
│   └── musicApi.js     # Jamendo API integration
├── data/              # Mock data and API functions
│   └── mockData.js    # Fallback data (legacy)
├── pages/             # Page components
│   ├── Home.jsx       # Home page with featured content
│   ├── Search.jsx     # Search functionality
│   ├── Library.jsx    # User library
│   ├── Playlists.jsx  # Playlist management
│   └── Genres.jsx     # Genre browsing
└── App.jsx            # Main application component
```

## 🎨 Features in Detail

### Home Page
- Welcome message with personalized greeting
- Featured playlists with real music from API
- Recent albums section with dynamic content
- Trending songs list with actual audio
- Interactive play buttons with loading states

### Search Page
- **Real-time API search** with debounced input
- Search across songs, artists, albums from multiple sources
- Browse categories when no search is active
- Filtered results with play functionality
- Loading states and error handling
- No results handling with helpful suggestions

### Music Player
- **Real audio streaming** from multiple sources
- Full-featured player bar at the bottom
- Current song information display
- Playback controls (play/pause, next/previous)
- Volume control with visual feedback
- Progress bar with seek functionality
- Repeat and shuffle modes
- Error handling for failed audio playback

### Sidebar Navigation
- Clean navigation with active state indicators
- User library section
- Dynamic playlist shortcuts from API
- User profile section

## 🔌 API Integration

### Jamendo Music API
- **Free music with proper licensing**
- Popular tracks and trending music
- Genre-based music discovery
- Search functionality across their catalog
- High-quality audio streams

### Free Music Sources
- **Bensound** - High-quality free music
- Multiple genres: Pop, Rock, Electronic, Jazz, Acoustic, Folk
- Proper attribution and licensing
- Reliable audio streams

### API Features
- **Fallback system** - If API fails, uses free music collection
- **Error handling** - Graceful degradation when services are unavailable
- **Loading states** - User feedback during API calls
- **Caching** - Efficient data management
- **Search debouncing** - Optimized search performance

## 🎯 Usage

1. **Browse Music**: Use the sidebar to navigate between different sections
2. **Search**: Click on Search to find specific songs, artists, or albums using real API
3. **Play Music**: Click on any song or playlist to start playing real audio
4. **Control Playback**: Use the player bar at the bottom to control music playback
5. **Adjust Volume**: Use the volume slider in the player bar
6. **Discover Genres**: Explore music by genre with API-powered content

## 🔧 Customization

The app uses Tailwind CSS for styling, making it easy to customize:
- Colors can be modified in the Tailwind config
- Layout can be adjusted using Tailwind utility classes
- API endpoints can be configured in `src/services/musicApi.js`
- Additional music sources can be added to the service

## 🚀 Future Enhancements

- User authentication and personal playlists
- Backend API integration for user data
- Offline mode with cached music
- Social features (sharing, following)
- Advanced playlist management
- Audio visualization
- Multiple music service integration
- User preferences and recommendations

## 📝 API Keys and Configuration

The app uses a free Jamendo API key for demo purposes. For production use:
1. Register at [Jamendo Developer Portal](https://developer.jamendo.com/)
2. Get your own API key
3. Replace the key in `src/services/musicApi.js`

## 🔒 Licensing

- **Jamendo Music**: Licensed under Creative Commons
- **Bensound Music**: Free for personal and commercial use with attribution
- **Project Code**: MIT License

## 📝 License

This project is for educational purposes and is not affiliated with Spotify.

---

**Note**: This application now features real music streaming with API integration. The music is properly licensed and sourced from free music APIs and collections.
