import React, { useState, useEffect } from 'react';
import useMusicPlayer from '../hooks/useMusicPlayer';
import { useMusicData } from '../contexts/MusicDataContext';

const Genres = () => {
    const { playSong } = useMusicPlayer();
    const { genres, songs, isLoading, error, getTracksByGenre } = useMusicData();
    const [genreTracks, setGenreTracks] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState(null);

    const handleGenreClick = async (genre) => {
        setSelectedGenre(genre.name);
        const tracks = await getTracksByGenre(genre.name);
        setGenreTracks(tracks);
    };

    const handleSongClick = (song) => {
        playSong(song, genreTracks.length > 0 ? genreTracks : songs);
    };

    if (isLoading) {
        return (
            <div className="p-8 flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
                    <p className="text-gray-400">Loading genres...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-8 flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="text-6xl mb-4">⚠️</div>
                    <h2 className="text-xl font-semibold text-white mb-2">Oops! Something went wrong</h2>
                    <p className="text-gray-400">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-8 space-y-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-white mb-2">Genres</h1>
                <p className="text-gray-400">Discover music by genre</p>
            </div>

            {/* Genres Grid */}
            {genres.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                    {genres.map((genre) => (
                        <div
                            key={genre.id}
                            className="relative h-48 rounded-lg overflow-hidden cursor-pointer group"
                            onClick={() => handleGenreClick(genre)}
                            style={{ backgroundColor: genre.color }}
                        >
                            <img
                                src={genre.cover}
                                alt={genre.name}
                                className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <h3 className="text-white font-bold text-xl text-center px-4">
                                    {genre.name}
                                </h3>
                            </div>
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all"></div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <div className="text-6xl mb-4">🎼</div>
                    <h3 className="text-xl font-semibold text-white mb-2">No genres available</h3>
                    <p className="text-gray-400">Check your internet connection and try again</p>
                </div>
            )}

            {/* Popular Songs by Genre */}
            <div className="mt-12">
                <h2 className="text-2xl font-bold text-white mb-6">
                    {selectedGenre ? `${selectedGenre} Songs` : 'Popular Songs'}
                </h2>
                <div className="space-y-2">
                    {(genreTracks.length > 0 ? genreTracks : songs.slice(0, 8)).map((song, index) => (
                        <div
                            key={song.id}
                            className="flex items-center justify-between p-3 hover:bg-gray-800 rounded-lg cursor-pointer group"
                            onClick={() => handleSongClick(song)}
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
                                    {song.genre && (
                                        <p className="text-gray-500 text-xs">{song.genre}</p>
                                    )}
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
            </div>
        </div>
    );
};

export default Genres; 