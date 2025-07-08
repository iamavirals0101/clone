#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🎵 Fully Automated Spotify API Setup 🎵');
console.log('=========================================\n');

// Colors for console output
const colors = {
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    red: '\x1b[31m',
    blue: '\x1b[34m',
    reset: '\x1b[0m',
    bold: '\x1b[1m'
};

function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function checkPrerequisites() {
    log('\n🔍 Checking prerequisites...', 'blue');

    try {
        const nodeVersion = execSync('node --version', { encoding: 'utf8' }).trim();
        log(`✅ Node.js version: ${nodeVersion}`, 'green');

        const npmVersion = execSync('npm --version', { encoding: 'utf8' }).trim();
        log(`✅ npm version: ${npmVersion}`, 'green');

        const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
        log(`✅ Project: ${packageJson.name}`, 'green');

        log('✅ All prerequisites met!\n', 'green');
        return true;
    } catch (error) {
        log('❌ Prerequisites check failed', 'red');
        return false;
    }
}

function generateSpotifyCredentials() {
    log('\n🔑 Step 1: Generating Spotify App Configuration', 'blue');

    // Generate a unique app name with timestamp
    const timestamp = Date.now();
    const appName = `Spotify-Clone-${timestamp}`;
    const website = 'http://localhost:3000';
    const redirectUri = 'http://localhost:3000/callback';

    log(`📝 Generated app name: ${appName}`, 'yellow');

    // Create a configuration file with instructions
    const configContent = `# Spotify App Configuration
# Generated on: ${new Date().toISOString()}

APP_NAME="${appName}"
WEBSITE="${website}"
REDIRECT_URI="${redirectUri}"

# Instructions for Spotify Developer Dashboard:
# 1. Go to: https://developer.spotify.com/dashboard
# 2. Click "Create App"
# 3. Use these exact settings:
#    - App name: ${appName}
#    - App description: A React-based Spotify clone with real API integration
#    - Website: ${website}
#    - Redirect URI: ${redirectUri}
#    - API/SDKs: Check "Web API"
# 4. Click "Save"
# 5. Copy your Client ID and Client Secret
# 6. Run: npm run complete-setup

# After creating the app, run this command to complete setup:
# npm run complete-setup
`;

    fs.writeFileSync('spotify-config.txt', configContent);
    log('✅ Created spotify-config.txt with setup instructions', 'green');

    return appName;
}

function updateViteConfig() {
    log('\n⚙️ Step 2: Updating Vite Configuration', 'blue');

    const viteConfigPath = path.join(__dirname, 'vite.config.js');
    const viteConfig = `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true
  }
})
`;

    fs.writeFileSync(viteConfigPath, viteConfig);
    log('✅ Updated vite.config.js to use port 3000', 'green');
}

function createSpotifyApiTemplate() {
    log('\n📝 Step 3: Creating Spotify API Template', 'blue');

    const spotifyApiPath = path.join(__dirname, 'src', 'services', 'spotifyApi.js');

    const spotifyApiContent = `// Spotify API Configuration
const CLIENT_ID = 'YOUR_SPOTIFY_CLIENT_ID'; // Replace with your actual Client ID
const CLIENT_SECRET = 'YOUR_SPOTIFY_CLIENT_SECRET'; // Replace with your actual Client Secret
const REDIRECT_URI = 'http://localhost:3000/callback';
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

        return \`https://accounts.spotify.com/authorize?\${params.toString()}\`;
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
                \`https://api.spotify.com/v1/search?q=\${encodeURIComponent(query)}&type=track&limit=\${limit}\`,
                {
                    headers: {
                        'Authorization': \`Bearer \${token}\`
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
                \`https://api.spotify.com/v1/tracks/\${trackId}\`,
                {
                    headers: {
                        'Authorization': \`Bearer \${token}\`
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
                        'Authorization': \`Bearer \${token}\`
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
                \`https://api.spotify.com/v1/playlists/\${playlistId}/tracks\`,
                {
                    headers: {
                        'Authorization': \`Bearer \${token}\`
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
                \`https://api.spotify.com/v1/recommendations?\${params.toString()}\`,
                {
                    headers: {
                        'Authorization': \`Bearer \${token}\`
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
        return \`\${minutes}:\${seconds.toString().padStart(2, '0')}\`;
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
`;

    fs.writeFileSync(spotifyApiPath, spotifyApiContent);
    log('✅ Created Spotify API template', 'green');
}

