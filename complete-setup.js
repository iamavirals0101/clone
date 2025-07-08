#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🎵 Completing Spotify Setup 🎵');
console.log('==============================\n');

const colors = {
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    red: '\x1b[31m',
    blue: '\x1b[34m',
    reset: '\x1b[0m'
};

function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

function updateSpotifyApiWithCredentials() {
    log('\n🔑 Updating Spotify API with your credentials...', 'blue');
    
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
    log('\n🔐 Creating environment file...', 'blue');
    
    const envContent = `# Spotify API Credentials
VITE_SPOTIFY_CLIENT_ID=your_client_id_here
VITE_SPOTIFY_CLIENT_SECRET=your_client_secret_here

# Development Settings
VITE_APP_URL=http://localhost:3000
`;

    fs.writeFileSync('.env', envContent);
    log('✅ Created .env file template', 'green');
    
    // Add .env to .gitignore
    const gitignorePath = '.gitignore';
    if (fs.existsSync(gitignorePath)) {
        let gitignoreContent = fs.readFileSync(gitignorePath, 'utf8');
        if (!gitignoreContent.includes('.env')) {
            gitignoreContent += '\n# Environment variables\n.env\n';
            fs.writeFileSync(gitignorePath, gitignoreContent);
            log('✅ Added .env to .gitignore', 'green');
        }
    } else {
        fs.writeFileSync(gitignorePath, '# Environment variables\n.env\n');
        log('✅ Created .gitignore and added .env', 'green');
    }
}

function showFinalInstructions() {
    log('\n🎉 Setup Complete!', 'green');
    log('==================', 'green');
    
    log('\n📋 Next Steps:', 'blue');
    log('1. Update your credentials:', 'reset');
    log('   - Edit .env file with your Client ID and Secret', 'yellow');
    log('   - Or update src/services/spotifyApi.js directly', 'yellow');
    
    log('\n2. Start your development server:', 'reset');
    log('   npm run dev', 'yellow');
    
    log('\n3. Open your browser and go to:', 'reset');
    log('   http://localhost:3000', 'yellow');
    
    log('\n4. Click "Connect" in the sidebar', 'reset');
    
    log('\n5. Start searching and playing real music!', 'reset');
    
    log('\n🔧 Need Help?', 'blue');
    log('• Check spotify-config.txt for setup instructions', 'reset');
    log('• Review SPOTIFY_SETUP.md for detailed guide', 'reset');
    log('• Ensure redirect URI is exactly: http://localhost:3000/callback', 'reset');
    
    log('\n🎵 Happy coding!', 'green');
}

function main() {
    try {
        updateSpotifyApiWithCredentials();
        createEnvFile();
        showFinalInstructions();
    } catch (error) {
        log(`\n❌ Setup failed: ${error.message}`, 'red');
        process.exit(1);
    }
}

main();
