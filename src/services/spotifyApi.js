// Spotify API Configuration
const CLIENT_ID = 'b8d8918c2c5a4f35822002e55f0cd9ac'; // Replace with your actual Client ID
const CLIENT_SECRET = '3117a9f7b2a945cb9cb212b0c9446b01'; // Replace with your actual Client Secret
const REDIRECT_URI = 'https://1341adee7aea.ngrok-free.app/callback';
const SCOPES = [
    'user-read-private',
    'user-read-email',
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-read-currently-playing',
    'streaming',
    'playlist-read-private',
    'playlist-read-collaborative'
];

class SpotifyAPI {
    constructor() {
        this.accessToken = null;
        this.refreshToken = null;
        this.expiresAt = null;
    }

    // Initialize Spotify Web Playback SDK
    async initializeSpotify() {
        return new Promise((resolve, reject) => {
            if (window.Spotify) {
                resolve();
                return;
            }

            const script = document.createElement('script');
            script.src = 'https://sdk.scdn.co/spotify-player.js';
            script.async = true;
            document.head.appendChild(script);

            window.onSpotifyWebPlaybackSDKReady = () => {
                resolve();
            };

            script.onerror = reject;
        });
    }

    // Get authorization URL
    getAuthURL() {
        const params = new URLSearchParams({
            client_id: CLIENT_ID,
            response_type: 'code',
            redirect_uri: REDIRECT_URI,
            scope: SCOPES.join(' '),
            show_dialog: 'true'
        });

        return `https://accounts.spotify.com/authorize?${params.toString()}`;
    }

    // Exchange authorization code for tokens
    async getTokens(code) {
        try {
            const response = await fetch('https://accounts.spotify.com/api/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET)
                },
                body: new URLSearchParams({
                    grant_type: 'authorization_code',
                    code: code,
                    redirect_uri: REDIRECT_URI
                })
            });

            const data = await response.json();

            if (data.access_token) {
                this.accessToken = data.access_token;
                this.refreshToken = data.refresh_token;
                this.expiresAt = Date.now() + (data.expires_in * 1000);

                localStorage.setItem('spotify_access_token', this.accessToken);
                localStorage.setItem('spotify_refresh_token', this.refreshToken);
                localStorage.setItem('spotify_expires_at', this.expiresAt);

                return data;
            } else {
                throw new Error('Failed to get access token');
            }
        } catch (error) {
            console.error('Error getting tokens:', error);
            throw error;
        }
    }

    // Refresh access token
    async refreshAccessToken() {
        try {
            const response = await fetch('https://accounts.spotify.com/api/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET)
                },
                body: new URLSearchParams({
                    grant_type: 'refresh_token',
                    refresh_token: this.refreshToken
                })
            });

            const data = await response.json();

            if (data.access_token) {
                this.accessToken = data.access_token;
                this.expiresAt = Date.now() + (data.expires_in * 1000);

                localStorage.setItem('spotify_access_token', this.accessToken);
                localStorage.setItem('spotify_expires_at', this.expiresAt);

                return data.access_token;
            } else {
                throw new Error('Failed to refresh access token');
            }
        } catch (error) {
            console.error('Error refreshing token:', error);
            throw error;
        }
    }

    // Get valid access token
    async getValidAccessToken() {
        if (!this.accessToken) {
            this.accessToken = localStorage.getItem('spotify_access_token');
            this.refreshToken = localStorage.getItem('spotify_refresh_token');
            this.expiresAt = localStorage.getItem('spotify_expires_at');
        }

        if (!this.accessToken) {
            throw new Error('No access token available. Please authenticate first.');
        }

        if (Date.now() >= this.expiresAt) {
            await this.refreshAccessToken();
        }

        return this.accessToken;
    }

    // Search for tracks
    async searchTracks(query, limit = 20) {
        try {
            const token = await this.getValidAccessToken();
            const response = await fetch(
                `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=${limit}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();
            return data.tracks?.items || [];
        } catch (error) {
            console.error('Error searching tracks:', error);
            return [];
        }
    }

    // Get track details
    async getTrack(trackId) {
        try {
            const token = await this.getValidAccessToken();
            const response = await fetch(
                `https://api.spotify.com/v1/tracks/${trackId}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            const track = await response.json();
            return track;
        } catch (error) {
            console.error('Error getting track:', error);
            return null;
        }
    }

    // Get user's playlists
    async getUserPlaylists() {
        try {
            const token = await this.getValidAccessToken();
            const response = await fetch(
                'https://api.spotify.com/v1/me/playlists?limit=50',
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();
            return data.items || [];
        } catch (error) {
            console.error('Error getting playlists:', error);
            return [];
        }
    }

    // Get playlist tracks
    async getPlaylistTracks(playlistId) {
        try {
            const token = await this.getValidAccessToken();
            const response = await fetch(
                `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();
            return data.items?.map(item => item.track) || [];
        } catch (error) {
            console.error('Error getting playlist tracks:', error);
            return [];
        }
    }

    // Get recommendations
    async getRecommendations(seedTracks = [], seedGenres = [], seedArtists = [], limit = 20) {
        try {
            const token = await this.getValidAccessToken();
            const params = new URLSearchParams({
                limit: limit.toString()
            });

            if (seedTracks.length > 0) {
                params.append('seed_tracks', seedTracks.join(','));
            }
            if (seedGenres.length > 0) {
                params.append('seed_genres', seedGenres.join(','));
            }
            if (seedArtists.length > 0) {
                params.append('seed_artists', seedArtists.join(','));
            }

            const response = await fetch(
                `https://api.spotify.com/v1/recommendations?${params.toString()}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();
            return data.tracks || [];
        } catch (error) {
            console.error('Error getting recommendations:', error);
            return [];
        }
    }

    // Convert Spotify track to our format
    convertSpotifyTrack(spotifyTrack) {
        return {
            id: spotifyTrack.id,
            title: spotifyTrack.name,
            artist: spotifyTrack.artists.map(artist => artist.name).join(', '),
            album: spotifyTrack.album.name,
            duration: this.formatDuration(spotifyTrack.duration_ms),
            cover: spotifyTrack.album.images[0]?.url || '',
            audio: spotifyTrack.preview_url || '',
            genre: spotifyTrack.album.genres?.[0] || 'Unknown',
            spotifyUri: spotifyTrack.uri,
            isSpotify: true
        };
    }

    // Format duration from milliseconds
    formatDuration(ms) {
        const minutes = Math.floor(ms / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    // Check if user is authenticated
    isAuthenticated() {
        return !!this.accessToken || !!localStorage.getItem('spotify_access_token');
    }

    // Logout
    logout() {
        this.accessToken = null;
        this.refreshToken = null;
        this.expiresAt = null;

        localStorage.removeItem('spotify_access_token');
        localStorage.removeItem('spotify_refresh_token');
        localStorage.removeItem('spotify_expires_at');
    }
}

export default new SpotifyAPI();
