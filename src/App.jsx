import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MusicPlayerProvider } from "./contexts/MusicPlayerContext";
import Sidebar from "./components/Sidebar";
import PlayerBar from "./components/PlayerBar";
import Home from "./pages/Home";
import Search from "./pages/Search";

// Placeholder components for other pages
const Library = () => (
  <div className="p-8">
    <h1 className="text-4xl font-bold text-white mb-6">Your Library</h1>
    <p className="text-gray-400">Your saved songs, albums, and playlists will appear here.</p>
  </div>
);

const Playlists = () => (
  <div className="p-8">
    <h1 className="text-4xl font-bold text-white mb-6">Playlists</h1>
    <p className="text-gray-400">All your playlists will be displayed here.</p>
  </div>
);

const Genres = () => (
  <div className="p-8">
    <h1 className="text-4xl font-bold text-white mb-6">Genres</h1>
    <p className="text-gray-400">Browse music by genre.</p>
  </div>
);

function App() {
  return (
    <MusicPlayerProvider>
      <Router>
        <div className="flex h-screen w-screen overflow-hidden">
          <Sidebar />
          <div className="flex flex-col flex-1 relative">
            <main className="flex-1 bg-gray-950 text-white overflow-y-auto" style={{ paddingBottom: '6rem' }}>
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
      </Router>
    </MusicPlayerProvider>
  );
}

export default App;
