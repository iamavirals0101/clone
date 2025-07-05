import React, { useState, useMemo } from 'react';
import { songs, playlists, albums } from '../data/mockData';
import useMusicPlayer from '../hooks/useMusicPlayer';

const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const { playSong, playPlaylist } = useMusicPlayer();

    const searchResults = useMemo(() => {
        if (!searchTerm.trim()) return { songs: [], playlists: [], albums: [] };

        const term = searchTerm.toLowerCase();

        const filteredSongs = songs.filter(
            song => song.title.toLowerCase().includes(term) ||
                song.artist.toLowerCase().includes(term) ||
                song.album.toLowerCase().includes(term)
        );

        const filteredPlaylists = playlists.filter(
            playlist => playlist.name.toLowerCase().includes(term) ||
                playlist.description.toLowerCase().includes(term)
        );

        const filteredAlbums = albums.filter(
            album => album.title.toLowerCase().includes(term) ||
                album.artist.toLowerCase().includes(term)
        );

        return {
            songs: filteredSongs,
            playlists: filteredPlaylists,
            albums: filteredAlbums
        };
    }, [searchTerm]);

    const hasResults = searchResults.songs.length > 0 ||
        searchResults.playlists.length > 0 ||
        searchResults.albums.length > 0;

    return (
        <div className="p-8 space-y-8">
            {/* Search Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-white mb-4">Search</h1>
                <div className="relative max-w-md">
                    <input
                        type="text"
                        placeholder="What do you want to listen to?"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        🔍
                    </div>
                </div>
            </div>

            {/* Search Results */}
            {searchTerm && (
                <div className="space-y-8">
                    {!hasResults && (
                        <div className="text-center py-12">
                            <p className="text-gray-400 text-lg">No results found for "{searchTerm}"</p>
                            <p className="text-gray-500 text-sm mt-2">Try searching for a different term</p>
                        </div>
                    )}

                    {/* Songs Results */}
                    {searchResults.songs.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-6">Songs</h2>
                            <div className="space-y-2">
                                {searchResults.songs.map((song, index) => (
                                    <div
                                        key={song.id}
                                        className="flex items-center justify-between p-3 hover:bg-gray-800 rounded-lg cursor-pointer group"
                                        onClick={() => playSong(song, searchResults.songs)}
                                    >
                                        <div className="flex items-center space-x-4">
                                            <span className="text-gray-400 w-8">{index + 1}</span>
                                            <img
                                                src={song.cover}
                                                alt={song.title}
                                                className="w-12 h-12 rounded object-cover"
                                            />
                                            <div>
                                                <h4 className="text-white font-medium">{song.title}</h4>
                                                <p className="text-gray-400 text-sm">{song.artist}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <span className="text-gray-400 text-sm">{song.duration}</span>
                                            <button className="text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                                ▶
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Playlists Results */}
                    {searchResults.playlists.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-6">Playlists</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                                {searchResults.playlists.map((playlist) => (
                                    <div
                                        key={playlist.id}
                                        className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer group"
                                        onClick={() => playPlaylist(playlist)}
                                    >
                                        <div className="relative mb-4">
                                            <img
                                                src={playlist.cover}
                                                alt={playlist.name}
                                                className="w-full aspect-square object-cover rounded-md"
                                            />
                                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all rounded-md flex items-center justify-center">
                                                <button className="bg-green-500 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                                    ▶
                                                </button>
                                            </div>
                                        </div>
                                        <h3 className="text-white font-semibold truncate">{playlist.name}</h3>
                                        <p className="text-gray-400 text-sm truncate">{playlist.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Albums Results */}
                    {searchResults.albums.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-6">Albums</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                                {searchResults.albums.map((album) => (
                                    <div
                                        key={album.id}
                                        className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer group"
                                    >
                                        <div className="relative mb-4">
                                            <img
                                                src={album.cover}
                                                alt={album.title}
                                                className="w-full aspect-square object-cover rounded-md"
                                            />
                                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all rounded-md flex items-center justify-center">
                                                <button className="bg-green-500 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                                    ▶
                                                </button>
                                            </div>
                                        </div>
                                        <h3 className="text-white font-semibold truncate">{album.title}</h3>
                                        <p className="text-gray-400 text-sm truncate">{album.artist}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            )}

            {/* Browse Categories when no search */}
            {!searchTerm && (
                <div className="space-y-8">
                    <h2 className="text-2xl font-bold text-white mb-6">Browse All</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                        {['Pop', 'Hip Hop', 'Rock', 'Electronic', 'R&B', 'Country', 'Jazz', 'Classical', 'Latin', 'K-Pop', 'Indie', 'Folk'].map((genre) => (
                            <div
                                key={genre}
                                className="bg-gradient-to-br from-purple-600 to-pink-600 p-4 rounded-lg hover:scale-105 transition-transform cursor-pointer"
                            >
                                <h3 className="text-white font-semibold text-lg">{genre}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Search; 