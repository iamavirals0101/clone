# 🔧 Fix Redirect URI Issue

## Problem
You're getting this error: "This redirect URI is not secure. Learn more here."

## Solution

### Option 1: Update Your Spotify App Settings

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Click on your app
3. Click "Edit Settings"
4. In the "Redirect URIs" section:
   - **Remove**: `http://localhost:5174/callback`
   - **Add**: `http://localhost:3000/callback`
5. Click "Save"

### Option 2: Use the Automated Setup

Run the automated setup script which will guide you through the correct configuration:

```bash
npm run setup-spotify
```

### Option 3: Manual Configuration

If you prefer to configure manually:

1. **Update your Spotify app settings**:
   - Website: `http://localhost:3000`
   - Redirect URI: `http://localhost:3000/callback`

2. **Update your local configuration**:
   - The setup script will automatically update all files
   - Or manually update `src/services/spotifyApi.js`

3. **Restart your development server**:
   ```bash
   npm run dev
   ```

## Why This Happens

- Spotify requires secure redirect URIs
- `localhost:3000` is more commonly accepted than `localhost:5174`
- The port 3000 is considered more standard for development

## Verification

After making changes:
1. Your app should run on `http://localhost:3000`
2. The redirect URI should be exactly `http://localhost:3000/callback`
3. No more "not secure" errors

## Need Help?

- Check that your Spotify app settings match exactly
- Ensure no extra spaces in the redirect URI
- Restart your development server after changes 