import axios from 'axios';

const TWITCH_CLIENT_ID = process.env.TWITCH_CLIENT_ID;
const TWITCH_CLIENT_SECRET = process.env.TWITCH_CLIENT_SECRET;

let accessToken = null;

export const getTwitchAccessToken = async () => {
    if (accessToken) return accessToken;

    try {
        const response = await axios.post('https://id.twitch.tv/oauth2/token', null, {
            params: {
                client_id: TWITCH_CLIENT_ID,
                client_secret: TWITCH_CLIENT_SECRET,
                grant_type: 'client_credentials'
            }
        });

        accessToken = response.data.access_token;
        console.log(`Twitch access token acquired`);
        return accessToken;
    } catch (err) {
        console.error(`Failed to get Twitch access token:`, err.response.data);
        throw new Error('Failed to authenticate with Twitch');
    }
};
