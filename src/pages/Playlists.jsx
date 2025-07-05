import React from 'react';
import { playlists } from '../data/mockData';
import useMusicPlayer from '../hooks/useMusicPlayer';

const Playlists = () => {
    const { playPlaylist } = useMusicPlayer();

    const handlePlaylistClick = (playlist) => {
        playPlaylist(playlist);
    };

    return (
        <div className="p-8 space-y-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-white mb-2">Playlists</h1>
                <p className="text-gray-400">Your music collections</p>
            </div>

            {/* Playlists Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {playlists.map((playlist) => (
                    <div
                        key={playlist.id}
                        className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer group"
                        onClick={() => handlePlaylistClick(playlist)}
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
                        <h3 className="text-white font-semibold truncate mb-1">{playlist.name}</h3>
                        <p className="text-gray-400 text-sm truncate mb-2">{playlist.description}</p>
                        <p className="text-gray-500 text-xs">{playlist.songs.length} songs</p>
                    </div>
                ))}
            </div>

            {/* Create New Playlist */}
            <div className="mt-12">
                <h2 className="text-2xl font-bold text-white mb-6">Create New Playlist</h2>
                <div className="bg-gray-800 p-6 rounded-lg border-2 border-dashed border-gray-600 hover:border-gray-500 transition-colors cursor-pointer">
                    <div className="text-center">
                        <div className="text-4xl mb-4">➕</div>
                        <h3 className="text-lg font-semibold text-white mb-2">Create a new playlist</h3>
                        <p className="text-gray-400">Start building your perfect music collection</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Playlists; 