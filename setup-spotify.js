#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('🎵 Spotify API Setup Automation 🎵');
console.log('=====================================\n');

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

function question(prompt) {
    return new Promise((resolve) => {
        rl.question(prompt, resolve);
    });
}

async function checkPrerequisites() {
    log('\n🔍 Checking prerequisites...', 'blue');

    // Check if Node.js is installed
    try {
        const nodeVersion = execSync('node --version', { encoding: 'utf8' }).trim();
        log(`✅ Node.js version: ${nodeVersion}`, 'green');
    } catch (error) {
        log('❌ Node.js is not installed. Please install Node.js first.', 'red');
        process.exit(1);
    }

    // Check if npm is installed
    try {
        const npmVersion = execSync('npm --version', { encoding: 'utf8' }).trim();
        log(`✅ npm version: ${npmVersion}`, 'green');
    } catch (error) {
        log('❌ npm is not installed. Please install npm first.', 'red');
        process.exit(1);
    }

    // Check if project is running
    try {
        const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
        log(`✅ Project: ${packageJson.name}`, 'green');
    } catch (error) {
        log('❌ package.json not found. Please run this script from the project root.', 'red');
        process.exit(1);
    }

    log('✅ All prerequisites met!\n', 'green');
}

async function createSpotifyApp() {
    log('\n🎯 Step 1: Create Spotify App', 'blue');
    log('This will open the Spotify Developer Dashboard in your browser...', 'yellow');

    const proceed = await question('Press Enter to continue or type "skip" to skip this step: ');

    if (proceed.toLowerCase() === 'skip') {
        log('⏭️  Skipping browser automation...', 'yellow');
        return;
    }

    // Open Spotify Developer Dashboard
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
        log('⚠️  Could not open browser automatically. Please manually visit:', 'yellow');
        log(`   ${url}`, 'blue');
    }

    log('\n📋 Please follow these steps in the browser:', 'yellow');
    log('1. Log in with your Spotify account', 'reset');
    log('2. Click "Create App"', 'reset');
    log('3. Fill in the app details:', 'reset');
    log('   - App name: Spotify 2.0 Clone', 'reset');
    log('   - App description: A React-based Spotify clone with real API integration', 'reset');
    log('   - Website: http://localhost:3000', 'reset');
    log('   - Redirect URI: http://localhost:3000/callback', 'reset');
    log('   - API/SDKs: Check "Web API"', 'reset');
    log('4. Click "Save"', 'reset');
    log('5. Copy your Client ID and Client Secret\n', 'reset');
}

async function getCredentials() {
    log('\n🔑 Step 2: Enter Your Credentials', 'blue');

    const clientId = await question('Enter your Spotify Client ID: ');
    if (!clientId.trim()) {
        log('❌ Client ID is required!', 'red');
        process.exit(1);
    }

    const clientSecret = await question('Enter your Spotify Client Secret: ');
    if (!clientSecret.trim()) {
        log('❌ Client Secret is required!', 'red');
        process.exit(1);
    }

    return { clientId: clientId.trim(), clientSecret: clientSecret.trim() };
}

function updateSpotifyApiFile(credentials) {
    log('\n📝 Step 3: Updating Configuration Files', 'blue');

    const spotifyApiPath = path.join(__dirname, 'src', 'services', 'spotifyApi.js');

    if (!fs.existsSync(spotifyApiPath)) {
        log('❌ spotifyApi.js file not found!', 'red');
        process.exit(1);
    }

    let content = fs.readFileSync(spotifyApiPath, 'utf8');

    // Replace Client ID
    content = content.replace(
        /const CLIENT_ID = 'YOUR_SPOTIFY_CLIENT_ID';/,
        `const CLIENT_ID = '${credentials.clientId}';`
    );

    // Replace Client Secret in both places
    content = content.replace(
        /'Authorization': 'Basic ' \+ btoa\(CLIENT_ID \+ ':' \+ 'YOUR_CLIENT_SECRET'\)/g,
        `'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + '${credentials.clientSecret}')`
    );

    fs.writeFileSync(spotifyApiPath, content);
    log('✅ Updated spotifyApi.js with your credentials', 'green');
}

