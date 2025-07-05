import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MusicPlayerProvider } from "./contexts/MusicPlayerContext";
import Sidebar from "./components/Sidebar";
import PlayerBar from "./components/PlayerBar";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Library from "./pages/Library";
import Playlists from "./pages/Playlists";
import Genres from "./pages/Genres";

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
