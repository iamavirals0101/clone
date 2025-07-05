import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { playlists } from '../data/mockData';
import useMusicPlayer from '../hooks/useMusicPlayer';

const Sidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { playPlaylist } = useMusicPlayer();
    const [activePlaylist, setActivePlaylist] = useState(null);

    const navItems = [
        { path: '/', label: 'Home', icon: '🏠' },
        { path: '/search', label: 'Search', icon: '🔍' },
        { path: '/library', label: 'Your Library', icon: '📚' },
        { path: '/playlists', label: 'Playlists', icon: '🎵' },
        { path: '/genres', label: 'Genres', icon: '🎼' }
    ];

    const isActive = (path) => location.pathname === path;

    const handlePlaylistClick = (playlist) => {
        setActivePlaylist(playlist.id);
        playPlaylist(playlist);
        // Navigate to home to show the playing playlist
        navigate('/');
    };

    const handleLibraryItemClick = (item) => {
        console.log(`${item} clicked`);
        // You can add specific functionality for each library item
        switch (item) {
            case 'liked':
                navigate('/library');
                break;
            case 'downloads':
                navigate('/library');
                break;
            case 'podcasts':
                navigate('/library');
                break;
            default:
                break;
        }
    };

    const handleUserSettings = () => {
        console.log('User settings clicked');
        // You can add user settings functionality here
    };

    return (
        <aside className="w-60 h-full bg-gray-900 text-white flex flex-col">
            {/* Logo */}
            <div className="p-6">
                <h1 className="text-2xl font-bold text-green-500 cursor-pointer" onClick={() => navigate('/')}>
                    Spotify 2.0
                </h1>
            </div>

            {/* Navigation */}
            <nav className="px-6 mb-8">
                <ul className="space-y-2">
                    {navItems.map((item) => (
                        <li key={item.path}>
                            <Link
                                to={item.path}
                                className={`flex items-center space-x-3 px-3 py-2 rounded-md transition-colors ${isActive(item.path)
                                    ? 'bg-gray-800 text-white'
                                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                                    }`}
                            >
                                <span className="text-lg">{item.icon}</span>
                                <span className="font-medium">{item.label}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Your Library */}
            <div className="px-6 mb-6">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                    Your Library
                </h3>
                <div className="space-y-2">
                    <button
                        className="flex items-center space-x-3 px-3 py-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 transition-colors w-full text-left"
                        onClick={() => handleLibraryItemClick('liked')}
                    >
                        <span>❤️</span>
                        <span>Liked Songs</span>
                    </button>
                    <button
                        className="flex items-center space-x-3 px-3 py-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 transition-colors w-full text-left"
                        onClick={() => handleLibraryItemClick('downloads')}
                    >
                        <span>📥</span>
                        <span>Downloads</span>
                    </button>
                    <button
                        className="flex items-center space-x-3 px-3 py-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 transition-colors w-full text-left"
                        onClick={() => handleLibraryItemClick('podcasts')}
                    >
                        <span>📻</span>
                        <span>Podcasts</span>
                    </button>
                </div>
            </div>

            {/* Playlists */}
            <div className="px-6 flex-1 overflow-y-auto">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                    Playlists
                </h3>
                <div className="space-y-2">
                    {playlists.map((playlist) => (
                        <button
                            key={playlist.id}
                            className={`flex items-center space-x-3 px-3 py-2 rounded-md transition-colors w-full text-left ${activePlaylist === playlist.id
                                    ? 'bg-gray-800 text-white'
                                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                                }`}
                            onClick={() => handlePlaylistClick(playlist)}
                        >
                            <img
                                src={playlist.cover}
                                alt={playlist.name}
                                className="w-8 h-8 rounded object-cover"
                            />
                            <div className="min-w-0 flex-1">
                                <p className="text-sm font-medium truncate">{playlist.name}</p>
                                <p className="text-xs text-gray-500 truncate">{playlist.description}</p>
                            </div>
                            {activePlaylist === playlist.id && (
                                <span className="text-green-500">▶️</span>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* User Section */}
            <div className="p-6 border-t border-gray-800">
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-600 transition-colors">
                        👤
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">User Name</p>
                        <p className="text-xs text-gray-400 truncate">Premium</p>
                    </div>
                    <button
                        className="text-gray-400 hover:text-white transition-colors"
                        onClick={handleUserSettings}
                    >
                        ⚙️
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar; 