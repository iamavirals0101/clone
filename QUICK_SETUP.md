# 🚀 Quick Spotify Setup Guide

## Automated Setup (Recommended)

The easiest way to set up Spotify API integration is using our automated script!

### Step 1: Run the Setup Script

```bash
npm run setup-spotify
```

### Step 2: Follow the Prompts

The script will:
1. ✅ Check your system prerequisites
2. 🌐 Open Spotify Developer Dashboard in your browser
3. 📝 Guide you through creating a Spotify app
4. 🔑 Ask for your Client ID and Client Secret
5. ⚙️ Automatically update all configuration files
6. 🔐 Create secure environment variables
7. 🧪 Test your setup

### Step 3: Start Using Spotify!

```bash
npm run dev
```

Then visit `http://localhost:3000` and click "Connect" in the sidebar!

---

## Manual Setup (Alternative)

If you prefer to set up manually, follow the detailed guide in `SPOTIFY_SETUP.md`.

---

## What You Get

✅ **Real Spotify Search** - Search millions of tracks  
✅ **Preview Playback** - Play 30-second song previews  
✅ **Your Playlists** - Access your Spotify playlists  
✅ **Recommendations** - Get personalized music suggestions  
✅ **Real Metadata** - Album covers, artist names, durations  

---

## Troubleshooting

### Common Issues:

1. **"Invalid redirect URI"**
   - Make sure redirect URI is exactly: `http://localhost:3000/callback`

2. **"Invalid client"**
   - Check your Client ID and Client Secret are correct

3. **Setup script not working**
   - Make sure you're in the project root directory
   - Ensure Node.js and npm are installed

### Need Help?

- Check the browser console for error messages
- Review `SPOTIFY_SETUP.md` for detailed troubleshooting
- Ensure your Spotify app settings are correct

---

## Security Notes

- Your credentials are stored in `.env` file (automatically added to `.gitignore`)
- Never commit your Client Secret to version control
- The setup script creates secure environment variables

---

🎵 **Happy coding!** Your Spotify 2.0 clone is ready to rock! 🎵 