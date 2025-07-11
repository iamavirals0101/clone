import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaSearch, FaMusic, FaList, FaBook, FaSpotify } from 'react-icons/fa';
import { useSpotify } from '../contexts/SpotifyContext';

const navLinks = [
    { to: '/', label: 'Home', icon: <FaHome /> },
    { to: '/search', label: 'Search', icon: <FaSearch /> },
    { to: '/genres', label: 'Genres', icon: <FaMusic /> },
    { to: '/playlists', label: 'Playlists', icon: <FaList /> },
    { to: '/library', label: 'Library', icon: <FaBook /> },
];

function Sidebar() {
    const { isAuthenticated, login, logout, isLoading } = useSpotify();

    return (
        <aside className="spotify-sidebar">
            <div className="spotify-sidebar-logo">
                <svg width="32" height="32" viewBox="0 0 1134 340" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="170" cy="170" r="170" fill="#1DB954" /></svg>
                Spotify
            </div>
            <nav className="flex flex-col gap-2 flex-1">
                {navLinks.map(link => (
                    <NavLink
                        key={link.to}
                        to={link.to}
                        className={({ isActive }) =>
                            isActive ? 'spotify-sidebar-link spotify-sidebar-link-active' : 'spotify-sidebar-link'
                        }
                        end={link.to === '/'}
                    >
                        <span className="text-xl">{link.icon}</span>
                        <span>{link.label}</span>
                    </NavLink>
                ))}
            </nav>
            <div className="mt-8">
                {isAuthenticated ? (
                    <button
                        onClick={logout}
                        className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                        disabled={isLoading}
                    >
                        <FaSpotify className="text-lg" /> Disconnect Spotify
                    </button>
                ) : (
                    <button
                        onClick={login}
                        className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                        disabled={isLoading}
                    >
                        <FaSpotify className="text-lg" /> Connect to Spotify
                    </button>
                )}
            </div>
        </aside>
    );
}

export default Sidebar; 