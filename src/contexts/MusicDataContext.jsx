import React, { createContext, useContext, useReducer, useEffect } from 'react';
import musicService from '../services/musicApi';

const MusicDataContext = createContext();

const initialState = {
    songs: [],
    playlists: [],
    albums: [],
    genres: [],
    isLoading: false,
    error: null,
    searchResults: [],
    currentGenre: null
};

const musicDataReducer = (state, action) => {
    switch (action.type) {
        case 'SET_LOADING':
            return { ...state, isLoading: action.payload };
        case 'SET_ERROR':
            return { ...state, error: action.payload, isLoading: false };
        case 'SET_SONGS':
            return { ...state, songs: action.payload, isLoading: false };
        case 'SET_PLAYLISTS':
            return { ...state, playlists: action.payload, isLoading: false };
        case 'SET_ALBUMS':
            return { ...state, albums: action.payload, isLoading: false };
        case 'SET_GENRES':
            return { ...state, genres: action.payload, isLoading: false };
        case 'SET_SEARCH_RESULTS':
            return { ...state, searchResults: action.payload, isLoading: false };
        case 'SET_CURRENT_GENRE':
            return { ...state, currentGenre: action.payload };
        case 'ADD_SONGS':
            return { ...state, songs: [...state.songs, ...action.payload], isLoading: false };
        default:
            return state;
    }
};

export const MusicDataProvider = ({ children }) => {
    const [state, dispatch] = useReducer(musicDataReducer, initialState);

    // Load initial data
    useEffect(() => {
        loadInitialData();
    }, []);

    const loadInitialData = async () => {
        dispatch({ type: 'SET_LOADING', payload: true });
        try {
            const [songs, freeTracks] = await Promise.all([
                musicService.getAllTracks(),
                musicService.getFreeTracks()
            ]);

            // Create playlists from the songs
            const playlists = createPlaylists(songs);

            // Create albums from the songs
            const albums = createAlbums(songs);

            // Create genres
            const genres = createGenres(songs);

            dispatch({ type: 'SET_SONGS', payload: songs });
            dispatch({ type: 'SET_PLAYLISTS', payload: playlists });
            dispatch({ type: 'SET_ALBUMS', payload: albums });
            dispatch({ type: 'SET_GENRES', payload: genres });
        } catch (error) {
            console.error('Error loading initial data:', error);
            dispatch({ type: 'SET_ERROR', payload: 'Failed to load music data' });
        }
    };

    const createPlaylists = (songs) => {
        const famousSongs = songs.filter(song => song.isFamous);
        const hindiSongs = songs.filter(song => song.isHindi);

        const playlists = [
            {
                id: 1,
                name: "Today's Top Hits",
                description: "The hottest tracks right now",
                cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&crop=center",
                songs: songs.slice(0, 6)
            },
            {
                id: 2,
                name: "Chill Vibes",
                description: "Relaxing music for your day",
                cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop&crop=center",
                songs: songs.filter(song => ['Acoustic', 'Jazz', 'Folk'].includes(song.genre)).slice(0, 6)
            },
            {
                id: 3,
                name: "Workout Mix",
                description: "High energy tracks for your workout",
                cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&crop=center",
                songs: songs.filter(song => ['Rock', 'Electronic', 'Pop'].includes(song.genre)).slice(0, 6)
            },
            {
                id: 4,
                name: "Party Anthems",
                description: "The best party songs",
                cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop&crop=center",
                songs: songs.filter(song => ['Pop', 'Electronic', 'Rock'].includes(song.genre)).slice(0, 6)
            }
        ];

        // Add Famous Songs playlist if we have famous songs
        if (famousSongs.length > 0) {
            playlists.unshift({
                id: 0,
                name: "⭐ Famous Songs (Inspired)",
                description: "Free music inspired by iconic tracks",
                cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&crop=center",
                songs: famousSongs,
                isSpecial: true
            });
        }

        // Add Hindi Songs playlist if we have Hindi songs
        if (hindiSongs.length > 0) {
            playlists.unshift({
                id: -1,
                name: "🎵 Hindi Songs",
                description: "Popular Hindi tracks with vocals",
                cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop&crop=center",
                songs: hindiSongs,
                isHindi: true
            });
        }

        return playlists;
    };

    const createAlbums = (songs) => {
        const albumMap = {};

        songs.forEach(song => {
            if (!albumMap[song.album]) {
                albumMap[song.album] = {
                    id: song.album,
                    title: song.album,
                    artist: song.artist,
                    year: 2024,
                    cover: song.cover,
                    songs: []
                };
            }
            albumMap[song.album].songs.push(song);
        });

        return Object.values(albumMap).slice(0, 6);
    };

    const createGenres = (songs) => {
        const genreMap = {};

        songs.forEach(song => {
            if (!genreMap[song.genre]) {
                genreMap[song.genre] = {
                    id: song.genre,
                    name: song.genre,
                    color: getGenreColor(song.genre),
                    cover: song.cover
                };
            }
        });

        return Object.values(genreMap);
    };

    const getGenreColor = (genre) => {
        const colors = {
            'Pop': '#1DB954',
            'Rock': '#FF6B6B',
            'Electronic': '#4ECDC4',
            'Jazz': '#45B7D1',
            'Acoustic': '#96CEB4',
            'Folk': '#FFEAA7',
            'Hip Hop': '#A29BFE',
            'Classical': '#FD79A8',
            'Country': '#FDCB6E',
            'R&B': '#6C5CE7'
        };
        return colors[genre] || '#1DB954';
    };

    const searchTracks = async (query) => {
        if (!query.trim()) {
            dispatch({ type: 'SET_SEARCH_RESULTS', payload: [] });
            return;
        }

        dispatch({ type: 'SET_LOADING', payload: true });
        try {
            const results = await musicService.searchTracks(query);
            dispatch({ type: 'SET_SEARCH_RESULTS', payload: results });
        } catch (error) {
            console.error('Error searching tracks:', error);
            dispatch({ type: 'SET_ERROR', payload: 'Failed to search tracks' });
        }
    };

    const getTracksByGenre = async (genre) => {
        dispatch({ type: 'SET_LOADING', payload: true });
        try {
            const tracks = await musicService.getTracksByGenre(genre);
            dispatch({ type: 'SET_CURRENT_GENRE', payload: genre });
            return tracks;
        } catch (error) {
            console.error('Error fetching tracks by genre:', error);
            dispatch({ type: 'SET_ERROR', payload: 'Failed to fetch genre tracks' });
            return [];
        }
    };

    const refreshData = () => {
        loadInitialData();
    };

    const value = {
        ...state,
        searchTracks,
        getTracksByGenre,
        refreshData
    };

    return (
        <MusicDataContext.Provider value={value}>
            {children}
        </MusicDataContext.Provider>
    );
};

export const useMusicData = () => {
    const context = useContext(MusicDataContext);
    if (!context) {
        throw new Error('useMusicData must be used within a MusicDataProvider');
    }
    return context;
};

export default MusicDataContext; 