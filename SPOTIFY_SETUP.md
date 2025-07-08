# Spotify API Setup Guide

This guide will help you set up the Spotify API integration for the Spotify 2.0 Clone.

## Prerequisites

1. A Spotify account (free or premium)
2. Node.js and npm installed
3. The project running locally

## Step 1: Create a Spotify App

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Log in with your Spotify account
3. Click "Create App"
4. Fill in the app details:
   - **App name**: `Spotify 2.0 Clone` (or any name you prefer)
   - **App description**: `A React-based Spotify clone with real API integration`
   - **Website**: `http://localhost:3000`
   - **Redirect URI**: `http://localhost:3000/callback`
   - **API/SDKs**: Check "Web API"
5. Click "Save"

## Step 2: Get Your Credentials

After creating the app, you'll see:
- **Client ID**: Copy this (you'll need it)
- **Client Secret**: Click "Show Client Secret" and copy it

## Step 3: Update the Configuration

1. Open `src/services/spotifyApi.js`
2. Replace the placeholder values:

```javascript
// Replace these lines in spotifyApi.js
const CLIENT_ID = 'YOUR_SPOTIFY_CLIENT_ID'; // Replace with your actual Client ID
const REDIRECT_URI = 'http://localhost:5174/callback';

// In the getTokens and refreshAccessToken methods, replace:
'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + 'YOUR_CLIENT_SECRET')
// With:
'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + 'your_actual_client_secret')
```

## Step 4: Test the Integration

1. Start your development server: `npm run dev`
2. Open the app in your browser
3. Click "Connect" in the sidebar
4. You'll be redirected to Spotify to authorize the app
5. After authorization, you'll be redirected back to the app

## Features Available After Setup

✅ **Real Spotify Search**: Search millions of tracks from Spotify's library
✅ **Preview Playback**: Play 30-second previews of songs
✅ **User Playlists**: Access your Spotify playlists
✅ **Recommendations**: Get personalized song recommendations
✅ **Track Information**: Real album covers, artist names, and metadata

## Troubleshooting

### Common Issues

1. **"Invalid redirect URI" error**
   - Make sure the redirect URI in your Spotify app exactly matches: `http://localhost:3000/callback`
   - Check for extra spaces or typos

2. **"Invalid client" error**
   - Verify your Client ID and Client Secret are correct
   - Make sure you copied the entire Client Secret

3. **CORS errors**
   - Ensure your app is running on `http://localhost:3000`
   - Check that the redirect URI matches exactly

4. **"No access token available" error**
   - Try logging out and logging back in
   - Clear your browser's local storage

### Security Notes

- Never commit your Client Secret to version control
- For production, use environment variables
- The Client Secret should be kept secure

## Environment Variables (Recommended)

For better security, you can use environment variables:

1. Create a `.env` file in your project root:
```
VITE_SPOTIFY_CLIENT_ID=your_client_id_here
VITE_SPOTIFY_CLIENT_SECRET=your_client_secret_here
```

2. Update `spotifyApi.js` to use environment variables:
```javascript
const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
```

3. Add `.env` to your `.gitignore` file

## API Limitations

- **Preview URLs**: Only available for some tracks (30-second previews)
- **Rate Limits**: Spotify has rate limits on API calls
- **Premium Features**: Some features require a Spotify Premium account

## Next Steps

After setup, you can:
- Search for any song, artist, or album
- Play previews of songs
- Browse your Spotify playlists
- Get personalized recommendations
- Enjoy the full Spotify experience in your clone!

## Support

If you encounter issues:
1. Check the browser console for error messages
2. Verify your Spotify app settings
3. Ensure your credentials are correct
4. Try logging out and back in

Happy coding! 🎵 