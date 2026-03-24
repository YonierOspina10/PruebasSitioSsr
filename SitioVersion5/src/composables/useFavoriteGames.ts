import apiService from "@/services/ApiService";

/**
 * Custom hook for managing favorite casino games.
 * Provides functions to toggle game favorites and sync them with backend or local storage.
 *
 * @param {any} appComponent - The main application component containing state, session, and game data.
 * @param {any} emitter - Optional event emitter for broadcasting favorite state changes.
 * @returns {Object} - Contains methods to toggle and fetch favorite games.
 */
export function useFavoriteGames(appComponent: any, emitter: any) {

  const toggleSaveToMyCasinoGames = async (game: any) => {
    const isFavorite = appComponent.myListFavoriteGame.includes(game.id);
    if (
      appComponent.config.activeFavoritesWithBackend != undefined &&
      appComponent.config.activeFavoritesWithBackend == true
    ) {
      if (appComponent.session.logueado) {
          let params = {
              user: appComponent.session.usuario, // Set user ID
              game_id: game.id, // Set game ID
              status: isFavorite ? 'I' : 'A', // Set favorite status
          };
          apiService.request('manage_favorite_games', params).then((response) => {
              if (response.code == 0) {
                  if (params.status === 'A') {
                      if (!appComponent.myListFavoriteGame.includes(game.id)) {
                          appComponent.myListFavoriteGame.push(game.id);
                      }
                      game.fav = true;
                  } else {
                      appComponent.myListFavoriteGame = appComponent.myListFavoriteGame.filter(
                        (id) => id !== game.id
                      );
                      game.fav = false;
                  }
                  // this.getFavoriteGames();
                  }
          });
        } else {
          appComponent.showModalLogin = true; // Show login modal if not logged in
        }
      } else {
        appComponent.favCasino = true; // Set favorite casino flag
      }
    }

  const getFavoriteGames = async () => {
    if (!appComponent.session?.logueado) {
      return;
    }

    let params = {
      user_id: appComponent.session.usuario,
    };

    const response = await apiService.request("get_casino_favorite_ids", params);
    if (response && response.code == 0) {
      let favorites = response.data.favorites || [];
      favorites.forEach((id) => {
        if (id != undefined) {
            if (!appComponent.myListFavoriteGame.includes(parseInt(id))) {
                appComponent.myListFavoriteGame.push(parseInt(id)); // Add to favorite list if not already present
            }
        }
      });
      
      appComponent.gamesList.forEach((game) => {
        game.fav = false; // Reset favorite flag for each game
        favorites.forEach((id) => {
            if (game.id == id) {
                game.fav = true; // Set favorite flag if game is in favorites
            }
        });
      });
    } else {
      return {
        error: true,
        error_code: response.error_code, // Return error object
      };
    }
  };

  const selectCategoryFav = async (typelobby: number) => {
    await getFavoriteGames();
    if (!appComponent.config.activeFavoritesWithBackend) {
        appComponent.gamesList = appComponent.myCasinoGames;
        appComponent.total_count = appComponent.gamesList.length;
        appComponent.selections.category.id = 1811;
        return;
    }

    const limitConfig = appComponent.config.casino.limit;
    const urlVirtualplay = appComponent.config.urlVirtualplay;

    let params: any = {
        action: 'getGames2',
        partner_id: appComponent.partnerG,
        typelobby: typelobby,
        offset: 0,
        limit: limitConfig,
        country: appComponent.country,
        favorite: appComponent.myListFavoriteGame.join(','),
    };

    if (appComponent.mobile === '1') {
        params.is_mobile = true;
    }

    const response: any = await apiService.requestGet(urlVirtualplay, params);

    if (response.status === 200 || response.status === 'ok') {
        appComponent.gamesList = response.data.games;
        appComponent.total_count = response.data.total_count;
    }

    appComponent.loadingGames = false;
};

  // Exposing public methods
  return {
    toggleSaveToMyCasinoGames, // Method to toggle game favorites
    getFavoriteGames, // Method to fetch favorites from backend
    selectCategoryFav, // Method to select favorite category
  };
}

// FILE DOCUMENTED