function createEnvFile(credentials) {
    log('\n🔐 Step 4: Creating Environment File', 'blue');

    const envContent = `# Spotify API Credentials
VITE_SPOTIFY_CLIENT_ID=${credentials.clientId}
VITE_SPOTIFY_CLIENT_SECRET=${credentials.clientSecret}

# Development Settings
VITE_APP_URL=http://localhost:3000
`;

    fs.writeFileSync('.env', envContent);
    log('✅ Created .env file with your credentials', 'green');

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

function updateSpotifyApiWithEnv() {
    log('\n🔄 Step 5: Updating API to Use Environment Variables', 'blue');

    const spotifyApiPath = path.join(__dirname, 'src', 'services', 'spotifyApi.js');
    let content = fs.readFileSync(spotifyApiPath, 'utf8');

    // Update to use environment variables
    content = content.replace(
        /const CLIENT_ID = '[^']*';/,
        "const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID || 'YOUR_SPOTIFY_CLIENT_ID';"
    );

    // Add CLIENT_SECRET constant
    if (!content.includes('const CLIENT_SECRET')) {
        content = content.replace(
            /const CLIENT_ID = [^;]+;/,
            `const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID || 'YOUR_SPOTIFY_CLIENT_ID';
const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET || 'YOUR_CLIENT_SECRET';`
        );
    }

    // Update authorization headers to use CLIENT_SECRET
    content = content.replace(
        /'Authorization': 'Basic ' \+ btoa\(CLIENT_ID \+ ':' \+ '[^']*'\)/g,
        "'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET)"
    );

    fs.writeFileSync(spotifyApiPath, content);
    log('✅ Updated API to use environment variables', 'green');
}

function testConfiguration() {
    log('\n🧪 Step 6: Testing Configuration', 'blue');

    // Check if development server is running
    try {
        const result = execSync('netstat -an | findstr :3000', { encoding: 'utf8' });
        if (result.includes('LISTENING')) {
            log('✅ Development server is running on port 3000', 'green');
        } else {
            log('⚠️  Development server not detected on port 3000', 'yellow');
            log('   Please run: npm run dev', 'blue');
        }
    } catch (error) {
        log('⚠️  Could not check if development server is running', 'yellow');
        log('   Please ensure the server is running on port 3000', 'blue');
    }
}

function showNextSteps() {
    log('\n🎉 Setup Complete!', 'green');
    log('=====================================', 'green');

    log('\n📋 Next Steps:', 'blue');
    log('1. Start your development server:', 'reset');
    log('   npm run dev', 'yellow');

    log('\n2. Open your browser and go to:', 'reset');
    log('   http://localhost:3000', 'yellow');

    log('\n3. Click "Connect" in the sidebar', 'reset');

    log('\n4. Authorize the app with Spotify', 'reset');

    log('\n5. Start searching and playing real music!', 'reset');

    log('\n🔧 Troubleshooting:', 'blue');
    log('• If you get "Invalid redirect URI" error:', 'reset');
    log('  Make sure the redirect URI in your Spotify app is exactly:', 'yellow');
    log('  http://localhost:3000/callback', 'yellow');

    log('\n• If you get "Invalid client" error:', 'reset');
    log('  Check that your Client ID and Client Secret are correct', 'yellow');

    log('\n• For more help, check the SPOTIFY_SETUP.md file', 'reset');

    log('\n🎵 Happy coding!', 'green');
}

async function main() {
    try {
        await checkPrerequisites();
        await createSpotifyApp();
        const credentials = await getCredentials();
        updateSpotifyApiFile(credentials);
        createEnvFile(credentials);
        updateSpotifyApiWithEnv();
        testConfiguration();
        showNextSteps();
    } catch (error) {
        log(`\n❌ Setup failed: ${error.message}`, 'red');
        process.exit(1);
    } finally {
        rl.close();
    }
}

// Run the setup
main(); 