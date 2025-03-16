import Game from '../models/Game.js';
import { searchGameOnIGDB } from './igdb.js';

export const getTopRecommendedGames = async (userGames) => {
    let recommendations = [];

    // Filter games with 0 playtime and limit to 20
    const filteredGames = userGames
        .filter(game => game.playtime === 0)
        .slice(0, 20); // Limit to 20 games

    for (const game of filteredGames) {
        console.log(`🔍 Searching for game on IGDB: ${game.name}`);

        const igdbData = await searchGameOnIGDB(game.name);

        if (igdbData) {
            recommendations.push({
                name: game.name,
                rating: igdbData.rating.toFixed(1),
                logoUrl: game.logoUrl,
                releaseDate: igdbData.releaseDate,
                appid: game.appid
            });
        }
    }

    // Sort by highest rating and limit to 5
    recommendations.sort((a, b) => b.rating - a.rating);
    return recommendations.slice(0, 5);
};
