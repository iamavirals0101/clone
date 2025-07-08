#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { execSync, spawn } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

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
function question(prompt) {
    return new Promise((resolve) => {
        rl.question(prompt, resolve);
    });
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
function generateSpotifyConfig() {
    const timestamp = Date.now();
    const appName = `Spotify-Clone-${timestamp}`;
    const website = 'http://localhost:3000';
    const redirectUri = 'http://localhost:3000/callback';
    const configContent = `# Spotify App Configuration\n# Generated on: ${new Date().toISOString()}\n\nAPP_NAME="${appName}"\nWEBSITE="${website}"\nREDIRECT_URI="${redirectUri}"\n\n# Instructions for Spotify Developer Dashboard:\n# 1. Go to: https://developer.spotify.com/dashboard\n# 2. Click "Create App"\n# 3. Use these exact settings:\n#    - App name: ${appName}\n#    - App description: A React-based Spotify clone with real API integration\n#    - Website: ${website}\n#    - Redirect URI: ${redirectUri}\n#    - API/SDKs: Check "Web API"\n# 4. Click "Save"\n# 5. Copy your Client ID and Client Secret\n`;
    fs.writeFileSync('spotify-config.txt', configContent);
    log('✅ Created spotify-config.txt with setup instructions', 'green');
    return { appName, website, redirectUri };
}
function updateViteConfig() {
    const viteConfigPath = path.join(__dirname, 'vite.config.js');
    const viteConfig = `import { defineConfig } from 'vite'\nimport react from '@vitejs/plugin-react'\n\n// https://vitejs.dev/config/\nexport default defineConfig({\n  plugins: [react()],\n  server: {\n    port: 3000,\n    host: true\n  }\n})\n`;
    fs.writeFileSync(viteConfigPath, viteConfig);
    log('✅ Updated vite.config.js to use port 3000', 'green');
}
function updateSpotifyApiFile(clientId, clientSecret) {
    const spotifyApiPath = path.join(__dirname, 'src', 'services', 'spotifyApi.js');
    if (!fs.existsSync(spotifyApiPath)) {
        log('❌ src/services/spotifyApi.js not found!', 'red');
        process.exit(1);
    }
    let content = fs.readFileSync(spotifyApiPath, 'utf8');
    content = content.replace(/const CLIENT_ID = '.*?';/, `const CLIENT_ID = '${clientId}';`);
    content = content.replace(/const CLIENT_SECRET = '.*?';/, `const CLIENT_SECRET = '${clientSecret}';`);
    fs.writeFileSync(spotifyApiPath, content);
    log('✅ Updated src/services/spotifyApi.js with your credentials', 'green');
}
function updateEnvFile(clientId, clientSecret) {
    const envContent = `VITE_SPOTIFY_CLIENT_ID=${clientId}\nVITE_SPOTIFY_CLIENT_SECRET=${clientSecret}\nVITE_APP_URL=http://localhost:3000\n`;
    fs.writeFileSync('.env', envContent);
    log('✅ Created/updated .env file with your credentials', 'green');
    // Add .env to .gitignore if not already there
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
function openSpotifyDashboard() {
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
function startDevServerAndOpenApp() {
    log('\n🚀 Starting development server...', 'blue');
    const child = spawn('npm', ['run', 'dev'], { stdio: 'inherit', shell: true });
    // Wait a few seconds, then open the browser
    setTimeout(() => {
        const url = 'http://localhost:3000';
        try {
            if (process.platform === 'win32') {
                execSync(`start ${url}`);
            } else if (process.platform === 'darwin') {
                execSync(`open ${url}`);
            } else {
                execSync(`xdg-open ${url}`);
            }
            log('✅ Opened app in browser', 'green');
        } catch (error) {
            log('⚠️  Could not open app automatically', 'yellow');
            log(`   Please manually visit: ${url}`, 'blue');
        }
    }, 5000);
}
async function main() {
    await checkPrerequisites();
    const { appName, website, redirectUri } = generateSpotifyConfig();
    updateViteConfig();
    openSpotifyDashboard();
    log('\n📋 Please create your Spotify app as instructed in spotify-config.txt.', 'yellow');
    log('   After creating the app, copy your Client ID and Client Secret below.\n', 'yellow');
    const clientId = await question('Enter your Spotify Client ID: ');
    const clientSecret = await question('Enter your Spotify Client Secret: ');
    updateSpotifyApiFile(clientId.trim(), clientSecret.trim());
    updateEnvFile(clientId.trim(), clientSecret.trim());
    log('\n🎉 Setup complete! Launching your app...', 'green');
    rl.close();
    await sleep(1000);
    startDevServerAndOpenApp();
}
main(); 