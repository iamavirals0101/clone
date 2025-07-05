import React from 'react';
import { playlists, albums, songs } from '../data/mockData';
import useMusicPlayer from '../hooks/useMusicPlayer';

const Home = () => {
    const { playPlaylist, playSong } = useMusicPlayer();

    return (
        <div className="p-8 space-y-8">
            {/* Welcome Section */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-white mb-2">Good afternoon</h1>
                <p className="text-gray-400">Welcome back to Spotify 2.0</p>
            </div>

            {/* Featured Playlists */}
            <section>
                <h2 className="text-2xl font-bold text-white mb-6">Featured Playlists</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                    {playlists.map((playlist) => (
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

            {/* Recent Albums */}
            <section>
                <h2 className="text-2xl font-bold text-white mb-6">Recent Albums</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                    {albums.map((album) => (
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

            {/* Trending Songs */}
            <section>
                <h2 className="text-2xl font-bold text-white mb-6">Trending Now</h2>
                <div className="space-y-2">
                    {songs.slice(0, 6).map((song, index) => (
                        <div
                            key={song.id}
                            className="flex items-center justify-between p-3 hover:bg-gray-800 rounded-lg cursor-pointer group"
                            onClick={() => playSong(song, songs.slice(0, 6))}
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
        </div>
    );
};

export default Home; 