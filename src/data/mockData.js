export const songs = [
    {
        id: 1,
        title: "Blinding Lights",
        artist: "The Weeknd",
        album: "After Hours",
        duration: "3:20",
        cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&crop=center",
        audio: "https://www2.cs.uic.edu/~i101/SoundFiles/BabyElephantWalk60.wav"
    },
    {
        id: 2,
        title: "Shape of You",
        artist: "Ed Sheeran",
        album: "÷ (Divide)",
        duration: "3:53",
        cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop&crop=center",
        audio: "https://www2.cs.uic.edu/~i101/SoundFiles/ImperialMarch60.wav"
    },
    {
        id: 3,
        title: "Dance Monkey",
        artist: "Tones and I",
        album: "The Kids Are Coming",
        duration: "3:29",
        cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&crop=center",
        audio: "https://www2.cs.uic.edu/~i101/SoundFiles/BabyElephantWalk60.wav"
    },
    {
        id: 4,
        title: "Uptown Funk",
        artist: "Mark Ronson ft. Bruno Mars",
        album: "Uptown Special",
        duration: "3:55",
        cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop&crop=center",
        audio: "https://www2.cs.uic.edu/~i101/SoundFiles/ImperialMarch60.wav"
    },
    {
        id: 5,
        title: "Despacito",
        artist: "Luis Fonsi ft. Daddy Yankee",
        album: "Vida",
        duration: "4:41",
        cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&crop=center",
        audio: "https://www2.cs.uic.edu/~i101/SoundFiles/BabyElephantWalk60.wav"
    },
    {
        id: 6,
        title: "Bad Guy",
        artist: "Billie Eilish",
        album: "When We All Fall Asleep, Where Do We Go?",
        duration: "3:14",
        cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop&crop=center",
        audio: "https://www2.cs.uic.edu/~i101/SoundFiles/ImperialMarch60.wav"
    },
    {
        id: 7,
        title: "Levitating",
        artist: "Dua Lipa",
        album: "Future Nostalgia",
        duration: "3:23",
        cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&crop=center",
        audio: "https://www2.cs.uic.edu/~i101/SoundFiles/BabyElephantWalk60.wav"
    },
    {
        id: 8,
        title: "Stay",
        artist: "The Kid LAROI & Justin Bieber",
        album: "F*CK LOVE 3: OVER YOU",
        duration: "2:21",
        cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop&crop=center",
        audio: "https://www2.cs.uic.edu/~i101/SoundFiles/ImperialMarch60.wav"
    }
];

export const playlists = [
    {
        id: 1,
        name: "Today's Top Hits",
        description: "The hottest tracks right now",
        cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&crop=center",
        songs: songs.slice(0, 4)
    },
    {
        id: 2,
        name: "Chill Vibes",
        description: "Relaxing music for your day",
        cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop&crop=center",
        songs: songs.slice(2, 6)
    },
    {
        id: 3,
        name: "Workout Mix",
        description: "High energy tracks for your workout",
        cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&crop=center",
        songs: songs.slice(1, 5)
    },
    {
        id: 4,
        name: "Party Anthems",
        description: "The best party songs",
        cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop&crop=center",
        songs: songs.slice(3, 7)
    }
];

export const albums = [
    {
        id: 1,
        title: "After Hours",
        artist: "The Weeknd",
        year: 2020,
        cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&crop=center",
        songs: songs.filter(song => song.album === "After Hours")
    },
    {
        id: 2,
        title: "÷ (Divide)",
        artist: "Ed Sheeran",
        year: 2017,
        cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop&crop=center",
        songs: songs.filter(song => song.album === "÷ (Divide)")
    },
    {
        id: 3,
        title: "Future Nostalgia",
        artist: "Dua Lipa",
        year: 2020,
        cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&crop=center",
        songs: songs.filter(song => song.album === "Future Nostalgia")
    }
];

export const genres = [
    {
        id: 1,
        name: "Pop",
        color: "#1DB954",
        cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&crop=center"
    },
    {
        id: 2,
        name: "Hip Hop",
        color: "#FF6B6B",
        cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop&crop=center"
    },
    {
        id: 3,
        name: "Rock",
        color: "#4ECDC4",
        cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&crop=center"
    },
    {
        id: 4,
        name: "Electronic",
        color: "#45B7D1",
        cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop&crop=center"
    },
    {
        id: 5,
        name: "R&B",
        color: "#96CEB4",
        cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&crop=center"
    },
    {
        id: 6,
        name: "Country",
        color: "#FFEAA7",
        cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop&crop=center"
    }
]; 