import React from 'react';
import { genres, songs } from '../data/mockData';
import useMusicPlayer from '../hooks/useMusicPlayer';

const Genres = () => {
    const { playSong } = useMusicPlayer();

    const handleGenreClick = (genre) => {
        console.log(`Genre ${genre.name} clicked`);
        // You can add specific functionality for each genre
    };

    const handleSongClick = (song) => {
        playSong(song, songs);
    };

    return (
        <div className="p-8 space-y-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-white mb-2">Genres</h1>
                <p className="text-gray-400">Discover music by genre</p>
            </div>

            {/* Genres Grid */}
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

            {/* Popular Songs by Genre */}
            <div className="mt-12">
                <h2 className="text-2xl font-bold text-white mb-6">Popular Songs</h2>
                <div className="space-y-2">
                    {songs.slice(0, 8).map((song, index) => (
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