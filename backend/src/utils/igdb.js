import axios from 'axios';
import { getTwitchAccessToken } from './twitchAuth.js';

const IGDB_URL = 'https://api.igdb.com/v4';

export const searchGameOnIGDB = async (gameName) => {
    try {
        const token = await getTwitchAccessToken();

        const response = await axios.post(
            `${IGDB_URL}/games`,
            `search "${gameName}"; fields name, aggregated_rating, first_release_date, total_rating, total_rating_count, game_modes; limit 1;`,
            {
                headers: {
                    'Client-ID': process.env.TWITCH_CLIENT_ID,
                    'Authorization': `Bearer ${token}`
                }
            }
        );

        if (response.data.length > 0) {
            const game = response.data[0];
            console.log(`Found Game on IGDB:`, gameName);

            return {
                name: game.name,
                rating: game.aggregated_rating || 0,
                releaseDate: game.first_release_date
                    ? new Date(game.first_release_date * 1000).toLocaleDateString()
                    : 'Unknown'
            };
        } else {
            console.log(`No result for "${gameName}"`);
            return null;
        }
    } catch (err) {
        console.error(`Failed to search IGDB:`, err.response?.data || err.message);
        return null;
    }
};
