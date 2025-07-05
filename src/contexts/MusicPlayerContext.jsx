import React, { createContext, useReducer, useRef, useEffect } from 'react';

export const MusicPlayerContext = createContext();

const initialState = {
    currentSong: null,
    isPlaying: false,
    queue: [],
    currentIndex: 0,
    volume: 0.7,
    repeat: 'none', // none, one, all
    shuffle: false,
    currentTime: 0,
    duration: 0,
    isLoading: false
};

const playerReducer = (state, action) => {
    switch (action.type) {
        case 'SET_CURRENT_SONG':
            return { ...state, currentSong: action.payload };
        case 'TOGGLE_PLAY':
            return { ...state, isPlaying: !state.isPlaying };
        case 'SET_PLAYING':
            return { ...state, isPlaying: action.payload };
        case 'SET_QUEUE':
            return { ...state, queue: action.payload, currentIndex: 0 };
        case 'NEXT_SONG':
            if (state.currentIndex < state.queue.length - 1) {
                return {
                    ...state,
                    currentIndex: state.currentIndex + 1,
                    currentSong: state.queue[state.currentIndex + 1]
                };
            }
            return state;
        case 'PREVIOUS_SONG':
            if (state.currentIndex > 0) {
                return {
                    ...state,
                    currentIndex: state.currentIndex - 1,
                    currentSong: state.queue[state.currentIndex - 1]
                };
            }
            return state;
        case 'SET_VOLUME':
            return { ...state, volume: action.payload };
        case 'TOGGLE_REPEAT': {
            const repeatStates = ['none', 'one', 'all'];
            const currentIndex = repeatStates.indexOf(state.repeat);
            const nextIndex = (currentIndex + 1) % repeatStates.length;
            return { ...state, repeat: repeatStates[nextIndex] };
        }
        case 'TOGGLE_SHUFFLE':
            return { ...state, shuffle: !state.shuffle };
        case 'SET_CURRENT_TIME':
            return { ...state, currentTime: action.payload };
        case 'SET_DURATION':
            return { ...state, duration: action.payload };
        case 'SET_LOADING':
            return { ...state, isLoading: action.payload };
        default:
            return state;
    }
};

export const MusicPlayerProvider = ({ children }) => {
    const [state, dispatch] = useReducer(playerReducer, initialState);
    const audioRef = useRef(new Audio());

    // Set up audio event listeners
    useEffect(() => {
        const audio = audioRef.current;
        const handleTimeUpdate = () => {
            dispatch({ type: 'SET_CURRENT_TIME', payload: audio.currentTime });
        };
        const handleLoadedMetadata = () => {
            dispatch({ type: 'SET_DURATION', payload: audio.duration });
            dispatch({ type: 'SET_LOADING', payload: false });
        };
        const handleEnded = () => {
            if (state.repeat === 'one') {
                audio.currentTime = 0;
                audio.play();
            } else if (state.repeat === 'all' || state.currentIndex < state.queue.length - 1) {
                dispatch({ type: 'NEXT_SONG' });
            } else {
                dispatch({ type: 'SET_PLAYING', payload: false });
            }
        };
        const handleError = () => {
            console.error('Audio playback error');
            dispatch({ type: 'SET_LOADING', payload: false });
        };
        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('loadedmetadata', handleLoadedMetadata);
        audio.addEventListener('ended', handleEnded);
        audio.addEventListener('error', handleError);
        return () => {
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
            audio.removeEventListener('ended', handleEnded);
            audio.removeEventListener('error', handleError);
        };
    }, [state.repeat, state.currentIndex, state.queue.length]);
    // Update audio source when current song changes
    useEffect(() => {
        if (state.currentSong) {
            const audio = audioRef.current;
            audio.src = state.currentSong.audio;
            audio.load();
            dispatch({ type: 'SET_LOADING', payload: true });
        }
    }, [state.currentSong]);
    // Update volume when volume state changes
    useEffect(() => {
        audioRef.current.volume = state.volume;
    }, [state.volume]);
    // Handle play/pause
    useEffect(() => {
        const audio = audioRef.current;
        if (state.isPlaying && state.currentSong) {
            audio.play().catch(error => {
                console.error('Playback failed:', error);
                dispatch({ type: 'SET_PLAYING', payload: false });
            });
        } else {
            audio.pause();
        }
    }, [state.isPlaying, state.currentSong]);
    const playSong = (song, queue = null) => {
        let newQueue = queue || state.queue;
        let index = newQueue.findIndex((s) => s.id === song.id);
        if (index === -1) {
            // If song not found in queue, add it
            newQueue = [song];
            index = 0;
        }
        dispatch({ type: 'SET_QUEUE', payload: newQueue });
        dispatch({ type: 'SET_CURRENT_SONG', payload: song });
        state.currentIndex = index;
        dispatch({ type: 'SET_PLAYING', payload: true });
    };
    const playPlaylist = (playlist) => {
        dispatch({ type: 'SET_QUEUE', payload: playlist.songs });
        dispatch({ type: 'SET_CURRENT_SONG', payload: playlist.songs[0] });
        dispatch({ type: 'SET_PLAYING', payload: true });
    };
    const togglePlay = () => {
        if (state.currentSong) {
            dispatch({ type: 'TOGGLE_PLAY' });
        }
    };
    const nextSong = () => {
        if (state.currentIndex < state.queue.length - 1) {
            dispatch({ type: 'NEXT_SONG' });
        }
    };
    const previousSong = () => {
        if (state.currentIndex > 0) {
            dispatch({ type: 'PREVIOUS_SONG' });
        }
    };
    const setVolume = (volume) => {
        dispatch({ type: 'SET_VOLUME', payload: volume });
    };
    const toggleRepeat = () => {
        dispatch({ type: 'TOGGLE_REPEAT' });
    };
    const toggleShuffle = () => {
        dispatch({ type: 'TOGGLE_SHUFFLE' });
    };
    const seekTo = (time) => {
        if (audioRef.current) {
            audioRef.current.currentTime = time;
            dispatch({ type: 'SET_CURRENT_TIME', payload: time });
        }
    };
    const value = {
        ...state,
        playSong,
        playPlaylist,
        togglePlay,
        nextSong,
        previousSong,
        setVolume,
        toggleRepeat,
        toggleShuffle,
        seekTo
    };
    return (
        <MusicPlayerContext.Provider value={value}>
            {children}
        </MusicPlayerContext.Provider>
    );
};

