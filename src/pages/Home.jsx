import React from 'react';
import useMusicPlayer from '../hooks/useMusicPlayer';
import { useMusicData } from '../contexts/MusicDataContext';

const Home = () => {
    const { playPlaylist, playSong } = useMusicPlayer();
    const { songs, playlists, albums, isLoading, error } = useMusicData();

    // Filter famous songs
    const famousSongs = songs.filter(song => song.isFamous);

    // Filter Hindi songs
    const hindiSongs = songs.filter(song => song.isHindi);

    if (isLoading) {
        return (
            <div className="p-8 flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
                    <p className="text-gray-400">Loading your music...</p>
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
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="p-8 space-y-8">
            {/* Welcome Section */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-white mb-2">Good afternoon</h1>
                <p className="text-gray-400">Welcome back to Spotify 2.0</p>
            </div>

            {/* Famous Songs Section */}
            {famousSongs.length > 0 && (
                <section>
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                        <span className="text-yellow-400 mr-2">⭐</span>
                        Famous Songs (Inspired Versions)
                    </h2>
                    <p className="text-gray-400 text-sm mb-4">
                        Free music inspired by iconic tracks - featuring real audio from Bensound
                    </p>
                    <div className="space-y-2">
                        {famousSongs.map((song, index) => (
                            <div
                                key={song.id}
                                className="flex items-center justify-between p-3 hover:bg-gray-800 rounded-lg cursor-pointer group bg-gradient-to-r from-gray-800 to-gray-700"
                                onClick={() => playSong(song, famousSongs)}
                            >
                                <div className="flex items-center space-x-4">
                                    <span className="text-yellow-400 w-8 font-bold">{index + 1}</span>
                                    <img
                                        src={song.cover}
                                        alt={song.title}
                                        className="w-12 h-12 rounded object-cover"
                                    />
                                    <div>
                                        <h4 className="text-white font-medium">{song.title}</h4>
                                        <p className="text-gray-400 text-sm">{song.artist}</p>
                                        <p className="text-gray-500 text-xs">{song.album}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <span className="text-gray-400 text-sm">{song.duration}</span>
                                    <button className="text-yellow-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                        ▶
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Hindi Songs Section */}
            {hindiSongs.length > 0 && (
                <section>
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                        <span className="text-orange-400 mr-2">🎵</span>
                        Hindi Songs (Inspired Versions)
                    </h2>
                    <p className="text-gray-400 text-sm mb-4">
                        Popular Hindi tracks with real audio from Bensound - featuring actual music
                    </p>
                    <div className="space-y-2">
                        {hindiSongs.map((song, index) => (
                            <div
                                key={song.id}
                                className="flex items-center justify-between p-3 hover:bg-gray-800 rounded-lg cursor-pointer group bg-gradient-to-r from-orange-900 to-orange-800"
                                onClick={() => playSong(song, hindiSongs)}
                            >
                                <div className="flex items-center space-x-4">
                                    <span className="text-orange-400 w-8 font-bold">{index + 1}</span>
                                    <img
                                        src={song.cover}
                                        alt={song.title}
                                        className="w-12 h-12 rounded object-cover"
                                    />
                                    <div>
                                        <h4 className="text-white font-medium">{song.title}</h4>
                                        <p className="text-gray-300 text-sm">{song.artist}</p>
                                        <p className="text-gray-400 text-xs">{song.album}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <span className="text-gray-300 text-sm">{song.duration}</span>
                                    <button className="text-orange-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                        ▶
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Featured Playlists */}
            {playlists.length > 0 && (
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
            )}

            {/* Recent Albums */}
            {albums.length > 0 && (
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
            )}

            {/* Trending Songs */}
            {songs.length > 0 && (
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
            )}

            {/* No Content State */}
            {songs.length === 0 && playlists.length === 0 && albums.length === 0 && !isLoading && !error && (
                <div className="text-center py-12">
                    <div className="text-6xl mb-4">🎵</div>
                    <h3 className="text-xl font-semibold text-white mb-2">No music available</h3>
                    <p className="text-gray-400">Check your internet connection and try again</p>
                </div>
            )}
        </div>
    );
};

export default Home; 