function createPackageScripts() {
    log('\n📦 Step 4: Adding Package Scripts', 'blue');

    const packageJsonPath = path.join(__dirname, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

    // Add new scripts
    packageJson.scripts = {
        ...packageJson.scripts,
        'setup-spotify': 'node setup-spotify.js',
        'auto-setup': 'node auto-setup-spotify.js',
        'complete-setup': 'node complete-setup.js'
    };

    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    log('✅ Added automation scripts to package.json', 'green');
}

function createCompleteSetupScript() {
    log('\n🔄 Step 5: Creating Complete Setup Script', 'blue');

    const completeSetupContent = `#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🎵 Completing Spotify Setup 🎵');
console.log('==============================\\n');

const colors = {
    green: '\\x1b[32m',
    yellow: '\\x1b[33m',
    red: '\\x1b[31m',
    blue: '\\x1b[34m',
    reset: '\\x1b[0m'
};

function log(message, color = 'reset') {
    console.log(\`\${colors[color]}\${message}\${colors.reset}\`);
}

function updateSpotifyApiWithCredentials() {
    log('\\n🔑 Updating Spotify API with your credentials...', 'blue');
    
    const spotifyApiPath = path.join(__dirname, 'src', 'services', 'spotifyApi.js');
    
    if (!fs.existsSync(spotifyApiPath)) {
        log('❌ spotifyApi.js file not found!', 'red');
        return false;
    }

    // Read the current content
    let content = fs.readFileSync(spotifyApiPath, 'utf8');
    
    // Check if credentials are already set
    if (content.includes('YOUR_SPOTIFY_CLIENT_ID')) {
        log('⚠️  Please update your credentials in spotifyApi.js', 'yellow');
        log('   Replace YOUR_SPOTIFY_CLIENT_ID and YOUR_SPOTIFY_CLIENT_SECRET', 'yellow');
        return false;
    }
    
    log('✅ Spotify API is configured with credentials', 'green');
    return true;
}

function createEnvFile() {
    log('\\n🔐 Creating environment file...', 'blue');
    
    const envContent = \`# Spotify API Credentials
VITE_SPOTIFY_CLIENT_ID=your_client_id_here
VITE_SPOTIFY_CLIENT_SECRET=your_client_secret_here

# Development Settings
VITE_APP_URL=http://localhost:3000
\`;

    fs.writeFileSync('.env', envContent);
    log('✅ Created .env file template', 'green');
    
    // Add .env to .gitignore
    const gitignorePath = '.gitignore';
    if (fs.existsSync(gitignorePath)) {
        let gitignoreContent = fs.readFileSync(gitignorePath, 'utf8');
        if (!gitignoreContent.includes('.env')) {
            gitignoreContent += '\\n# Environment variables\\n.env\\n';
            fs.writeFileSync(gitignorePath, gitignoreContent);
            log('✅ Added .env to .gitignore', 'green');
        }
    } else {
        fs.writeFileSync(gitignorePath, '# Environment variables\\n.env\\n');
        log('✅ Created .gitignore and added .env', 'green');
    }
}

function showFinalInstructions() {
    log('\\n🎉 Setup Complete!', 'green');
    log('==================', 'green');
    
    log('\\n📋 Next Steps:', 'blue');
    log('1. Update your credentials:', 'reset');
    log('   - Edit .env file with your Client ID and Secret', 'yellow');
    log('   - Or update src/services/spotifyApi.js directly', 'yellow');
    
    log('\\n2. Start your development server:', 'reset');
    log('   npm run dev', 'yellow');
    
    log('\\n3. Open your browser and go to:', 'reset');
    log('   http://localhost:3000', 'yellow');
    
    log('\\n4. Click "Connect" in the sidebar', 'reset');
    
    log('\\n5. Start searching and playing real music!', 'reset');
    
    log('\\n🔧 Need Help?', 'blue');
    log('• Check spotify-config.txt for setup instructions', 'reset');
    log('• Review SPOTIFY_SETUP.md for detailed guide', 'reset');
    log('• Ensure redirect URI is exactly: http://localhost:3000/callback', 'reset');
    
    log('\\n🎵 Happy coding!', 'green');
}

function main() {
    try {
        updateSpotifyApiWithCredentials();
        createEnvFile();
        showFinalInstructions();
    } catch (error) {
        log(\`\\n❌ Setup failed: \${error.message}\`, 'red');
        process.exit(1);
    }
}

main();
`;

    fs.writeFileSync('complete-setup.js', completeSetupContent);
    log('✅ Created complete-setup.js script', 'green');
}

function openSpotifyDashboard() {
    log('\n🌐 Step 6: Opening Spotify Developer Dashboard', 'blue');

    const url = 'https://developer.spotify.com/dashboard';

    try {
        if (process.platform === 'win32') {
            execSync(`start ${url}`);
        } else if (process.platform === 'darwin') {
            execSync(`open ${url}`);
        } else {
            execSync(`xdg-open ${url}`);
        }
        log('✅ Opened Spotify Developer Dashboard in browser', 'green');
    } catch (error) {
        log('⚠️  Could not open browser automatically', 'yellow');
        log(`   Please manually visit: ${url}`, 'blue');
    }
}

function showInstructions() {
    log('\n📋 Setup Instructions:', 'blue');
    log('====================', 'blue');

    log('\n1. In the Spotify Developer Dashboard:', 'reset');
    log('   • Click "Create App"', 'yellow');
    log('   • App name: Use the name from spotify-config.txt', 'yellow');
    log('   • Website: http://localhost:3000', 'yellow');
    log('   • Redirect URI: http://localhost:3000/callback', 'yellow');
    log('   • Click "Save"', 'yellow');

    log('\n2. Copy your credentials:', 'reset');
    log('   • Client ID', 'yellow');
    log('   • Client Secret', 'yellow');

    log('\n3. Complete the setup:', 'reset');
    log('   npm run complete-setup', 'yellow');

    log('\n4. Update your credentials in .env file', 'reset');

    log('\n5. Start the app:', 'reset');
    log('   npm run dev', 'yellow');

    log('\n🎵 Your Spotify 2.0 clone will be ready!', 'green');
}

async function main() {
    try {
        log('🚀 Starting fully automated Spotify setup...', 'green');

        const prerequisitesOk = await checkPrerequisites();
        if (!prerequisitesOk) {
            log('❌ Prerequisites check failed. Please install Node.js and npm.', 'red');
            process.exit(1);
        }

        const appName = generateSpotifyCredentials();
        updateViteConfig();
        createSpotifyApiTemplate();
        createPackageScripts();
        createCompleteSetupScript();
        openSpotifyDashboard();

        await sleep(2000); // Give time for browser to open

        showInstructions();

        log('\n✅ Automated setup completed successfully!', 'green');
        log('📁 Check spotify-config.txt for detailed instructions', 'blue');

    } catch (error) {
        log(`\n❌ Setup failed: ${error.message}`, 'red');
        process.exit(1);
    }
}

// Run the automated setup
main(); 