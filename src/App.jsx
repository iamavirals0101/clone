import React from 'react';
import Sidebar from './components/Sidebar';
import PlayerBar from './components/PlayerBar';
import Home from './pages/Home';
import Search from './pages/Search';
import Library from './pages/Library';
import Playlists from './pages/Playlists';
import Genres from './pages/Genres';
import Callback from './pages/Callback';
import LocalMusicLibrary from './components/LocalMusicLibrary';
import { MusicPlayerProvider } from './contexts/MusicPlayerContext';
import { MusicDataProvider } from './contexts/MusicDataContext';
import { SpotifyProvider } from './contexts/SpotifyContext';
import { Routes, Route } from 'react-router-dom';

function App() {
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
            <Sidebar />
            <div className="flex-1 flex flex-col">
              <main className="flex-1 overflow-y-auto p-6">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/library" element={<Library />} />
                  <Route path="/playlists" element={<Playlists />} />
                  <Route path="/genres" element={<Genres />} />
                </Routes>
              </main>
              <PlayerBar />
            </div>
          </div>
          {/* Add LocalMusicLibrary at the bottom of the app */}
          <div className="fixed bottom-0 left-0 w-full z-50 bg-white border-t border-gray-200">
            <LocalMusicLibrary />
          </div>
        </MusicPlayerProvider>
      </MusicDataProvider>
    </SpotifyProvider>
  );
}

export default App;
