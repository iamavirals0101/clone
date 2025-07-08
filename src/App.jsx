import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import PlayerBar from './components/PlayerBar';
import Home from './pages/Home';
import Search from './pages/Search';
import Library from './pages/Library';
import Playlists from './pages/Playlists';
import Genres from './pages/Genres';
import Callback from './pages/Callback';
import { MusicPlayerProvider } from './contexts/MusicPlayerContext';
import { MusicDataProvider } from './contexts/MusicDataContext';
import { SpotifyProvider } from './contexts/SpotifyContext';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'search':
        return <Search />;
      case 'library':
        return <Library />;
      case 'playlists':
        return <Playlists />;
      case 'genres':
        return <Genres />;
      default:
        return <Home />;
    }
  };

  // Check if we're on the callback page
  if (window.location.pathname === '/callback') {
    return (
      <SpotifyProvider>
        <Callback />
      </SpotifyProvider>
    );
  }

  return (
    <SpotifyProvider>
      <MusicDataProvider>
        <MusicPlayerProvider>
          <div className="flex h-screen bg-gray-900">
            <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
            <div className="flex-1 flex flex-col">
              <main className="flex-1 overflow-y-auto p-6">
                {renderPage()}
              </main>
              <PlayerBar />
            </div>
          </div>
        </MusicPlayerProvider>
      </MusicDataProvider>
    </SpotifyProvider>
  );
}

export default App;
