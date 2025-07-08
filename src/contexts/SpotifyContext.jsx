import React, { createContext, useContext, useState, useEffect } from 'react';
import spotifyApi from '../services/spotifyApi';

const SpotifyContext = createContext();

export const useSpotify = () => {
    const context = useContext(SpotifyContext);
    if (!context) {
        throw new Error('useSpotify must be used within a SpotifyProvider');
    }
    return context;
};

export const SpotifyProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [spotifyTracks, setSpotifyTracks] = useState([]);
    const [userPlaylists, setUserPlaylists] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [error, setError] = useState(null);

    // Check authentication on mount
    useEffect(() => {
        checkAuthStatus();
    }, []);

    const checkAuthStatus = async () => {
        try {
            setIsLoading(true);
            const authenticated = spotifyApi.isAuthenticated();
            setIsAuthenticated(authenticated);

            if (authenticated) {
                await loadUserData();
            }
        } catch (error) {
            console.error('Error checking auth status:', error);
            setError('Authentication check failed');
        } finally {
            setIsLoading(false);
        }
    };

    const loadUserData = async () => {
        try {
            // Load user playlists
            const playlists = await spotifyApi.getUserPlaylists();
            setUserPlaylists(playlists);

            // Load recommendations
            const recs = await spotifyApi.getRecommendations(['pop', 'rock'], 10);
            const convertedRecs = recs.map(track => spotifyApi.convertSpotifyTrack(track));
            setRecommendations(convertedRecs);

        } catch (error) {
            console.error('Error loading user data:', error);
            setError('Failed to load user data');
        }
    };

    const login = () => {
        const authUrl = spotifyApi.getAuthURL();
        window.location.href = authUrl;
    };

    const logout = () => {
        spotifyApi.logout();
        setIsAuthenticated(false);
        setUser(null);
        setSpotifyTracks([]);
        setUserPlaylists([]);
        setRecommendations([]);
        setError(null);
    };

    const searchTracks = async (query, limit = 20) => {
        try {
            setError(null);
            const tracks = await spotifyApi.searchTracks(query, limit);
            const convertedTracks = tracks.map(track => spotifyApi.convertSpotifyTrack(track));
            setSpotifyTracks(convertedTracks);
            return convertedTracks;
        } catch (error) {
            console.error('Error searching tracks:', error);
            setError('Failed to search tracks');
            return [];
        }
    };

    const getPlaylistTracks = async (playlistId) => {
        try {
            setError(null);
            const tracks = await spotifyApi.getPlaylistTracks(playlistId);
            const convertedTracks = tracks.map(track => spotifyApi.convertSpotifyTrack(track));
            return convertedTracks;
        } catch (error) {
            console.error('Error getting playlist tracks:', error);
            setError('Failed to get playlist tracks');
            return [];
        }
    };

    const getRecommendations = async (seedTracks = [], seedGenres = [], seedArtists = [], limit = 20) => {
        try {
            setError(null);
            const tracks = await spotifyApi.getRecommendations(seedTracks, seedGenres, seedArtists, limit);
            const convertedTracks = tracks.map(track => spotifyApi.convertSpotifyTrack(track));
            setRecommendations(convertedTracks);
            return convertedTracks;
        } catch (error) {
            console.error('Error getting recommendations:', error);
            setError('Failed to get recommendations');
            return [];
        }
    };

    const handleCallback = async (code) => {
        try {
            setIsLoading(true);
            setError(null);

            await spotifyApi.getTokens(code);
            setIsAuthenticated(true);
            await loadUserData();

            // Redirect to home page
            window.history.replaceState({}, document.title, '/');
        } catch (error) {
            console.error('Error handling callback:', error);
            setError('Authentication failed');
        } finally {
            setIsLoading(false);
        }
    };

    const value = {
        isAuthenticated,
        isLoading,
        user,
        spotifyTracks,
        userPlaylists,
        recommendations,
        error,
        login,
        logout,
        searchTracks,
        getPlaylistTracks,
        getRecommendations,
        handleCallback
    };

    return (
        <SpotifyContext.Provider value={value}>
            {children}
        </SpotifyContext.Provider>
    );
}; 