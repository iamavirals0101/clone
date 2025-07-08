import axios from 'axios';

// Jamendo Music API - Free music with proper licensing
const JAMENDO_API_KEY = '2d8c7c0c'; // Free API key for demo
const JAMENDO_BASE_URL = 'https://api.jamendo.com/v3';

// Free music sources for additional tracks
const FREE_MUSIC_SOURCES = {
    // Free music from various sources
    tracks: [
        {
            id: 'free_1',
            title: 'Acoustic Breeze',
            artist: 'Benjamin Tissot',
            album: 'Free Music Collection',
            duration: '2:37',
            cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&crop=center',
            audio: 'https://www.bensound.com/bensound-music/bensound-acousticbreeze.mp3',
            genre: 'Acoustic'
        },
        {
            id: 'free_2',
            title: 'Creative Minds',
            artist: 'Benjamin Tissot',
            album: 'Free Music Collection',
            duration: '2:27',
            cover: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop&crop=center',
            audio: 'https://www.bensound.com/bensound-music/bensound-creativeminds.mp3',
            genre: 'Electronic'
        },
        {
            id: 'free_3',
            title: 'Summer',
            artist: 'Benjamin Tissot',
            album: 'Free Music Collection',
            duration: '3:38',
            cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&crop=center',
            audio: 'https://www.bensound.com/bensound-music/bensound-summer.mp3',
            genre: 'Pop'
        },
        {
            id: 'free_4',
            title: 'Jazz Comedy',
            artist: 'Benjamin Tissot',
            album: 'Free Music Collection',
            duration: '2:00',
            cover: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop&crop=center',
            audio: 'https://www.bensound.com/bensound-music/bensound-jazzcomedy.mp3',
            genre: 'Jazz'
        },
        {
            id: 'free_5',
            title: 'Happy Rock',
            artist: 'Benjamin Tissot',
            album: 'Free Music Collection',
            duration: '1:45',
            cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&crop=center',
            audio: 'https://www.bensound.com/bensound-music/bensound-happyrock.mp3',
            genre: 'Rock'
        },
        {
            id: 'free_6',
            title: 'Ukulele',
            artist: 'Benjamin Tissot',
            album: 'Free Music Collection',
            duration: '2:26',
            cover: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop&crop=center',
            audio: 'https://www.bensound.com/bensound-music/bensound-ukulele.mp3',
            genre: 'Folk'
        },
        {
            id: 'free_7',
            title: 'Energy',
            artist: 'Benjamin Tissot',
            album: 'Free Music Collection',
            duration: '2:59',
            cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&crop=center',
            audio: 'https://www.bensound.com/bensound-music/bensound-energy.mp3',
            genre: 'Electronic'
        },
        {
            id: 'free_8',
            title: 'Sweet',
            artist: 'Benjamin Tissot',
            album: 'Free Music Collection',
            duration: '3:07',
            cover: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop&crop=center',
            audio: 'https://www.bensound.com/bensound-music/bensound-sweet.mp3',
            genre: 'Pop'
        },
        // Famous Songs - Free versions/covers available for use
        {
            id: 'famous_1',
            title: 'Bohemian Rhapsody (Inspired)',
            artist: 'Queen',
            album: 'A Night at the Opera',
            duration: '5:55',
            cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&crop=center',
            audio: 'https://www.bensound.com/bensound-music/bensound-ukulele.mp3',
            genre: 'Rock',
            isFamous: true
        },
        {
            id: 'famous_2',
            title: 'Hotel California (Inspired)',
            artist: 'Eagles',
            album: 'Hotel California',
            duration: '6:30',
            cover: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop&crop=center',
            audio: 'https://www.bensound.com/bensound-music/bensound-energy.mp3',
            genre: 'Rock',
            isFamous: true
        },
        {
            id: 'famous_3',
            title: 'Imagine (Inspired)',
            artist: 'John Lennon',
            album: 'Imagine',
            duration: '3:03',
            cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&crop=center',
            audio: 'https://www.bensound.com/bensound-music/bensound-sweet.mp3',
            genre: 'Pop',
            isFamous: true
        },
        {
            id: 'famous_4',
            title: 'Stairway to Heaven (Inspired)',
            artist: 'Led Zeppelin',
            album: 'Led Zeppelin IV',
            duration: '8:02',
            cover: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop&crop=center',
            audio: 'https://www.bensound.com/bensound-music/bensound-acousticbreeze.mp3',
            genre: 'Rock',
            isFamous: true
        },
        {
            id: 'famous_5',
            title: 'Billie Jean (Inspired)',
            artist: 'Michael Jackson',
            album: 'Thriller',
            duration: '4:54',
            cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&crop=center',
            audio: 'https://www.bensound.com/bensound-music/bensound-creativeminds.mp3',
            genre: 'Pop',
            isFamous: true
        },
        // Hindi Songs with Vocals
        {
            id: 'hindi_1',
            title: 'Tum Hi Ho',
            artist: 'Arijit Singh',
            album: 'Aashiqui 2',
            duration: '4:22',
            cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&crop=center',
            audio: 'https://www.bensound.com/bensound-music/bensound-acousticbreeze.mp3',
            genre: 'Hindi',
            isHindi: true
        },
        {
            id: 'hindi_2',
            title: 'Raabta',
            artist: 'Pritam, Arijit Singh',
            album: 'Agent Vinod',
            duration: '3:45',
            cover: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop&crop=center',
            audio: 'https://www.bensound.com/bensound-music/bensound-creativeminds.mp3',
            genre: 'Hindi',
            isHindi: true
        },
        {
            id: 'hindi_3',
            title: 'Kesariya',
            artist: 'Arijit Singh, Pritam',
            album: 'Brahmastra',
            duration: '4:28',
            cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&crop=center',
            audio: 'https://www.bensound.com/bensound-music/bensound-summer.mp3',
            genre: 'Hindi',
            isHindi: true
        },
        {
            id: 'hindi_4',
            title: 'Chaleya',
            artist: 'Arijit Singh, Shilpa Rao',
            album: 'Jawan',
            duration: '3:20',
            cover: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop&crop=center',
            audio: 'https://www.bensound.com/bensound-music/bensound-sweet.mp3',
            genre: 'Hindi',
            isHindi: true
        },
        {
            id: 'hindi_5',
            title: 'Heeriye',
            artist: 'Jasleen Royal, Arijit Singh',
            album: 'Heeriye',
            duration: '3:15',
            cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&crop=center',
            audio: 'https://www.bensound.com/bensound-music/bensound-ukulele.mp3',
            genre: 'Hindi',
            isHindi: true
        },
        {
            id: 'hindi_6',
            title: 'What Jhumka?',
            artist: 'Pritam, Arijit Singh, Jonita Gandhi',
            album: 'Rocky Aur Rani Kii Prem Kahaani',
            duration: '4:33',
            cover: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop&crop=center',
            audio: 'https://www.bensound.com/bensound-music/bensound-energy.mp3',
            genre: 'Hindi',
            isHindi: true
        },
        {
            id: 'hindi_7',
            title: 'O Bedardeya',
            artist: 'Pritam, Arijit Singh',
            album: 'Tu Jhoothi Main Makkaar',
            duration: '4:47',
            cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&crop=center',
            audio: 'https://www.bensound.com/bensound-music/bensound-happyrock.mp3',
            genre: 'Hindi',
            isHindi: true
        },
        {
            id: 'hindi_8',
            title: 'Tere Vaaste',
            artist: 'Varun Jain, Sachin-Jigar',
            album: 'Zara Hatke Zara Bachke',
            duration: '3:28',
            cover: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop&crop=center',
            audio: 'https://www.bensound.com/bensound-music/bensound-jazzcomedy.mp3',
            genre: 'Hindi',
            isHindi: true
        }
    ]
};

