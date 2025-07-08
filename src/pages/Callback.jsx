import React, { useEffect } from 'react';
import { useSpotify } from '../contexts/SpotifyContext';

const Callback = () => {
    const { handleCallback, error, isLoading } = useSpotify();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const error = urlParams.get('error');

        if (error) {
            console.error('Spotify auth error:', error);
            // Redirect to home with error
            window.location.href = '/?error=auth_failed';
            return;
        }

        if (code) {
            handleCallback(code);
        } else {
            // No code found, redirect to home
            window.location.href = '/';
        }
    }, [handleCallback]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-500 mx-auto mb-4"></div>
                    <h2 className="text-white text-xl font-semibold mb-2">Connecting to Spotify...</h2>
                    <p className="text-gray-400">Please wait while we authenticate your account.</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-red-500 text-6xl mb-4">❌</div>
                    <h2 className="text-white text-xl font-semibold mb-2">Authentication Failed</h2>
                    <p className="text-gray-400 mb-4">{error}</p>
                    <button
                        onClick={() => window.location.href = '/'}
                        className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors"
                    >
                        Go Back Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
            <div className="text-center">
                <div className="text-green-500 text-6xl mb-4">✅</div>
                <h2 className="text-white text-xl font-semibold mb-2">Successfully Connected!</h2>
                <p className="text-gray-400">Redirecting you to the app...</p>
            </div>
        </div>
    );
};

export default Callback; 