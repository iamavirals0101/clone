import React, { useState, useEffect } from 'react';
import { useSpotify } from '../contexts/SpotifyContext';
import useMusicPlayer from '../hooks/useMusicPlayer';

const Search = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const { searchTracks, isAuthenticated, spotifyTracks, error } = useSpotify();
    const { playSong } = useMusicPlayer();

    // Search when query changes
    useEffect(() => {
        if (searchQuery.trim() && isAuthenticated) {
            const delayDebounceFn = setTimeout(async () => {
                setIsSearching(true);
                try {
                    const results = await searchTracks(searchQuery, 20);
                    setSearchResults(results);
                } catch (error) {
                    console.error('Search error:', error);
                } finally {
                    setIsSearching(false);
                }
            }, 500);

            return () => clearTimeout(delayDebounceFn);
        } else {
            setSearchResults([]);
        }
    }, [searchQuery, isAuthenticated, searchTracks]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim() && isAuthenticated) {
            setIsSearching(true);
            searchTracks(searchQuery, 20).then(results => {
                setSearchResults(results);
                setIsSearching(false);
            });
        }
    };

    const handlePlaySong = (song) => {
        if (song.spotifyUri) {
            // For Spotify tracks, we'll use the preview URL if available
            if (song.audio) {
                playSong(song, searchResults);
            } else {
                alert('This track is not available for preview. Please play it on Spotify.');
            }
        } else {
            playSong(song, searchResults);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gray-900 text-white p-8">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold mb-8">Search</h1>
                    <div className="text-center py-12">
                        <div className="text-gray-400 text-6xl mb-4">🔍</div>
                        <h2 className="text-2xl font-semibold mb-4">Connect to Spotify to Search</h2>
                        <p className="text-gray-400 mb-6">
                            Connect your Spotify account to search and play millions of songs.
                        </p>
                        <div className="bg-gray-800 p-6 rounded-lg max-w-md mx-auto">
                            <p className="text-sm text-gray-300 mb-4">
                                Features you'll get:
                            </p>
                            <ul className="text-sm text-gray-400 space-y-2">
                                <li>• Search millions of tracks</li>
                                <li>• Play previews of songs</li>
                                <li>• Access your playlists</li>
                                <li>• Get personalized recommendations</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">Search</h1>

                {/* Search Form */}
                <form onSubmit={handleSearch} className="mb-8">
                    <div className="relative">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search for songs, artists, or albums..."
                            className="w-full px-4 py-3 pl-12 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                            🔍
                        </div>
                        {isSearching && (
                            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-green-500"></div>
                            </div>
                        )}
                    </div>
                </form>

                {/* Error Message */}
                {error && (
                    <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded-lg mb-6">
                        {error}
                    </div>
                )}

                {/* Search Results */}
                {searchResults.length > 0 && (
                    <div>
                        <h2 className="text-xl font-semibold mb-4">
                            Search Results ({searchResults.length})
                        </h2>
                        <div className="grid gap-4">
                            {searchResults.map((song, index) => (
                                <div
                                    key={song.id}
                                    className="flex items-center justify-between p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer"
                                    onClick={() => handlePlaySong(song)}
                                >
                                    <div className="flex items-center space-x-4">
                                        <span className="text-gray-400 w-8 font-bold">{index + 1}</span>
                                        <img
                                            src={song.cover}
                                            alt={song.title}
                                            className="w-12 h-12 rounded object-cover"
                                        />
                                        <div>
                                            <h3 className="text-white font-medium">{song.title}</h3>
                                            <p className="text-gray-300 text-sm">{song.artist}</p>
                                            <p className="text-gray-400 text-xs">{song.album}</p>
                                            {song.isSpotify && (
                                                <span className="inline-block bg-green-600 text-white text-xs px-2 py-1 rounded mt-1">
                                                    Spotify
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <span className="text-gray-300 text-sm">{song.duration}</span>
                                        <button className="text-green-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                            ▶
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* No Results */}
                {searchQuery && !isSearching && searchResults.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-gray-400 text-6xl mb-4">🎵</div>
                        <h2 className="text-2xl font-semibold mb-4">No results found</h2>
                        <p className="text-gray-400">
                            Try searching for a different song, artist, or album.
                        </p>
                    </div>
                )}

                {/* Initial State */}
                {!searchQuery && (
                    <div className="text-center py-12">
                        <div className="text-gray-400 text-6xl mb-4">🎵</div>
                        <h2 className="text-2xl font-semibold mb-4">Search for Music</h2>
                        <p className="text-gray-400 mb-6">
                            Search for your favorite songs, artists, or albums to start listening.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                            <div className="bg-gray-800 p-4 rounded-lg">
                                <div className="text-2xl mb-2">🎤</div>
                                <h3 className="font-semibold mb-2">Artists</h3>
                                <p className="text-sm text-gray-400">Find your favorite artists</p>
                            </div>
                            <div className="bg-gray-800 p-4 rounded-lg">
                                <div className="text-2xl mb-2">🎵</div>
                                <h3 className="font-semibold mb-2">Songs</h3>
                                <p className="text-sm text-gray-400">Discover new tracks</p>
                            </div>
                            <div className="bg-gray-800 p-4 rounded-lg">
                                <div className="text-2xl mb-2">💿</div>
                                <h3 className="font-semibold mb-2">Albums</h3>
                                <p className="text-sm text-gray-400">Explore full albums</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Search; 