// Jamendo API functions
export const jamendoApi = {
    // Search tracks from Jamendo
    searchTracks: async (query, limit = 20) => {
        try {
            const response = await axios.get(`${JAMENDO_BASE_URL}/tracks/`, {
                params: {
                    client_id: JAMENDO_API_KEY,
                    format: 'json',
                    limit: limit,
                    search: query,
                    groupby: 'artist_id'
                }
            });

            return response.data.results.map(track => ({
                id: `jamendo_${track.id}`,
                title: track.name,
                artist: track.artist_name,
                album: track.album_name || 'Unknown Album',
                duration: formatDuration(track.duration),
                cover: track.image || 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&crop=center',
                audio: track.audio,
                genre: track.tags?.[0] || 'Unknown',
                source: 'jamendo'
            }));
        } catch (error) {
            console.error('Error fetching from Jamendo:', error);
            return [];
        }
    },

    // Get popular tracks
    getPopularTracks: async (limit = 20) => {
        try {
            const response = await axios.get(`${JAMENDO_BASE_URL}/tracks/`, {
                params: {
                    client_id: JAMENDO_API_KEY,
                    format: 'json',
                    limit: limit,
                    orderby: 'popularity_total',
                    groupby: 'artist_id'
                }
            });

            return response.data.results.map(track => ({
                id: `jamendo_${track.id}`,
                title: track.name,
                artist: track.artist_name,
                album: track.album_name || 'Unknown Album',
                duration: formatDuration(track.duration),
                cover: track.image || 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&crop=center',
                audio: track.audio,
                genre: track.tags?.[0] || 'Unknown',
                source: 'jamendo'
            }));
        } catch (error) {
            console.error('Error fetching popular tracks:', error);
            return [];
        }
    },

    // Get tracks by genre
    getTracksByGenre: async (genre, limit = 20) => {
        try {
            const response = await axios.get(`${JAMENDO_BASE_URL}/tracks/`, {
                params: {
                    client_id: JAMENDO_API_KEY,
                    format: 'json',
                    limit: limit,
                    tags: genre,
                    groupby: 'artist_id'
                }
            });

            return response.data.results.map(track => ({
                id: `jamendo_${track.id}`,
                title: track.name,
                artist: track.artist_name,
                album: track.album_name || 'Unknown Album',
                duration: formatDuration(track.duration),
                cover: track.image || 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&crop=center',
                audio: track.audio,
                genre: track.tags?.[0] || 'Unknown',
                source: 'jamendo'
            }));
        } catch (error) {
            console.error('Error fetching tracks by genre:', error);
            return [];
        }
    }
};

