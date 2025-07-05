import React from 'react';
import useMusicPlayer from '../hooks/useMusicPlayer';

const PlayerBar = () => {
    const {
        currentSong,
        isPlaying,
        togglePlay,
        nextSong,
        previousSong,
        volume,
        setVolume,
        repeat,
        toggleRepeat,
        shuffle,
        toggleShuffle,
        currentTime,
        duration,
        seekTo,
        isLoading
    } = useMusicPlayer();

    const formatTime = (seconds) => {
        if (!seconds || isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleProgressChange = (e) => {
        const value = parseFloat(e.target.value);
        const newTime = (value / 100) * duration;
        seekTo(newTime);
    };

    const handleVolumeChange = (e) => {
        setVolume(parseFloat(e.target.value));
    };

    const getRepeatIcon = () => {
        switch (repeat) {
            case 'none': return '🔁';
            case 'one': return '🔂';
            case 'all': return '🔁';
            default: return '🔁';
        }
    };

    const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

    if (!currentSong) {
        return (
            <footer className="h-24 bg-gray-800 text-white flex items-center justify-center">
                <p className="text-gray-400">No song playing</p>
            </footer>
        );
    }

    return (
        <footer className="h-24 bg-gray-800 text-white flex items-center justify-between px-8 fixed bottom-0 left-0 w-full z-10">
            {/* Left - Current Song Info */}
            <div className="flex items-center space-x-4 flex-1">
                <img
                    src={currentSong.cover}
                    alt={currentSong.title}
                    className="w-14 h-14 rounded object-cover"
                />
                <div className="min-w-0">
                    <h4 className="text-white font-medium truncate">{currentSong.title}</h4>
                    <p className="text-gray-400 text-sm truncate">{currentSong.artist}</p>
                </div>
                <button className="text-gray-400 hover:text-white">
                    ❤️
                </button>
            </div>

            {/* Center - Player Controls */}
            <div className="flex flex-col items-center space-y-2 flex-1">
                {/* Control Buttons */}
                <div className="flex items-center space-x-6">
                    <button
                        onClick={toggleShuffle}
                        className={`text-lg ${shuffle ? 'text-green-500' : 'text-gray-400 hover:text-white'}`}
                    >
                        🔀
                    </button>
                    <button
                        onClick={previousSong}
                        className="text-2xl text-gray-400 hover:text-white"
                    >
                        ⏮
                    </button>
                    <button
                        onClick={togglePlay}
                        disabled={isLoading}
                        className="bg-white text-black w-10 h-10 rounded-full flex items-center justify-center hover:scale-105 transition-transform disabled:opacity-50"
                    >
                        {isLoading ? '⏳' : isPlaying ? '⏸' : '▶'}
                    </button>
                    <button
                        onClick={nextSong}
                        className="text-2xl text-gray-400 hover:text-white"
                    >
                        ⏭
                    </button>
                    <button
                        onClick={toggleRepeat}
                        className={`text-lg ${repeat !== 'none' ? 'text-green-500' : 'text-gray-400 hover:text-white'}`}
                    >
                        {getRepeatIcon()}
                    </button>
                </div>

                {/* Progress Bar */}
                <div className="flex items-center space-x-2 w-full max-w-md">
                    <span className="text-xs text-gray-400 w-10">
                        {formatTime(currentTime)}
                    </span>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={progressPercentage}
                        onChange={handleProgressChange}
                        className="flex-1 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <span className="text-xs text-gray-400 w-10">
                        {formatTime(duration)}
                    </span>
                </div>
            </div>

            {/* Right - Volume Control */}
            <div className="flex items-center space-x-4 flex-1 justify-end">
                <button className="text-gray-400 hover:text-white">
                    📻
                </button>
                <button className="text-gray-400 hover:text-white">
                    📋
                </button>
                <div className="flex items-center space-x-2">
                    <span className="text-gray-400">🔊</span>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={volume}
                        onChange={handleVolumeChange}
                        className="w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                    />
                </div>
            </div>
        </footer>
    );
};

export default PlayerBar; 