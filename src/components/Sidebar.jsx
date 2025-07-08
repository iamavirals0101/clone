import React from 'react';
import { useMusicData } from '../contexts/MusicDataContext';
import { useSpotify } from '../contexts/SpotifyContext';

const Sidebar = ({ currentPage, setCurrentPage }) => {
    const { playlists = [], hindiSongs = [] } = useMusicData();
    const { isAuthenticated, login, logout, userPlaylists = [] } = useSpotify();

    const navigationItems = [
        { id: 'home', label: 'Home', icon: '🏠' },
        { id: 'search', label: 'Search', icon: '🔍' },
        { id: 'library', label: 'Library', icon: '📚' },
        { id: 'playlists', label: 'Playlists', icon: '🎵' },
        { id: 'genres', label: 'Genres', icon: '🎼' }
    ];

    return (
        <div className="w-64 bg-gray-800 text-white p-6 flex flex-col">
            {/* Logo */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-green-500">Spotify 2.0</h1>
            </div>

            {/* Spotify Authentication */}
            <div className="mb-6 p-4 bg-gray-700 rounded-lg">
                {isAuthenticated ? (
                    <div className="text-center">
                        <div className="text-green-500 text-2xl mb-2">✅</div>
                        <p className="text-sm text-gray-300 mb-2">Connected to Spotify</p>
                        <button
                            onClick={logout}
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition-colors"
                        >
                            Disconnect
                        </button>
                    </div>
                ) : (
                    <div className="text-center">
                        <div className="text-gray-400 text-2xl mb-2">🎵</div>
                        <p className="text-sm text-gray-300 mb-2">Connect to Spotify</p>
                        <button
                            onClick={login}
                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm transition-colors"
                        >
                            Connect
                        </button>
                    </div>
                )}
            </div>

            {/* Navigation */}
            <nav className="flex-1">
                <ul className="space-y-2">
                    {navigationItems.map((item) => (
                        <li key={item.id}>
                            <button
                                onClick={() => setCurrentPage(item.id)}
                                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${currentPage === item.id
                                    ? 'bg-green-600 text-white'
                                    : 'text-gray-300 hover:bg-gray-700'
                                    }`}
                            >
                                <span className="mr-3">{item.icon}</span>
                                {item.label}
                            </button>
                        </li>
                    ))}
                </ul>

                {/* Divider */}
                <div className="border-t border-gray-600 my-6"></div>

                {/* Playlists */}
                <div className="mb-4">
                    <h3 className="text-sm font-semibold text-gray-400 mb-3">YOUR PLAYLISTS</h3>
                    <ul className="space-y-1">
                        {playlists.map((playlist) => (
                            <li key={playlist.id}>
                                <button
                                    onClick={() => setCurrentPage('playlists')}
                                    className="w-full text-left px-4 py-2 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors text-sm"
                                >
                                    📁 {playlist.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Hindi Songs Playlist */}
                {hindiSongs.length > 0 && (
                    <div className="mb-4">
                        <h3 className="text-sm font-semibold text-gray-400 mb-3">HINDI SONGS</h3>
                        <ul className="space-y-1">
                            <li>
                                <button
                                    onClick={() => setCurrentPage('playlists')}
                                    className="w-full text-left px-4 py-2 rounded-lg text-orange-400 hover:bg-orange-900 transition-colors text-sm"
                                >
                                    🎵 Hindi Hits
                                </button>
                            </li>
                        </ul>
                    </div>
                )}

                {/* Spotify Playlists (if authenticated) */}
                {isAuthenticated && userPlaylists.length > 0 && (
                    <div className="mb-4">
                        <h3 className="text-sm font-semibold text-gray-400 mb-3">SPOTIFY PLAYLISTS</h3>
                        <ul className="space-y-1">
                            {userPlaylists.slice(0, 5).map((playlist) => (
                                <li key={playlist.id}>
                                    <button
                                        onClick={() => setCurrentPage('playlists')}
                                        className="w-full text-left px-4 py-2 rounded-lg text-green-400 hover:bg-green-900 transition-colors text-sm"
                                    >
                                        🎵 {playlist.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </nav>

            {/* Footer */}
            <div className="text-xs text-gray-500 text-center">
                <p>© 2024 Spotify 2.0 Clone</p>
                <p className="mt-1">Built with React & Tailwind</p>
            </div>
        </div>
    );
};

export default Sidebar; 