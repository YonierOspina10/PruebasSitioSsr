/**
 * Opens a game for the user by setting the selected game and configuring the necessary options.
 *
 * @param {any} game - The game object containing details about the selected game.
 * @param {any} context - The context object containing session and configuration details.
 */
export function openGame(game: any, context: any) {
	// Set the selected game in the context
	context.gameSelected = game;

	// Check if the user is logged in
	if (context.session.logueado) {
		// Show the game interface
		context.showGame = true;

		// Prepare options for the game
		let optionsGames = {
			gameid: game.id, // ID of the selected game
			mode: 'real', // Mode of the game (real or demo)
			provider: game.provider, // Provider of the game
			lan: context.lngProd, // Language setting
			partnerid: context.partner, // Partner ID for tracking
			token: context.tokenUser, // User token for authentication
			balance: 0, // Initial balance set to zero
			currency: context.session.moneda, // Currency of the session
			userid: context.session.usuario, // User ID of the logged-in user
			isMobile: context.mobile === '1', // Check if the user is on a mobile device
		};

		// Log the partner ID for debugging purposes
		console.log(context.partner);

		// Update the browser history based on the current view
		if (context.viewActual.indexOf('new-casino') !== -1) {
			window.history.pushState('', '', '/new-casino/' + game.id);
		} else if (context.viewActual.indexOf('live-casino-vivo') !== -1) {
			window.history.pushState('', '', '/live-casino-vivo/' + game.id);
		} else if (context.viewActual.indexOf('virtuales-lobby') !== -1) {
			window.history.pushState('', '', '/virtuales-lobby/' + game.id);
		}

		// Construct the source URL for the game
		context.src =
			context.config.urlCasinoPlay +
			'?gameid=' +
			optionsGames.gameid +
			'&mode=' +
			optionsGames.mode +
			'&provider=' +
			optionsGames.provider +
			'&lan=' +
			optionsGames.lan +
			'&partnerid=' +
			optionsGames.partnerid +
			'&token=' +
			optionsGames.token +
			'&balance=' +
			optionsGames.balance +
			'&currency=' +
			optionsGames.currency +
			'&userid=' +
			optionsGames.userid +
			'&isMobile=' +
			optionsGames.isMobile;
	} else {
		// Show the login modal if the user is not logged in
		context.showModalLogin = true;
	}
}

// FILE DOCUMENTED
