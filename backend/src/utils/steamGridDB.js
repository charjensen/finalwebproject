import SGDB from "steamgriddb";

const client = new SGDB({
    key: process.env.STEAMGRIDDB_API_KEY,
    baseURL: 'https://www.steamgriddb.com/api/v2'
});

export const getGameLogoFromSteamGridDB = async (appid, name) => {
    try {
        let logos;

        console.log(`Searching for logo - App ID: ${appid}, Name: ${name}`);

        // First try to get "white_logo" (better quality logo type)
        if (appid) {
            logos = await client.getGrids({ type: 'steam', id: appid, styles: ['white_logo'] });
            console.log(`Found white logos by App ID:`, logos);
        }

        if (!logos || logos.length === 0) {
            console.log(`Searching for logo by name: ${name}`);
            const searchResults = await client.searchGame(name);

            if (searchResults.length > 0) {
                const gameId = searchResults[0].id;
                logos = await client.getGrids({ type: 'game', id: gameId, styles: ['white_logo'] });
                console.log(`Found white logos by Game ID:`, logos);
            }
        }

        // If no "white_logo" found, try "official"
        if (!logos || logos.length === 0) {
            console.log(`Searching for official cover by name: ${name}`);
            if (appid) {
                logos = await client.getGrids({ type: 'steam', id: appid, styles: ['official'] });
            }

            if (!logos || logos.length === 0) {
                const searchResults = await client.searchGame(name);
                if (searchResults.length > 0) {
                    const gameId = searchResults[0].id;
                    logos = await client.getGrids({ type: 'game', id: gameId, styles: ['official'] });
                }
            }
        }

        // Final fallback to alternate style if all else fails
        if (!logos || logos.length === 0) {
            console.log(`Attempting to find alternate cover for ${name}`);
            if (appid) {
                logos = await client.getGrids({ type: 'steam', id: appid, styles: ['alternate'] });
            }

            if (!logos || logos.length === 0) {
                const searchResults = await client.searchGame(name);
                if (searchResults.length > 0) {
                    const gameId = searchResults[0].id;
                    logos = await client.getGrids({ type: 'game', id: gameId, styles: ['alternate'] });
                }
            }
        }

        if (logos && logos.length > 0) {
            const selectedLogo = logos[0];
            console.log(`Selected Logo URL: ${selectedLogo?.url}`);
            return selectedLogo?.url || null;
        }

        console.log(`❌ No logo match found on SteamGridDB for ${name}`);
        return null;
    } catch (err) {
        console.error(`🚨 SteamGridDB error for ${name}:`, err.message);
        return null;
    }
};
