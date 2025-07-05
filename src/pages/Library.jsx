import React, { useState } from 'react';
import { songs } from '../data/mockData';
import useMusicPlayer from '../hooks/useMusicPlayer';

const Library = () => {
    const { playSong } = useMusicPlayer();
    const [activeTab, setActiveTab] = useState('liked');

    const tabs = [
        { id: 'liked', label: 'Liked Songs', icon: '❤️' },
        { id: 'downloads', label: 'Downloads', icon: '📥' },
        { id: 'podcasts', label: 'Podcasts', icon: '📻' }
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'liked':
                return (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-white mb-6">Liked Songs</h2>
                        <div className="space-y-2">
                            {songs.slice(0, 5).map((song, index) => (
                                <div
                                    key={song.id}
                                    className="flex items-center justify-between p-3 hover:bg-gray-800 rounded-lg cursor-pointer group"
                                    onClick={() => playSong(song, songs.slice(0, 5))}
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
                );
            case 'downloads':
                return (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-white mb-6">Downloads</h2>
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">📥</div>
                            <h3 className="text-xl font-semibold text-white mb-2">No downloads yet</h3>
                            <p className="text-gray-400">Download your favorite songs to listen offline</p>
                        </div>
                    </div>
                );
            case 'podcasts':
                return (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-white mb-6">Podcasts</h2>
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">📻</div>
                            <h3 className="text-xl font-semibold text-white mb-2">No podcasts yet</h3>
                            <p className="text-gray-400">Discover and subscribe to your favorite podcasts</p>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="p-8 space-y-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-white mb-2">Your Library</h1>
                <p className="text-gray-400">Manage your music and podcasts</p>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-800">
                <div className="flex space-x-8">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium transition-colors ${activeTab === tab.id
                                    ? 'border-green-500 text-white'
                                    : 'border-transparent text-gray-400 hover:text-white'
                                }`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            <span>{tab.icon}</span>
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Content */}
            <div className="min-h-96">
                {renderContent()}
            </div>
        </div>
    );
};

export default Library; 