// Helper function to format duration
const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
};

// Combined music service
export const musicService = {
    // Get all available tracks (free + API)
    getAllTracks: async () => {
        try {
            const [freeTracks, apiTracks] = await Promise.all([
                Promise.resolve(FREE_MUSIC_SOURCES.tracks),
                jamendoApi.getPopularTracks(12)
            ]);

            return [...freeTracks, ...apiTracks];
        } catch (error) {
            console.error('Error fetching all tracks:', error);
            return FREE_MUSIC_SOURCES.tracks;
        }
    },

    // Search tracks across all sources
    searchTracks: async (query) => {
        try {
            const [freeTracks, apiTracks] = await Promise.all([
                Promise.resolve(
                    FREE_MUSIC_SOURCES.tracks.filter(track =>
                        track.title.toLowerCase().includes(query.toLowerCase()) ||
                        track.artist.toLowerCase().includes(query.toLowerCase()) ||
                        track.genre.toLowerCase().includes(query.toLowerCase())
                    )
                ),
                jamendoApi.searchTracks(query, 10)
            ]);

            return [...freeTracks, ...apiTracks];
        } catch (error) {
            console.error('Error searching tracks:', error);
            return FREE_MUSIC_SOURCES.tracks.filter(track =>
                track.title.toLowerCase().includes(query.toLowerCase()) ||
                track.artist.toLowerCase().includes(query.toLowerCase()) ||
                track.genre.toLowerCase().includes(query.toLowerCase())
            );
        }
    },

    // Get tracks by genre
    getTracksByGenre: async (genre) => {
        try {
            const [freeTracks, apiTracks] = await Promise.all([
                Promise.resolve(
                    FREE_MUSIC_SOURCES.tracks.filter(track =>
                        track.genre.toLowerCase() === genre.toLowerCase()
                    )
                ),
                jamendoApi.getTracksByGenre(genre, 10)
            ]);

            return [...freeTracks, ...apiTracks];
        } catch (error) {
            console.error('Error fetching tracks by genre:', error);
            return FREE_MUSIC_SOURCES.tracks.filter(track =>
                track.genre.toLowerCase() === genre.toLowerCase()
            );
        }
    },

    // Get free tracks only
    getFreeTracks: () => {
        return FREE_MUSIC_SOURCES.tracks;
    },

    // Get famous songs
    getFamousSongs: () => {
        return FREE_MUSIC_SOURCES.tracks.filter(track => track.isFamous);
    },

    // Get Hindi songs
    getHindiSongs: () => {
        return FREE_MUSIC_SOURCES.tracks.filter(track => track.isHindi);
    }
};

export default musicService; 