import { createRouter, createWebHistory } from 'vue-router'; // Importing Vue Router and history mode
import HomeView from '../views/HomeView.vue'; // Importing the HomeView component

/**
 * Route guard to check if the user is authenticated.
 *
 * @param to - The target Route Object being navigated to.
 * @param from - The current route being navigated away from.
 * @param next - The function to call to resolve the hook.
 */
function guardMyroute(to, from, next) {
    var auth_token: any = localStorage.getItem('auth_token'); // Retrieve the authentication token from local storage
    var isAuthenticated: boolean = false; // Initialize authentication status

    // Check if the authentication token is valid
    if (auth_token != '' && auth_token != undefined && auth_token != null) {
        isAuthenticated = true; // User is authenticated
    } else {
        isAuthenticated = false; // User is not authenticated
    }

    // Proceed to the next route if authenticated, otherwise redirect to home
    if (isAuthenticated) {
        next();
    } else {
        next('/'); // Redirect to home if not authenticated
    }
}

/**
 * Route guard to check if the user is authenticated.
 *
 * @param to - The target Route Object being navigated to.
 * @param from - The current route being navigated away from.
 * @param next - The function to call to resolve the hook.
 */
function guardMyrouteInfoApp(to, from, next) {
    var auth_token: any = localStorage.getItem('auth_token'); // Retrieve the authentication token from local storage
    let infoApp: any = (window as any).infoApp!= undefined ? (window as any).infoApp : false;
    var isAuthenticated: boolean = false; // Initialize authentication status

    // Check if the authentication token is valid
    if (auth_token != '' && auth_token != undefined && auth_token != null) {
        isAuthenticated = true; // User is authenticated
    } else {
        isAuthenticated = false; // User is not authenticated
    }

    // Proceed to the next route if authenticated, otherwise redirect to home
    if (isAuthenticated && !infoApp) {
        next();
    } else {
        next('/'); // Redirect to home if not authenticated
    }
}

/**
 * Route guard to check if the user is authenticated for login routes.
 *
 * @param to - The target Route Object being navigated to.
 * @param from - The current route being navigated away from.
 * @param next - The function to call to resolve the hook.
 */
function guardMyrouteLogin(to, from, next) {
    var auth_token: any = localStorage.getItem('auth_token'); // Retrieve the authentication token from local storage
    var isAuthenticated: boolean = false; // Initialize authentication status

    // Check if the authentication token is valid
    if (auth_token != '' && auth_token != undefined && auth_token != null) {
        isAuthenticated = true; // User is authenticated
    } else {
        isAuthenticated = false; // User is not authenticated
    }

    // If authenticated, redirect to the appropriate login URL or home
    if (isAuthenticated) {
        if (
            (window as any).cconfig.general != undefined && // Check if general config exists
            (window as any).cconfig.general[(window as any).cconfig.countryL] != undefined && // Check if country-specific config exists
            (window as any).cconfig.general[(window as any).cconfig.countryL].urlRedirectableLogin != undefined // Check if redirectable login URL exists
        ) {
            next(
                (window as any).cconfig.general[(window as any).cconfig.countryL].urlRedirectableLogin != undefined
                    ? (window as any).cconfig.general[(window as any).cconfig.countryL].urlRedirectableLogin // Redirect to the specified login URL
                    : '/',
            );
        } else {
            next('/'); // Redirect to home if no valid login URL is found
        }
    } else {
        next(); // Proceed to the next route if not authenticated
    }
}

/**
 * Route guard function for validating access to the POS application.
 * @param to - The target Route Object being navigated to.
 * @param from - The current route being navigated away from.
 * @param next - A function to call to resolve the hook.
 */
function guardMyRouteAppPos(to, from, next) {
    // Retrieve the POS object from the global window object, if it exists.
    let appPOS: any = (window as any).POS != undefined ? (window as any).POS : false;
    // Initialize authentication status.
    let isAuthenticated: boolean = false;
    // Check if the appPOS is defined to set authentication status.
    if (appPOS != false) {
        isAuthenticated = true;
    } else {
        isAuthenticated = false;
    }
    // Proceed to the next route if authenticated, otherwise redirect to home.
    if (isAuthenticated) {
        next();
    } else {
        next('/');
    }
}

/**
 * Route guard function for validating access to the info application.
 * @param to - The target Route Object being navigated to.
 * @param from - The current route being navigated away from.
 * @param next - A function to call to resolve the hook.
 */
function guardMyRouteInfoApp(to, from, next) {
    // Retrieve the infoApp object from the global window object, if it exists.
    let infoApp: any = (window as any).infoApp!= undefined ? (window as any).infoApp : false;
    // Initialize authentication status.
    let isAuthenticated: boolean = false;
    // Check if the infoApp is defined to set authentication status.
    if (infoApp != false) {
        isAuthenticated = true;
    } else {
        isAuthenticated = false;
    }
    // Proceed to the next route if authenticated, otherwise redirect to home.
    if (isAuthenticated) {
        next('/');
    } else {
        next();
    }
}

// Create a router instance with defined routes and history mode.
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
          {
              path: "/:p/",
              name: "homeCountry",
              component: HomeView,
          },
          {
              path: "/:p/home",
              name: "home2Country",
              component: HomeView,
          },
          {
              path: "/:p/:pathMatch(.*)*",
              name: "pathNotFoundCountry",
              component: () => import("../views/PathNotFound.vue"),
          },
          {
              path: "/:p/registro",
              name: "registerCountry",
              beforeEnter: guardMyrouteLogin,
              component: () => import("../views/Register.vue"),
          },
          {
              path: "/:p/registro/:Codigo",
              name: "register2Country",
              beforeEnter: guardMyrouteLogin,
              component: () => import("../views/Register.vue"),
          },
          {
              path: "/:p/registro/aff/:Codigo2",
              name: "register3Country",
              beforeEnter: guardMyrouteLogin,
              component: () => import("../views/Register.vue"),
          },
          {
              path: "/:p/registro/a/:Codigo3",
              name: "register4Country",
              beforeEnter: guardMyrouteLogin,
              component: () => import("../views/Register.vue"),
          },
          {
              path: "/:p/landing/registro",
              name: "register5Country",
              beforeEnter: guardMyrouteLogin,
              component: () => import("../views/Register.vue"),
          },
          {
              path: "/:p/criar-conta",
              name: "lregisterCountry",
              beforeEnter: guardMyrouteLogin,
              component: () => import("../views/Register.vue"),
          },
          {
              path: "/:p/criar-conta/:Codigo",
              name: "lregister2Country",
              beforeEnter: guardMyrouteLogin,
              component: () => import("../views/Register.vue"),
          },
          {
              path: "/:p/criar-conta/aff/:Codigo2",
              name: "lregister3Country",
              beforeEnter: guardMyrouteLogin,
              component: () => import("../views/Register.vue"),
          },
          {
              path: "/:p/criar-conta/a/:Codigo3",
              name: "lregister4Country",
              beforeEnter: guardMyrouteLogin,
              component: () => import("../views/Register.vue"),
          },
          {
              path: "/:p/landing/casino",
              name: "register6Country",
              beforeEnter: guardMyrouteLogin,
              component: () => import("../views/Register.vue"),
          },
          {
              path: "/:p/landing/registro-casino",
              name: "register7Country",
              beforeEnter: guardMyrouteLogin,
              component: () => import("../views/Register.vue"),
          },
          {
              path: "/:p/landing/deportivas",
              name: "register8Country",
              beforeEnter: guardMyrouteLogin,
              component: () => import("../views/Register.vue"),
          },
          {
              path: "/:p/landing/depositos",
              name: "landingdepositosCountry",
              component: () => import("../views/Balance/LandingDeposit.vue"),
          },
          {
              path: "/:p/landing/depositos-ecuador",
              name: "landingdepositosCountryEcuador",
              component: () => import("../views/Balance/LandingDeposit.vue"),
          },
          {
              path: "/:p/landing/registro-deportivas",
              name: "register9Country",
              beforeEnter: guardMyrouteLogin,
              component: () => import("../views/Register.vue"),
          },
          {
              path: "/:p/landing/registro-corto",
              name: "register10Country",
              beforeEnter: guardMyrouteLogin,
              component: () => import("../views/Register.vue"),
          },
          {
              path: "/:p/landing/registro-corto/:Codigo",
              name: "register11Country",
              beforeEnter: guardMyrouteLogin,
              component: () => import("../views/Register.vue"),
          },
          {
              path: "/:p/landing/registro-corto/aff/:Codigo2",
              name: "register12Country",
              beforeEnter: guardMyrouteLogin,
              component: () => import("../views/Register.vue"),
          },
          {
              path: "/:p/landing/registro-corto/a/:Codigo3",
              name: "register13Country",
              beforeEnter: guardMyrouteLogin,
              component: () => import("../views/Register.vue"),
          },
          {
              path: "/:p/landing/registro-corto-loto",
              name: "register14Country",
              beforeEnter: guardMyrouteLogin,
              component: () => import("../views/Register.vue"),
          },
          {
              path: "/:p/casino/bono",
              name: "register15Country",
              beforeEnter: guardMyrouteLogin,
              component: () => import("../views/Register.vue"),
          },
          {
              path: "/:p/apuestas/bono",
              name: "register16Country",
              beforeEnter: guardMyrouteLogin,
              component: () => import("../views/Register.vue"),
          },
          {
              path: "/:p/deportes",
              name: "sportbookCountry",
              beforeEnter: guardMyRouteInfoApp,
              component: () => import("../views/Products/Sportbook.vue"),
          },
          {
              path: "/:p/deportes/partido/:PartidoId",
              name: "sportbook-partidoCountry",
              beforeEnter: guardMyRouteInfoApp,
              component: () => import("../views/Products/Sportbook.vue"),
          },
          {
              path: "/:p/deportes/liga/:LigaId",
              name: "sportbook-ligaCountry",
              beforeEnter: guardMyRouteInfoApp,
              component: () => import("../views/Products/Sportbook.vue"),
          },
          {
              path: "/:p/deportes/pais/:PaisId",
              name: "sportbook-paisCountry",
              beforeEnter: guardMyRouteInfoApp,
              component: () => import("../views/Products/Sportbook.vue"),
          },
          {
              path: "/:p/deportes/:DeporteId",
              name: "sportbook-deporteCountry",
              beforeEnter: guardMyRouteInfoApp,
              component: () => import("../views/Products/Sportbook.vue"),
          },
          {
              path: '/deportes/:DeporteId/pais/:PaisId/liga/:LigaId/partido/:PartidoId',
                name: 'sportbook-digitian',
              beforeEnter: guardMyRouteInfoApp,
              component: () => import("../views/Products/Sportbook.vue")
          },
          {
              path: '/deportes/:DeporteId/pais/:PaisId/liga/:LigaId',
                name: 'sportbook-digitian2',
              beforeEnter: guardMyRouteInfoApp,
              component: () => import("../views/Products/Sportbook.vue")
          },
          {
              path: '/deportes/:DeporteId/pais/:PaisId',
                name: 'sportbook-digitian3',
              beforeEnter: guardMyRouteInfoApp,
              component: () => import("../views/Products/Sportbook.vue")
          },
          {
              path: '/:p/deportes/:DeporteId/pais/:PaisId/liga/:LigaId/partido/:event',
                name: 'sportbook-digitianCountry',
              beforeEnter: guardMyRouteInfoApp,
              component: () => import("../views/Products/Sportbook.vue")
          },
          {
              path: '/:p/deportes/:DeporteId/pais/:PaisId/liga/:LigaId',
              name: 'sportbook-digitian2Country',
              beforeEnter: guardMyRouteInfoApp,
              component: () => import("../views/Products/Sportbook.vue")
          },
          {
              path: '/:p/deportes/:DeporteId/pais/:PaisId',
              name: 'sportbook-digitian3Country',
              beforeEnter: guardMyRouteInfoApp,
              component: () => import("../views/Products/Sportbook.vue")
          },
          {
              path: "/:p/apostas-esportivas",
              name: "lsportbookCountry",
              beforeEnter: guardMyRouteInfoApp,
              component: () => import("../views/Products/Sportbook.vue"),
          },

          {
            path: "/:p/apuestas-deportivas",
            name: "sportsBettingCountry",
            component: () => import("../views/Products/Sportbook.vue"),
        },
        {
            path: "/:p/apuestas-deportivas/partido/:PartidoId",
            name: "sportsBetting-partidoCountry",
            beforeEnter: guardMyRouteInfoApp,
            component: () => import("../views/Products/Sportbook.vue"),
        },
        {
            path: "/:p/apuestas-deportivas/liga/:LigaId",
            name: "sportsBetting-ligaCountry",
            beforeEnter: guardMyRouteInfoApp,
            component: () => import("../views/Products/Sportbook.vue"),
        },
        {
            path: "/:p/apuestas-deportivas/pais/:PaisId",
            name: "sportsBetting-paisCountry",
            beforeEnter: guardMyRouteInfoApp,
            component: () => import("../views/Products/Sportbook.vue"),
        },
        {
            path: "/:p/apuestas-deportivas/:DeporteId",
            name: "sportsBetting-deporteCountry",
            beforeEnter: guardMyRouteInfoApp,
            component: () => import("../views/Products/Sportbook.vue"),
        },

          {
              path: "/:p/apostas-esportivas/partido/:PartidoId",
              name: "lsportbook-partidoCountry",
              beforeEnter: guardMyRouteInfoApp,
              component: () => import("../views/Products/Sportbook.vue"),
          },
          {
              path: "/:p/apostas-esportivas/liga/:LigaId",
              name: "lsportbook-ligaCountry",
              beforeEnter: guardMyRouteInfoApp,
              component: () => import("../views/Products/Sportbook.vue"),
          },
          {
              path: "/:p/apostas-esportivas/pais/:PaisId",
              name: "lsportbook-paisCountry",
              beforeEnter: guardMyRouteInfoApp,
              component: () => import("../views/Products/Sportbook.vue"),
          },
          {
              path: "/:p/apostas-esportivas/:DeporteId",
              name: "lsportbook-deporteCountry",
              beforeEnter: guardMyRouteInfoApp,
              component: () => import("../views/Products/Sportbook.vue"),
          },
          {
              path: "/:p/esportes",
              name: "esportesCountry",
              beforeEnter: guardMyRouteInfoApp,
              component: () => import("../views/Products/Sportbook.vue"),
          },
          {
              path: "/:p/esportes/partido/:PartidoId",
              name: "esportes-partidoCountry",
              beforeEnter: guardMyRouteInfoApp,
              component: () => import("../views/Products/Sportbook.vue"),
          },
          {
              path: "/:p/esportes/liga/:LigaId",
              name: "esportes-ligaCountry",
              beforeEnter: guardMyRouteInfoApp,
              component: () => import("../views/Products/Sportbook.vue"),
          },
          {
              path: "/:p/esportes/pais/:PaisId",
              name: "esportes-paisCountry",
              beforeEnter: guardMyRouteInfoApp,
              component: () => import("../views/Products/Sportbook.vue"),
          },
          {
              path: "/:p/esportes/:DeporteId",
              name: "esportes-deporteCountry",
              beforeEnter: guardMyRouteInfoApp,
              component: () => import("../views/Products/Sportbook.vue"),
          },
          {
              path: "/:p/deportes2",
              name: "sportbook4Country",
              beforeEnter: guardMyRouteInfoApp,
              component: () => import("../views/Products/Sportbook4.vue"),
          },
          {
              path: "/:p/deportes2/partido/:PartidoId",
              name: "sportbook4-partidoCountry",
              beforeEnter: guardMyRouteInfoApp,
              component: () => import("../views/Products/Sportbook4.vue"),
          },
          {
              path: "/:p/deportes2/liga/:LigaId",
              name: "sportbook4-ligaCountry",
              beforeEnter: guardMyRouteInfoApp,
              component: () => import("../views/Products/Sportbook4.vue"),
          },
          {
              path: "/:p/deportes2/pais/:PaisId",
              name: "sportbook4-paisCountry",
              beforeEnter: guardMyRouteInfoApp,
              component: () => import("../views/Products/Sportbook4.vue"),
          },
          {
              path: "/:p/deportes2/:DeporteId",
              name: "sportbook4-deporteCountry",
              beforeEnter: guardMyRouteInfoApp,
              component: () => import("../views/Products/Sportbook4.vue"),
          },
          {
              path: "/:p/apuestas",
              name: "apuestasCountry",
              beforeEnter: guardMyRouteInfoApp,
              component: () => import("../views/Products/Sportbook.vue"),
          },
          {
              path: "/:p/apuestas/partido/:PartidoId",
              name: "apuestas-partidoCountry",
              beforeEnter: guardMyRouteInfoApp,
              component: () => import("../views/Products/Sportbook.vue"),
          },
          {
              path: "/:p/apuestas/liga/:LigaId",
              name: "apuestas-ligaCountry",
              beforeEnter: guardMyRouteInfoApp,
              component: () => import("../views/Products/Sportbook.vue"),
          },
          {
              path: "/:p/apuestas/pais/:PaisId",
              name: "apuestas-paisCountry",
              beforeEnter: guardMyRouteInfoApp,
              component: () => import("../views/Products/Sportbook.vue"),
          },
          {
              path: "/:p/apuestas/:DeporteId",
              name: "sportbook-apuestasCountry",
              beforeEnter: guardMyRouteInfoApp,
              component: () => import("../views/Products/Sportbook.vue"),
          },
          {
              path: "/:p/lottery-bets",
              name: "lottery-betsCountry",
              beforeEnter: guardMyRouteInfoApp,
              component: () => import("../views/Products/Sportbook.vue"),
          },
          {
              path: "/:p/deportes-en-vivo",
              name: "sportbook-liveCountry",
              beforeEnter: guardMyRouteInfoApp,
              component: () => import("../views/Products/SportbookLive.vue"),
          },
          {
              path: "/:p/esportes-ao-vivo",
              name: "lsportbook-liveCountry",
              beforeEnter: guardMyRouteInfoApp,
              component: () => import("../views/Products/SportbookLive.vue"),
          },
          {
              path: "/:p/deportes-en-vivo2",
              name: "sportbook-live3Country",
              beforeEnter: guardMyRouteInfoApp,
              component: () => import("../views/Products/Sportbook4.vue"),
          },
          {
              path: "/:p/apuestas-en-vivo",
              name: "sportbook-live2Country",
              beforeEnter: guardMyRouteInfoApp,
              component: () => import("../views/Products/SportbookLive.vue"),
          },
          {
              path: "/:p/apostas-aovivo",
              name: "lsportbook-live2Country",
              beforeEnter: guardMyRouteInfoApp,
              component: () => import("../views/Products/SportbookLive.vue"),
          },
          {
              path: "/:p/new-casino",
              name: "casinoCountry",
              beforeEnter: guardMyRouteInfoApp,
              component: () => import("../views/Products/Casino.vue"),
          },
          {
              path: "/:p/new-casino/:GameId",
              name: "casino2Country",
              beforeEnter: guardMyRouteInfoApp,
              component: () => import("../views/Products/Casino.vue"),
          },
          {
              path: "/:p/new-casino/categoria/:CategoryId",
              name: "casino3Country",
              beforeEnter: guardMyRouteInfoApp,
              component: () => import("../views/Products/Casino.vue"),
          },
          {
              path: "/:p/new-casino/categoria/:CategoryId/:GameId",
              name: "casino4Country",
              beforeEnter: guardMyRouteInfoApp,
              component: () => import("../views/Products/Casino.vue"),
          },
          {
              path: "/:p/cassino/categoria/:CategoryId",
              name: "cassino3Country",
              beforeEnter: guardMyRouteInfoApp,
              component: () => import("../views/Products/Casino.vue"),
          },
          {
              path: "/:p/cassino/categoria/:CategoryId/:GameId",
              name: "cassino4Country",
              beforeEnter: guardMyRouteInfoApp,
              component: () => import("../views/Products/Casino.vue"),
          },
          {
              path: "/:p/new-casino/proveedor/:ProviderId",
              name: "casino5Country",
              beforeEnter: guardMyRouteInfoApp,
              component: () => import("../views/Products/Casino.vue"),
          },
          {
              path: "/:p/novo-cassino",
              name: "lcasinoCountry",
              beforeEnter: guardMyRouteInfoApp,
              component: () => import("../views/Products/Casino.vue"),
          },
          {
              path: "/:p/novo-cassino/:GameId",
              name: "lcasino2Country",
              beforeEnter: guardMyRouteInfoApp,
              component: () => import("../views/Products/Casino.vue"),
          },
          {
              path: "/:p/novo-cassino/categoria/:CategoryId",
              name: "lcasino3Country",
              beforeEnter: guardMyRouteInfoApp,
              component: () => import("../views/Products/Casino.vue"),
          },
          {
              path: "/:p/novo-cassino/categoria/:CategoryId/:GameId",
              name: "lcasino4Country",
              beforeEnter: guardMyRouteInfoApp,
              component: () => import("../views/Products/Casino.vue"),
          },
          {
              path: "/:p/novo-cassino/proveedor/:ProviderId",
              name: "lcasino5Country",
              beforeEnter: guardMyRouteInfoApp,
              component: () => import("../views/Products/Casino.vue"),
          },
          {
              path: "/:p/live-casino-vivo",
              name: "liveCasinoLobbyCountry",
              beforeEnter: guardMyRouteInfoApp,
              component: () => import("../views/Products/LiveCasinoLobby.vue"),
          },
          {
              path: "/:p/live-casino-vivo/:GameId",
              name: "liveCasinoLobby2Country",
              beforeEnter: guardMyRouteInfoApp,
              component: () => import("../views/Products/LiveCasinoLobby.vue"),
          },
          {
              path: "/:p/live-casino-vivo/categoria/:CategoryId",
              name: "liveCasinoLobby3Country",
              beforeEnter: guardMyRouteInfoApp,
              component: () => import("../views/Products/LiveCasinoLobby.vue"),
          },
          {
              path: "/:p/live-casino-vivo/categoria/:CategoryId/:GameId",
              name: "liveCasinoLobby4Country",
              beforeEnter: guardMyRouteInfoApp,
              component: () => import("../views/Products/LiveCasinoLobby.vue"),
          },
          {
              path: "/:p/live-casino-vivo/proveedor/:ProviderId",
              name: "liveCasinoLobby5Country",
              beforeEnter: guardMyRouteInfoApp,
              component: () => import("../views/Products/LiveCasinoLobby.vue"),
          },
          {
              path: "/:p/cassino-aovivo",
              name: "lliveCasinoLobbyCountry",
              beforeEnter: guardMyRouteInfoApp,
              component: () => import("../views/Products/LiveCasinoLobby.vue"),
          },
          {
              path: "/:p/cassino-aovivo/:GameId",
              name: "lliveCasinoLobby2Country",
              beforeEnter: guardMyRouteInfoApp,
              component: () => import("../views/Products/LiveCasinoLobby.vue"),
          },
          {
              path: "/:p/cassino-aovivo/categoria/:CategoryId",
              name: "lliveCasinoLobby3Country",
              beforeEnter: guardMyRouteInfoApp,
              component: () => import("../views/Products/LiveCasinoLobby.vue"),
          },
          {
              path: "/:p/cassino-aovivo/categoria/:CategoryId/:GameId",
              name: "lliveCasinoLobby4Country",
              beforeEnter: guardMyRouteInfoApp,
              component: () => import("../views/Products/LiveCasinoLobby.vue"),
          },
          {
              path: "/:p/cassino-aovivo/proveedor/:ProviderId",
              name: "lliveCasinoLobby5Country",
              beforeEnter: guardMyRouteInfoApp,
              component: () => import("../views/Products/LiveCasinoLobby.vue"),
          },
          {
              path: "/:p/live-casino",
              name: "liveCasinoCountry",
              beforeEnter: guardMyRouteInfoApp,
              component: () => import("../views/Products/LiveCasino.vue"),
          },
          {
              path: "/:p/live-casino/:GameId",
              name: "liveCasino2Country",
              beforeEnter: guardMyRouteInfoApp,
              component: () => import("../views/Products/LiveCasino.vue"),
          },
          {
              path: "/:p/pragmatic-vivo",
              name: "pragmatic-vivoCountry",
              beforeEnter: guardMyRouteInfoApp,
              component: () => import("../views/Products/LiveCasino.vue"),
          },
          {
              path: "/:p/pragmatic-vivo/:GameId",
              name: "pragmatic-vivo2Country",
              beforeEnter: guardMyRouteInfoApp,
              component: () => import("../views/Products/LiveCasino.vue"),
          },
          {
              path: "/:p/evolution",
              name: "evolutionCountry",
              beforeEnter: guardMyRouteInfoApp,
              component: () => import("../views/Products/LiveCasino.vue"),
          },
          {
              path: "/:p/evolution/:GameId",
              name: "evolution2Country",
              beforeEnter: guardMyRouteInfoApp,
              component: () => import("../views/Products/LiveCasino.vue"),
          },
          {
              path: "/:p/betgamestv",
              name: "betgamestvCountry",
              beforeEnter: guardMyRouteInfoApp,
              component: () => import("../views/Products/LiveCasino.vue"),
          },
          {
              path: "/:p/betgamestv/:GameId",
              name: "betgamestv2Country",
              beforeEnter: guardMyRouteInfoApp,
              component: () => import("../views/Products/LiveCasino.vue"),
          },
          {
              path: "/:p/vivogaming",
              name: "vivogamingCountry",
              beforeEnter: guardMyRouteInfoApp,
              component: () => import("../views/Products/LiveCasino.vue"),
          },
          {
              path: "/:p/vivogaming/:GameId",
              name: "vivogaming2Country",
              beforeEnter: guardMyRouteInfoApp,
              component: () => import("../views/Products/LiveCasino.vue"),
          },
          {
              path: "/:p/televentas",
              name: "LandingTelesalesCountry",
              beforeEnter: guardMyRouteInfoApp,
              component: () => import("../views/Help/LandingTelesales.vue"),
          },
          {
              path: "/:p/poker",
              name: "pokerCountry",
              beforeEnter: guardMyRouteInfoApp,
              component: () => import("../views/Products/Poker.vue"),
          },
          {
              path: "/:p/virtuales-lobby",
              name: "virtualBetsLobbyCountry",
              beforeEnter: guardMyRouteInfoApp,
              component: () => import("../views/Products/VirtualBetsLobby.vue"),
          },
          {
              path: "/:p/virtuales-lobby/:GameId",
              name: "virtualBetsLobby2Country",
              beforeEnter: guardMyRouteInfoApp,
              component: () => import("../views/Products/VirtualBetsLobby.vue"),
          },
          {
              path: "/:p/virtuales-lobby/categoria/:CategoryId",
              name: "virtualBetsLobby3Country",
              beforeEnter: guardMyRouteInfoApp,
              component: () => import("../views/Products/VirtualBetsLobby.vue"),
          },
          {
              path: "/:p/virtuales-lobby/categoria/:CategoryId/:GameId",
              name: "virtualBetsLobby4Country",
              beforeEnter: guardMyRouteInfoApp,
              component: () => import("../views/Products/VirtualBetsLobby.vue"),
          },
          {
              path: "/:p/virtuales-lobby/proveedor/:ProviderId",
              name: "virtualBetsLobby5Country",
              beforeEnter: guardMyRouteInfoApp,
              component: () => import("../views/Products/VirtualBetsLobby.vue"),
          },
          {
              path: "/:p/apostas-virtuais",
              name: "lvirtualBetsLobbyCountry",
              beforeEnter: guardMyRouteInfoApp,
              component: () => import("../views/Products/VirtualBetsLobby.vue"),
          },
          {
              path: "/:p/apostas-virtuais/:GameId",
              name: "lvirtualBetsLobby2Country",
              beforeEnter: guardMyRouteInfoApp,
              component: () => import("../views/Products/VirtualBetsLobby.vue"),
          },
          {
              path: "/:p/apostas-virtuais/categoria/:CategoryId",
              name: "lvirtualBetsLobby3Country",
              beforeEnter: guardMyRouteInfoApp,
              component: () => import("../views/Products/VirtualBetsLobby.vue"),
          },
          {
              path: "/:p/apostas-virtuais/categoria/:CategoryId/:GameId",
              name: "lvirtualBetsLobby4Country",
              beforeEnter: guardMyRouteInfoApp,
              component: () => import("../views/Products/VirtualBetsLobby.vue"),
          },
          {
              path: "/:p/apostas-virtuais/proveedor/:ProviderId",
              name: "lvirtualBetsLobby5Country",
              beforeEnter: guardMyRouteInfoApp,
              component: () => import("../views/Products/VirtualBetsLobby.vue"),
          },
          {
              path: "/:p/virtual",
              name: "virtualBetsCountry",
              beforeEnter: guardMyRouteInfoApp,
              component: () => import("../views/Products/VirtualBets.vue"),
          },
          {
              path: "/:p/virtualnew",
              name: "virtualNewCountry",
              beforeEnter: guardMyRouteInfoApp,
              component: () => import("../views/Products/VirtualNew.vue"),
          },
          {
              path: "/:p/virtual/:GameId",
              name: "VirtualBets2Country",
              beforeEnter: guardMyRouteInfoApp,
              component: () => import("../views/Products/VirtualBets.vue"),
          },
          {
              path: "/:p/gestion/deposito",
              name: "depositCountry",
              beforeEnter: guardMyrouteInfoApp,
              component: () => import("../views/Balance/Deposit.vue"),
          },
          {
              path: "/:p/gestion/deposito-cuenta",
              name: "depositAccountCountry",
              beforeEnter: guardMyrouteInfoApp,
              component: () => import("../views/Balance/DepositAccount.vue"),
          },
          {
              path: "/:p/gestion/tarjetas-credito",
              name: "tarjetasCreditoCountry",
              beforeEnter: guardMyrouteInfoApp,
              component: () => import("../views/Balance/CreditCard.vue"),
          },
          {
              path: "/:p/gestion/deposito/error",
              name: "deposit2Country",
              component: () => import("../views/Balance/Deposit.vue"),
          },
          {
              path: "/:p/gestion/deposito/correcto",
              name: "deposit3Country",
              beforeEnter: guardMyrouteInfoApp,
              component: () => import("../views/Balance/Deposit.vue"),
          },
          {
              path: "/:p/gestion/deposito/pendiente",
              name: "deposit4Country",
              beforeEnter: guardMyrouteInfoApp,
              component: () => import("../views/Balance/Deposit.vue"),
          },
          {
              path: "/:p/gestion/cuenta_cobro",
              name: "withdrawCountry",
              beforeEnter: guardMyrouteInfoApp,
              component: () => import("../views/Balance/Withdraw.vue"),
          },
          {
              path: "/:p/gestion/cuenta_cobro_anular",
              name: "cancelWithdrawCountry",
              beforeEnter: guardMyrouteInfoApp,
              component: () => import("../views/Balance/CancelWithdraw.vue"),
          },
          {
              path: "/:p/gestion/cuentasbancarias",
              name: "accountBankCountry",
              beforeEnter: guardMyroute,
              component: () => import("../views/Balance/BankAccounts.vue"),
          },
          {
              path: "/:p/gestion/cuentasdigitales",
              name: "digitalAccountCountry",
              beforeEnter: guardMyroute,
              component: () => import("../views/Balance/DigitalAccounts.vue"),
          },
          {
              path: "/:p/gestion/walletcrypto",
              name: "walletCrypto",
              beforeEnter: guardMyroute,
              component: () => import("../views/Balance/WalletsCrypto.vue"),
          },
          {
              path: "/:p/consulta/consulta_tickets_online",
              name: "consultSportsTicketsCountry",
              beforeEnter: guardMyroute,
              component: () => import("../views/Balance/ConsultSportsTickets.vue"),
          },
          {
              path: "/:p/consulta/consulta_tickets_online2",
              name: "consultSportsTickets2Country",
              beforeEnter: guardMyroute,
              component: () => import("../views/Balance/ConsultSportsTickets.vue"),
          },
          {
              path: "/:p/consulta/consulta_tickets_casino",
              name: "consultCasinoTicketsCountry",
              beforeEnter: guardMyroute,
              component: () => import("../views/Balance/ConsultCasinoTickets.vue"),
          },
          {
              path: "/:p/consulta/consulta_depositos",
              name: "consultDepositsCountry",
              beforeEnter: guardMyroute,
              component: () => import("../views/Balance/ConsultDeposits.vue"),
          },
          {
              path: "/:p/consulta/consulta_retiros",
              name: "consultWithdrawalsCountry",
              beforeEnter: guardMyroute,
              component: () => import("../views/Balance/ConsultWithdrawals.vue"),
          },
          {
              path: "/:p/gestion/gestion_cuenta",
              name: "myAccountCountry",
              beforeEnter: guardMyroute,
              component: () => import("../views/Config/MyAccount.vue"),
          },
          {
              path: "/:p/gestion/verificar_cuenta",
              name: "verifyAccountCountry",
              beforeEnter: guardMyroute,
              component: () => import("../views/Config/VerifyAccount.vue"),
          },
          {
              path: "/:p/gestion/cambiar-clave",
              name: "changePasswordCountry",
              beforeEnter: guardMyroute,
              component: () => import("../views/Config/ChangePassword.vue"),
          },
          {
              path: "/:p/gestion/misbonos",
              name: "myBonusCountry",
              beforeEnter: guardMyroute,
              component: () => import("../views/Config/MyBonus.vue"),
          },
          {
              path: "/:p/gestion/shop-bonuses",
              name: "shopBonusesCountry",
              component: () => import("../views/Config/ShopBonuses.vue"),
          },
          {
              path: "/:p/gestion/autoexclusion",
              name: "autoExclusionCountry",
              component: () => import("../views/Config/Exclusion.vue"),
          },
          {
              path: "/:p/gestion/autoexclusion-producto",
              name: "autoExclusionProductCountry",
              component: () => import("../views/Config/ExclusionProduct.vue")
          },
          {
              path: "/:p/gestion/limitaciones",
              name: "limitationsCountry",
              component: () => import("../views/Config/Limitations.vue")
          },
          {
              path: "/:p/gestion/limitedeposito",
              name: "limitDepositoCountry",
              component: () => import("../views/Config/LimitDeposit.vue"),
          },
          {
              path: "/:p/gestion/historial_saldo",
              name: "lhistorialSaldo",
              component: () => import("../views/Config/BalanceHistory.vue"),
          },
          {
              path: "/:p/referido/agregar_referidos",
              name: "AgregarReferidosCountry",
              component: () => import("../views/Promotions/Referrals.vue")
          },
          {
              path: "/:p/referido/estado_referidos",
              name: "estadoDeReferidosCountry",
              beforeEnter: guardMyroute,
              component: () => import("../views/Promotions/ReferralsState.vue")
          },
          {
              path: "/:p/shop-bonuses",
              name: "shopBonuses2Country",
              component: () => import("../views/Config/ShopBonuses.vue"),
          },
          {
              path: "/:p/consulta/mi_lealtad",
              name: "myLoyaltyCountry",
              beforeEnter: guardMyroute,
              component: () => import("../views/Config/MyLoyalty.vue"),
          },
          {
              path: "/:p/gestion/mi_lealtad",
              name: "myLoyalty2Country",
              beforeEnter: guardMyroute,
              component: () => import("../views/Config/MyLoyalty.vue"),
          },
          {
              path: "/:p/contactenos",
              name: "contactUsCountry",
              component: () => import("../views/Help/ContactUs.vue"),
          },
          {
              path: "/:p/trabaja-con-nosotros",
              name: "workWithUsCountry",
              component: () => import("../views/Help/WorkWithUs.vue"),
          },
          {
              path: "/:p/terminosycondiciones",
              name: "termsAndConditionsCountry",
              component: () => import("../views/Help/TermsAndConditions.vue"),
          },
          {
              path: "/:p/terminosycondiciones/:sectionId",
              name: "termsAndConditions2Country",
              component: () => import("../views/Help/TermsAndConditions.vue"),
          },
          {
              path: "/:p/termosecondicoes",
              name: "ltermsAndConditionsCountry",
              component: () => import("../views/Help/TermsAndConditions.vue"),
          },
          {
              path: "/:p/termosecondicoes/:sectionId",
              name: "ltermsAndConditions2Country",
              component: () => import("../views/Help/TermsAndConditions.vue"),
          },
          {
              path: "/:p/politica-de-privacidad",
              name: "politica-de-privacidadCountry",
              component: () => import("../views/Help/TermsAndConditions.vue"),
          },
          {
              path: "/:p/politica-de-privacidade",
              name: "lpolitica-de-privacidadCountry",
              component: () => import("../views/Help/TermsAndConditions.vue"),
          },
          {
              path: "/:p/politica-de-privacidad/:sectionId",
              name: "politica-de-privacidad2Country",
              component: () => import("../views/Help/TermsAndConditions.vue"),
          },
          {
              path: "/:p/politica-de-privacidade/:sectionId",
              name: "lpolitica-de-privacidad2Country",
              component: () => import("../views/Help/TermsAndConditions.vue"),
          },
          {
              path: "/:p/preguntasfrecuentes",
              name: "preguntasfrecuentesCountry",
              component: () => import("../views/Help/TermsAndConditions.vue"),
          },
          {
              path: "/:p/preguntasfrecuentes/:sectionId",
              name: "preguntasfrecuentes2Country",
              component: () => import("../views/Help/TermsAndConditions.vue"),
          },
          {
              path: "/:p/juego-responsable",
              name: "juego-responsableCountry",
              component: () => import("../views/Help/TermsAndConditions.vue"),
          },
          {
              path: "/:p/juego-responsable/:sectionId",
              name: "juego-responsable2Country",
              component: () => import("../views/Help/TermsAndConditions.vue"),
          },
          {
              path: "/:p/responsável-pelo-jogo",
              name: "ljuego-responsableCountry",
              component: () => import("../views/Help/TermsAndConditions.vue"),
          },
          {
              path: "/:p/responsável-pelo-jogo/:sectionId",
              name: "ljuego-responsable2Country",
              component: () => import("../views/Help/TermsAndConditions.vue"),
          },
          {
              path: "/:p/geolocalizacion",
              name: "geolocationCountry",
              component: () => import("../views/Help/Geolocation.vue"),
          },
          {
              path: "/:p/reclamaciones",
              name: "claimsCountry",
              component: () => import("../views/Help/Claims.vue"),
          },
          {
              path: "/:p/mis-reclamaciones",
              name: "myClaimsCountry",
              component: () => import("../views/Help/MyClaims.vue"),
          },
          {
              path: "/:p/resultados",
              name: "resultsCountry",
              component: () => import("../views/Help/Results.vue"),
          },
          {
              path: "/:p/mundialCountry",
              name: "mundial",
              component: () => import("../views/Help/Mundial.vue"),
          },
          {
              path: "/:p/thankyou",
              name: "thankyouCountry",
              component: () => import("../views/Help/ThankYou.vue"),
          },
          {
              path: "/:p/graciasdeposito",
              name: "graciasdepositoCountry",
              component: () => import("../views/Help/GraciasDeposito.vue"),
          },
          {
              path: "/:p/promociones-bonos",
              name: "promotionsCountry",
              component: () => import("../views/Help/Promotions.vue"),
          },
          {
              path: "/:p/promociones-bonos/:sectionId",
              name: "promotions2Country",
              component: () => import("../views/Help/Promotions.vue"),
          },
          {
              path: "/:p/promociones-bonos/id/:bonoId",
              name: "promotions3Country",
              component: () => import("../views/Help/Promotions.vue"),
          },
          {
              path: "/:p/promos-bonus",
              name: "ppromotionsCountry",
              component: () => import("../views/Help/Promotions.vue"),
          },
          {
              path: "/:p/promos-bonus/:sectionId",
              name: "ppromotions2Country",
              component: () => import("../views/Help/Promotions.vue"),
          },
          {
              path: "/:p/promos-bonus/id/:bonoId",
              name: "ppromotions3Country",
              component: () => import("../views/Help/Promotions.vue"),
          },
          {
              path: "/:p/banner-right",
              name: "BannersSliderCountry",
              component: () => import("../components/BannersSlider.vue"),
          },
          {
              path: "/:p/banner-left",
              name: "BannersSlider2Country",
              component: () => import("../components/BannersSlider.vue"),
          },
          {
              path: "/:p/banner-rightnl",
              name: "BannersSlider3Country",
              component: () => import("../components/BannersSlider.vue"),
          },
          {
              path: "/:p/banner-leftnl",
              name: "BannersSlider4Country",
              component: () => import("../components/BannersSlider.vue"),
          },
          {
              path: "/:p/banner-topcenter",
              name: "BannersSlider5Country",
              component: () => import("../components/BannersSlider.vue"),
          },
          {
              path: "/:p/banner-topcenternl",
              name: "BannersSlider6Country",
              component: () => import("../components/BannersSlider.vue"),
          },
          {
              path: "/:p/recuperar-clave",
              name: "recoverPasswordCountry",
              component: () => import("../views/Help/RecoverPassword.vue"),
          },
          {
              path: "/:p/recuperar-clave-validar/:tokenP",
              name: "recoverPasswordSendCountry",
              component: () => import("../views/Help/RecoverPasswordSend.vue"),
          },
          {
              path: "/:p/recuperar-clave-activar/:tokenP",
              name: "recoverPasswordSend2CountryCountry",
              component: () => import("../views/Help/RecoverPasswordSend.vue"),
          },
          {
              path: "/:p/validar-actualizacion/:tokenP",
              name: "updateDataCountry",
              component: () => import("../views/Help/UpdateData.vue"),
          },
          {
              path: "/:p/verificar-email/:email/:tokenP",
              name: "registerEmailSendCountry",
              component: () => import("../views/Help/RegisterEmailSend.vue"),
          },
          {
              path: "/:p/mensajes",
              name: "messagesCountry",
              beforeEnter: guardMyroute,
              component: () => import("../views/Help/Messages.vue"),
          },
          {
              path: "/:p/torneos",
              name: "tournamentsCountry",
              component: () => import("../views/Promotions/Tournaments.vue"),
          },
          {
              path: "/:p/torneiras",
              name: "torneirasCountry",
              component: () => import("../views/Promotions/Tournaments.vue"),
          },
          {
              path: "/:p/bingos",
              name: "bingosCountry",
              component: () => import("../views/Products/LobbyBingos.vue"),
          },
          {
              path: "/:p/bingos/:GameId",
              name: "bingos2Country",
              component: () => import("../views/Products/LobbyBingos.vue"),
          },
          {
              path: "/:p/bingos/categoria/:CategoryId",
              name: "bingos3Country",
              component: () => import("../views/Products/LobbyBingos.vue"),
          },
          {
              path: "/:p/bingos/categoria/:CategoryId/:GameId",
              name: "bingos4Country",
              component: () => import("../views/Products/LobbyBingos.vue"),
          },
          {
              path: "/:p/bingos/proveedor/:ProviderId",
              name: "bingos5Country",
              component: () => import("../views/Products/LobbyBingos.vue"),
          },
          {
              path: "/:p/sorteos",
              name: "rafflesCountry",
              component: () => import("../views/Promotions/Raffles.vue"),
          },
          {
              path: "/:p/programa_lealtad",
              name: "myLoyaltyGuideCountry",
              component: () => import("../views/Help/MyLoyaltyGuide.vue"),
          },
          {
              path: "/:p/programa-lealtad",
              name: "myLoyaltyGuideCountry",
              component: () => import("../views/Help/MyLoyaltyGuide.vue"),
          },
          {
              path: "/:p/clube-da-loto",
              name: "lmyLoyaltyGuideCountry",
              component: () => import("../views/Help/MyLoyaltyGuide.vue"),
          },
          {
              path: "/:p/landing/app",
              name: "landingAppCountry",
              beforeEnter: guardMyRouteInfoApp,
              component: () => import("../views/Help/LandingApp2.vue"),
          },
          {
              path: "/:p/landing/appIos",
              name: "landingAppIosCountry",
              beforeEnter: guardMyRouteInfoApp,
              component: () => import("../views/Help/LandingApp3.vue"),
          },
          {
              path: "/:p/landing/app-mobile",
              name: "llandingAppCountry",
              beforeEnter: guardMyRouteInfoApp,
              component: () => import("../views/Help/LandingApp2.vue"),
          },
          {
              path: "/:p/landing/app-pwa",
              name: "llandingAppPwa",
              beforeEnter: guardMyRouteInfoApp,
              component: () => import("../views/Help/LandingAppAndoridAndPwa.vue"),
          },
          {
              path: "/:p/landing/cambiar-clave",
              name: "landingChangePasswordCountry",
              component: () => import("../views/Help/LandingChangePassword.vue")
          },
          {
              path: "/:p/landing/verificarCuenta",
              name: "landingVerifyAccountCountry",
              component: () => import("../views/Help/LandingVerifyAccount.vue")
          },
          {
              path: "/:p/landing/sorteos/:LotteryId",
              name: "landingLotteryCountry",
              component: () => import("../views/Help/LandingLottery.vue"),
          },
          {
              path: "/:p/landing-register/",
              name: "LandingRegisterCountry",
              component: () => import("../views/Help/LandingRegister.vue"),
          },
          {
              path: "/:p/liga/:ligaId",
              name: "DataFactoryCountry",
              component: () => import("../views/Help/DataFactory.vue"),
          },
          {
              path: "/:p/my-bonuses-progress",
              name: "myBonusesProgressCountry",
              component: () => import("../views/Balance/MyBonusesProgress.vue"),
          },
          {
              path: "/:p/wallet",
              name: "walletCountry",
              component: () => import("../views/Config/Wallets.vue"),
          },
          {
              path: "/:p/landing/login-playtech",
              name: "landingLoginPokerPlaytech",
              component: () => import("../views/LandingLoginPlaytech.vue")
          },
          {
              path: "/:p/pos/login",
              name: "loginPosCountry",
              component: () => import("../views/POS/login/LandingLogin.vue")
          },
          {
              path: "/:p/pos/menu",
              name: "menuPosCountry",
              beforeEnter: guardMyRouteAppPos,
              component: () => import("../views/POS/menu/MenuPos.vue")
          },
          {
              path:"/:p/pos/bets-sport",
              name: "BetSportCountry",
              beforeEnter: guardMyRouteAppPos,
              component: () => import("../views/POS/views/BetsSport.vue")
          },
          {
              path: "/:p/pos/change-password",
              name: "changePasswordPCountry",
              beforeEnter: guardMyRouteAppPos,
              component: () => import("../views/POS/views/ChangePasswordPos.vue")
          },
          {
              path: "/:p/pos/flow-cash",
              name: "flowCashCountry",
              beforeEnter: guardMyRouteAppPos,
              component: () => import("../views/POS/views/FlowCash.vue")
          },
          {
              path: "/:p/pos/flow-cash-summary",
              name: "flowCashSummaryCountry",
              beforeEnter: guardMyRouteAppPos,
              component: () => import("../views/POS/views/FlowCashSummary.vue")
          },
          {
              path: "/:p/pos/prize-payment",
              name: "prizePaymentCountry",
              beforeEnter: guardMyRouteAppPos,
              component: () => import("../views/POS/views/PrizePayment.vue")
          },
          {
              path: "/:p/pos/note-withdrawal-payment",
              name: "noteWithdrawalPaymentCountry",
              beforeEnter: guardMyRouteAppPos,
              component: () => import("../views/POS/views/NoteWithdrawalPayment.vue")
          },
          {
              path: "/:p/pos/credit-recharge",
              name: "creditRechargeCountry",
              beforeEnter: guardMyRouteAppPos,
              component: () => import("../views/POS/views/CreditRecharge.vue")
          },
          {
              path: "/:p/pos/resultados",
              name: "resultsPosCountry",
              beforeEnter: guardMyRouteAppPos,
              component: () => import("../views/POS/views/Results.vue"),
          },
        {
          path: "/",
          name: "home",
          component: HomeView,
        },
        {
          path: "/home",
          name: "home2",
          component: HomeView,
        },
        {
          path: "/:pathMatch(.*)*",
          name: "pathNotFound",
          component: () => import("../views/PathNotFound.vue"),
        },
        {
          path: "/registro",
          name: "register",
          beforeEnter: guardMyrouteLogin,
          component: () => import("../views/Register.vue"),
        },
        {
          path: "/registro/:Codigo",
          name: "register2",
          beforeEnter: guardMyrouteLogin,
          component: () => import("../views/Register.vue"),
        },
        {
          path: "/registro/aff/:Codigo2",
          name: "register3",
          beforeEnter: guardMyrouteLogin,
          component: () => import("../views/Register.vue"),
        },
        {
          path: "/registro/a/:Codigo3",
          name: "register4",
          beforeEnter: guardMyrouteLogin,
          component: () => import("../views/Register.vue"),
        },
        {
          path: "/landing/registro",
          name: "register5",
          beforeEnter: guardMyrouteLogin,
          component: () => import("../views/Register.vue"),
        },
        {
          path: "/criar-conta",
          name: "lregister",
          beforeEnter: guardMyrouteLogin,
          component: () => import("../views/Register.vue"),
        },
        {
          path: "/criar-conta/:Codigo",
          name: "lregister2",
          beforeEnter: guardMyrouteLogin,
          component: () => import("../views/Register.vue"),
        },
        {
          path: "/criar-conta/aff/:Codigo2",
          name: "lregister3",
          beforeEnter: guardMyrouteLogin,
          component: () => import("../views/Register.vue"),
        },
        {
          path: "/criar-conta/a/:Codigo3",
          name: "lregister4",
          beforeEnter: guardMyrouteLogin,
          component: () => import("../views/Register.vue"),
        },
        {
          path: "/landing/casino",
          name: "register6",
          beforeEnter: guardMyrouteLogin,
          component: () => import("../views/Register.vue"),
        },
        {
          path: "/landing/registro-casino",
          name: "register7",
          beforeEnter: guardMyrouteLogin,
          component: () => import("../views/Register.vue"),
        },
        {
          path: "/landing/deportivas",
          name: "register8",
          beforeEnter: guardMyrouteLogin,
          component: () => import("../views/Register.vue"),
        },
        {
          path: "/landing/depositos",
          name: "landingdepositos",
          component: () => import("../views/Balance/LandingDeposit.vue"),
        },
        {
          path: "/landing/depositos-ecuador",
          name: "landingdepositosEcuador",
          component: () => import("../views/Balance/LandingDeposit.vue"),
        },
        {
          path: "/landing/registro-deportivas",
          name: "register9",
          beforeEnter: guardMyrouteLogin,
          component: () => import("../views/Register.vue"),
        },
        {
          path: "/landing/registro-corto",
          name: "register10",
          beforeEnter: guardMyrouteLogin,
          component: () => import("../views/Register.vue"),
        },
        {
          path: "/landing/registro-corto/:Codigo",
          name: "register11",
          beforeEnter: guardMyrouteLogin,
          component: () => import("../views/Register.vue"),
        },
        {
          path: "/landing/registro-corto/aff/:Codigo2",
          name: "register12",
          beforeEnter: guardMyrouteLogin,
          component: () => import("../views/Register.vue"),
        },
        {
          path: "/landing/registro-corto/a/:Codigo3",
          name: "register13",
          beforeEnter: guardMyrouteLogin,
          component: () => import("../views/Register.vue"),
        },
        {
          path: "/landing/registro-corto-loto",
          name: "register14",
          beforeEnter: guardMyrouteLogin,
          component: () => import("../views/Register.vue"),
        },
        {
          path: "/casino/bono",
          name: "register15",
          beforeEnter: guardMyrouteLogin,
          component: () => import("../views/Register.vue"),
        },
        {
          path: "/apuestas/bono",
          name: "register16",
          beforeEnter: guardMyrouteLogin,
          component: () => import("../views/Register.vue"),
        },
        {
          path: "/deportes",
          name: "sportbook",
            beforeEnter: guardMyRouteInfoApp,
          component: () => import("../views/Products/Sportbook.vue"),
        },
        {
          path: "/deportes/partido/:PartidoId",
          name: "sportbook-partido",
            beforeEnter: guardMyRouteInfoApp,
          component: () => import("../views/Products/Sportbook.vue"),
        },
        {
          path: "/deportes/liga/:LigaId",
          name: "sportbook-liga",
            beforeEnter: guardMyRouteInfoApp,
          component: () => import("../views/Products/Sportbook.vue"),
        },
        {
          path: "/deportes/pais/:PaisId",
          name: "sportbook-pais",
            beforeEnter: guardMyRouteInfoApp,
          component: () => import("../views/Products/Sportbook.vue"),
        },
        {
          path: "/deportes/:DeporteId",
          name: "sportbook-deporte",
            beforeEnter: guardMyRouteInfoApp,
          component: () => import("../views/Products/Sportbook.vue"),
        },

        {
          path: "/apuestas-deportivas",
          name: "sportsBetting",
            beforeEnter: guardMyRouteInfoApp,
          component: () => import("../views/Products/Sportbook.vue"),
        },
        {
          path: "/apuestas-deportivas/partido/:PartidoId",
          name: "sportsBetting-partido",
            beforeEnter: guardMyRouteInfoApp,
          component: () => import("../views/Products/Sportbook.vue"),
        },
        {
          path: "/apuestas-deportivas/liga/:LigaId",
          name: "sportsBetting-liga",
            beforeEnter: guardMyRouteInfoApp,
          component: () => import("../views/Products/Sportbook.vue"),
        },
        {
          path: "/apuestas-deportivas/pais/:PaisId",
          name: "sportsBetting-pais",
            beforeEnter: guardMyRouteInfoApp,
          component: () => import("../views/Products/Sportbook.vue"),
        },
        {
          path: "/apuestas-deportivas/:DeporteId",
          name: "sportsBetting-deporte",
            beforeEnter: guardMyRouteInfoApp,
          component: () => import("../views/Products/Sportbook.vue"),
        },

        {
          path: "/apostas-esportivas",
          name: "lsportbook",
            beforeEnter: guardMyRouteInfoApp,
          component: () => import("../views/Products/Sportbook.vue"),
        },
        {
          path: "/apostas-esportivas/partido/:PartidoId",
          name: "lsportbook-partido",
            beforeEnter: guardMyRouteInfoApp,
          component: () => import("../views/Products/Sportbook.vue"),
        },
        {
          path: "/apostas-esportivas/liga/:LigaId",
          name: "lsportbook-liga",
            beforeEnter: guardMyRouteInfoApp,
          component: () => import("../views/Products/Sportbook.vue"),
        },
        {
          path: "/apostas-esportivas/pais/:PaisId",
          name: "lsportbook-pais",
            beforeEnter: guardMyRouteInfoApp,
          component: () => import("../views/Products/Sportbook.vue"),
        },
        {
          path: "/apostas-esportivas/:DeporteId",
          name: "lsportbook-deporte",
            beforeEnter: guardMyRouteInfoApp,
          component: () => import("../views/Products/Sportbook.vue"),
        },
        {
          path: "/esportes",
          name: "esportes",
            beforeEnter: guardMyRouteInfoApp,
          component: () => import("../views/Products/Sportbook.vue"),
        },
        {
          path: "/esportes/partido/:PartidoId",
          name: "esportes-partido",
            beforeEnter: guardMyRouteInfoApp,
          component: () => import("../views/Products/Sportbook.vue"),
        },
        {
          path: "/esportes/liga/:LigaId",
          name: "esportes-liga",
            beforeEnter: guardMyRouteInfoApp,
          component: () => import("../views/Products/Sportbook.vue"),
        },
        {
          path: "/esportes/pais/:PaisId",
          name: "esportes-pais",
            beforeEnter: guardMyRouteInfoApp,
          component: () => import("../views/Products/Sportbook.vue"),
        },
        {
          path: "/esportes/:DeporteId",
          name: "esportes-deporte",
            beforeEnter: guardMyRouteInfoApp,
          component: () => import("../views/Products/Sportbook.vue"),
        },
        {
          path: "/deportes2",
          name: "sportbook4",
            beforeEnter: guardMyRouteInfoApp,
          component: () => import("../views/Products/Sportbook4.vue"),
        },
        {
          path: "/deportes2/partido/:PartidoId",
          name: "sportbook4-partido",
            beforeEnter: guardMyRouteInfoApp,
          component: () => import("../views/Products/Sportbook4.vue"),
        },
        {
          path: "/deportes2/liga/:LigaId",
          name: "sportbook4-liga",
            beforeEnter: guardMyRouteInfoApp,
          component: () => import("../views/Products/Sportbook4.vue"),
        },
        {
          path: "/deportes2/pais/:PaisId",
          name: "sportbook4-pais",
            beforeEnter: guardMyRouteInfoApp,
          component: () => import("../views/Products/Sportbook4.vue"),
        },
        {
          path: "/deportes2/:DeporteId",
          name: "sportbook4-deporte",
            beforeEnter: guardMyRouteInfoApp,
          component: () => import("../views/Products/Sportbook4.vue"),
        },
        {
          path: "/apuestas",
          name: "apuestas",
            beforeEnter: guardMyRouteInfoApp,
          component: () => import("../views/Products/Sportbook.vue"),
        },
        {
          path: "/apuestas/partido/:PartidoId",
          name: "apuestas-partido",
            beforeEnter: guardMyRouteInfoApp,
          component: () => import("../views/Products/Sportbook.vue"),
        },
        {
          path: "/apuestas/liga/:LigaId",
          name: "apuestas-liga",
            beforeEnter: guardMyRouteInfoApp,
          component: () => import("../views/Products/Sportbook.vue"),
        },
        {
          path: "/apuestas/pais/:PaisId",
          name: "apuestas-pais",
            beforeEnter: guardMyRouteInfoApp,
          component: () => import("../views/Products/Sportbook.vue"),
        },
        {
          path: "/apuestas/:DeporteId",
          name: "sportbook-apuestas",
            beforeEnter: guardMyRouteInfoApp,
          component: () => import("../views/Products/Sportbook.vue"),
        },
        {
          path: "/lottery-bets",
          name: "lottery-bets",
            beforeEnter: guardMyRouteInfoApp,
          component: () => import("../views/Products/Sportbook.vue"),
        },
        {
          path: "/deportes-en-vivo",
          name: "sportbook-live",
            beforeEnter: guardMyRouteInfoApp,
          component: () => import("../views/Products/SportbookLive.vue"),
        },
        {
          path: "/esportes-ao-vivo",
          name: "lsportbook-live",
            beforeEnter: guardMyRouteInfoApp,
          component: () => import("../views/Products/SportbookLive.vue"),
        },
        {
          path: "/deportes-en-vivo2",
          name: "sportbook-live3",
            beforeEnter: guardMyRouteInfoApp,
          component: () => import("../views/Products/Sportbook4.vue"),
        },
        {
          path: "/apuestas-en-vivo",
          name: "sportbook-live2",
            beforeEnter: guardMyRouteInfoApp,
          component: () => import("../views/Products/SportbookLive.vue"),
        },
        {
          path: "/apostas-aovivo",
          name: "lsportbook-live2",
            beforeEnter: guardMyRouteInfoApp,
          component: () => import("../views/Products/SportbookLive.vue"),
        },
        {
          path: "/new-casino",
          name: "casino",
            beforeEnter: guardMyRouteInfoApp,
          component: () => import("../views/Products/Casino.vue"),
        },
        {
          path: "/new-casino/:GameId",
          name: "casino2",
            beforeEnter: guardMyRouteInfoApp,
          component: () => import("../views/Products/Casino.vue"),
        },
        {
          path: "/new-casino/categoria/:CategoryId",
          name: "casino3",
            beforeEnter: guardMyRouteInfoApp,
          component: () => import("../views/Products/Casino.vue"),
        },
        {
          path: "/new-casino/categoria/:CategoryId/:GameId",
          name: "casino4",
            beforeEnter: guardMyRouteInfoApp,
          component: () => import("../views/Products/Casino.vue"),
        },
        {
          path: "/cassino/categoria/:CategoryId",
          name: "cassino3",
            beforeEnter: guardMyRouteInfoApp,
          component: () => import("../views/Products/Casino.vue"),
        },
        {
          path: "/cassino/categoria/:CategoryId/:GameId",
          name: "cassino4",
            beforeEnter: guardMyRouteInfoApp,
          component: () => import("../views/Products/Casino.vue"),
        },
        {
          path: "/new-casino/proveedor/:ProviderId",
          name: "casino5",
            beforeEnter: guardMyRouteInfoApp,
          component: () => import("../views/Products/Casino.vue"),
        },
        {
          path: "/novo-cassino",
          name: "lcasino",
            beforeEnter: guardMyRouteInfoApp,
          component: () => import("../views/Products/Casino.vue"),
        },
        {
          path: "/novo-cassino/:GameId",
          name: "lcasino2",
            beforeEnter: guardMyRouteInfoApp,
          component: () => import("../views/Products/Casino.vue"),
        },
        {
          path: "/novo-cassino/categoria/:CategoryId",
          name: "lcasino3",
            beforeEnter: guardMyRouteInfoApp,
          component: () => import("../views/Products/Casino.vue"),
        },
        {
          path: "/novo-cassino/categoria/:CategoryId/:GameId",
          name: "lcasino4",
            beforeEnter: guardMyRouteInfoApp,
          component: () => import("../views/Products/Casino.vue"),
        },
        {
          path: "/novo-cassino/proveedor/:ProviderId",
          name: "lcasino5",
            beforeEnter: guardMyRouteInfoApp,
          component: () => import("../views/Products/Casino.vue"),
        },
        {
          path: "/live-casino-vivo",
          name: "liveCasinoLobby",
            beforeEnter: guardMyRouteInfoApp,
          component: () => import("../views/Products/LiveCasinoLobby.vue"),
        },
        {
          path: "/live-casino-vivo/:GameId",
          name: "liveCasinoLobby2",
            beforeEnter: guardMyRouteInfoApp,
          component: () => import("../views/Products/LiveCasinoLobby.vue"),
        },
        {
          path: "/live-casino-vivo/categoria/:CategoryId",
          name: "liveCasinoLobby3",
            beforeEnter: guardMyRouteInfoApp,
          component: () => import("../views/Products/LiveCasinoLobby.vue"),
        },
        {
          path: "/live-casino-vivo/categoria/:CategoryId/:GameId",
          name: "liveCasinoLobby4",
            beforeEnter: guardMyRouteInfoApp,
          component: () => import("../views/Products/LiveCasinoLobby.vue"),
        },
        {
          path: "/live-casino-vivo/proveedor/:ProviderId",
          name: "liveCasinoLobby5",
            beforeEnter: guardMyRouteInfoApp,
          component: () => import("../views/Products/LiveCasinoLobby.vue"),
        },
        {
          path: "/cassino-aovivo",
          name: "lliveCasinoLobby",
            beforeEnter: guardMyRouteInfoApp,
          component: () => import("../views/Products/LiveCasinoLobby.vue"),
        },
        {
          path: "/cassino-aovivo/:GameId",
          name: "lliveCasinoLobby2",
            beforeEnter: guardMyRouteInfoApp,
          component: () => import("../views/Products/LiveCasinoLobby.vue"),
        },
        {
          path: "/cassino-aovivo/categoria/:CategoryId",
          name: "lliveCasinoLobby3",
            beforeEnter: guardMyRouteInfoApp,
          component: () => import("../views/Products/LiveCasinoLobby.vue"),
        },
        {
          path: "/cassino-aovivo/categoria/:CategoryId/:GameId",
          name: "lliveCasinoLobby4",
            beforeEnter: guardMyRouteInfoApp,
          component: () => import("../views/Products/LiveCasinoLobby.vue"),
        },
        {
          path: "/cassino-aovivo/proveedor/:ProviderId",
          name: "lliveCasinoLobby5",
            beforeEnter: guardMyRouteInfoApp,
          component: () => import("../views/Products/LiveCasinoLobby.vue"),
        },
        {
          path: "/live-casino",
          name: "liveCasino",
            beforeEnter: guardMyRouteInfoApp,
          component: () => import("../views/Products/LiveCasino.vue"),
        },
        {
          path: "/live-casino/:GameId",
          name: "liveCasino2",
          component: () => import("../views/Products/LiveCasino.vue"),
        },
        {
          path: "/pragmatic-vivo",
          name: "pragmatic-vivo",
            beforeEnter: guardMyRouteInfoApp,
          component: () => import("../views/Products/LiveCasino.vue"),
        },
        {
          path: "/pragmatic-vivo/:GameId",
          name: "pragmatic-vivo2",
            beforeEnter: guardMyRouteInfoApp,
          component: () => import("../views/Products/LiveCasino.vue"),
        },
        {
          path: "/evolution",
          name: "evolution",
            beforeEnter: guardMyRouteInfoApp,
          component: () => import("../views/Products/LiveCasino.vue"),
        },
        {
          path: "/evolution/:GameId",
          name: "evolution2",
            beforeEnter: guardMyRouteInfoApp,
          component: () => import("../views/Products/LiveCasino.vue"),
        },
        {
          path: "/betgamestv",
          name: "betgamestv",
            beforeEnter: guardMyRouteInfoApp,
          component: () => import("../views/Products/LiveCasino.vue"),
        },
        {
          path: "/betgamestv/:GameId",
          name: "betgamestv2",
            beforeEnter: guardMyRouteInfoApp,
          component: () => import("../views/Products/LiveCasino.vue"),
        },
        {
          path: "/vivogaming",
          name: "vivogaming",
            beforeEnter: guardMyRouteInfoApp,
          component: () => import("../views/Products/LiveCasino.vue"),
        },
        {
          path: "/vivogaming/:GameId",
          name: "vivogaming2",
            beforeEnter: guardMyRouteInfoApp,
          component: () => import("../views/Products/LiveCasino.vue"),
        },
        {
          path: "/poker",
          name: "poker",
            beforeEnter: guardMyRouteInfoApp,
          component: () => import("../views/Products/Poker.vue"),
        },
        {
          path: "/virtuales-lobby",
          name: "virtualBetsLobby",
            beforeEnter: guardMyRouteInfoApp,
          component: () => import("../views/Products/VirtualBetsLobby.vue"),
        },
        {
          path: "/virtuales-lobby/:GameId",
          name: "virtualBetsLobby2",
            beforeEnter: guardMyRouteInfoApp,
          component: () => import("../views/Products/VirtualBetsLobby.vue"),
        },
        {
          path: "/virtuales-lobby/categoria/:CategoryId",
          name: "virtualBetsLobby3",
            beforeEnter: guardMyRouteInfoApp,
          component: () => import("../views/Products/VirtualBetsLobby.vue"),
        },
        {
          path: "/virtuales-lobby/categoria/:CategoryId/:GameId",
          name: "virtualBetsLobby4",
            beforeEnter: guardMyRouteInfoApp,
          component: () => import("../views/Products/VirtualBetsLobby.vue"),
        },
        {
          path: "/virtuales-lobby/proveedor/:ProviderId",
          name: "virtualBetsLobby5",
            beforeEnter: guardMyRouteInfoApp,
          component: () => import("../views/Products/VirtualBetsLobby.vue"),
        },
        {
          path: "/apostas-virtuais",
          name: "lvirtualBetsLobby",
            beforeEnter: guardMyRouteInfoApp,
          component: () => import("../views/Products/VirtualBetsLobby.vue"),
        },
        {
          path: "/apostas-virtuais/:GameId",
          name: "lvirtualBetsLobby2",
            beforeEnter: guardMyRouteInfoApp,
          component: () => import("../views/Products/VirtualBetsLobby.vue"),
        },
        {
          path: "/apostas-virtuais/categoria/:CategoryId",
          name: "lvirtualBetsLobby3",
            beforeEnter: guardMyRouteInfoApp,
          component: () => import("../views/Products/VirtualBetsLobby.vue"),
        },
        {
          path: "/apostas-virtuais/categoria/:CategoryId/:GameId",
          name: "lvirtualBetsLobby4",
            beforeEnter: guardMyRouteInfoApp,
          component: () => import("../views/Products/VirtualBetsLobby.vue"),
        },
        {
          path: "/apostas-virtuais/proveedor/:ProviderId",
          name: "lvirtualBetsLobby5",
            beforeEnter: guardMyRouteInfoApp,
          component: () => import("../views/Products/VirtualBetsLobby.vue"),
        },
        {
          path: "/virtual",
          name: "virtualBets",
            beforeEnter: guardMyRouteInfoApp,
          component: () => import("../views/Products/VirtualBets.vue"),
        },
        {
          path: "/virtualnew",
          name: "virtualNew",
            beforeEnter: guardMyRouteInfoApp,
          component: () => import("../views/Products/VirtualNew.vue"),
        },
        {
          path: "/virtual/:GameId",
          name: "VirtualBets2",
            beforeEnter: guardMyRouteInfoApp,
          component: () => import("../views/Products/VirtualBets.vue"),
        },
        {
          path: "/gestion/deposito",
          name: "deposit",
            beforeEnter: guardMyrouteInfoApp,
          component: () => import("../views/Balance/Deposit.vue"),
        },
        {
          path: "/gestion/deposito-cuenta",
          name: "depositAccount",
            beforeEnter: guardMyrouteInfoApp,
          component: () => import("../views/Balance/DepositAccount.vue"),
        },
        {
          path: "/gestion/tarjetas-credito",
          name: "tarjetasCredito",
            beforeEnter: guardMyrouteInfoApp,
          component: () => import("../views/Balance/CreditCard.vue"),
        },
        {
          path: "/gestion/deposito/error",
          name: "deposit2",
            beforeEnter: guardMyrouteInfoApp,
          component: () => import("../views/Balance/Deposit.vue"),
        },
        {
          path: "/gestion/deposito/correcto",
          name: "deposit3",
            beforeEnter: guardMyrouteInfoApp,
          component: () => import("../views/Balance/Deposit.vue"),
        },
        {
          path: "/gestion/deposito/pendiente",
          name: "deposit4",
            beforeEnter: guardMyrouteInfoApp,
          component: () => import("../views/Balance/Deposit.vue"),
        },
        {
          path: "/gestion/cuenta_cobro",
          name: "withdraw",
            beforeEnter: guardMyrouteInfoApp,
          component: () => import("../views/Balance/Withdraw.vue"),
        },
        {
          path: "/gestion/cuenta_cobro_anular",
          name: "cancelWithdraw",
            beforeEnter: guardMyrouteInfoApp,
          component: () => import("../views/Balance/CancelWithdraw.vue"),
        },
        {
          path: "/gestion/cuentasbancarias",
          name: "accountBank",
          beforeEnter: guardMyroute,
          component: () => import("../views/Balance/BankAccounts.vue"),
        },
        {
            path: "/gestion/cuentasdigitales",
            name: "digitalAccountCountry",
            beforeEnter: guardMyroute,
            component: () => import("../views/Balance/DigitalAccounts.vue"),
        },
        {
          path: "/gestion/walletcrypto",
          name: "walletCrypto",
          beforeEnter: guardMyroute,
          component: () => import("../views/Balance/WalletsCrypto.vue"),
        },
        {
          path: "/consulta/consulta_tickets_online",
          name: "consultSportsTickets",
          beforeEnter: guardMyroute,
          component: () => import("../views/Balance/ConsultSportsTickets.vue"),
        },
        {
          path: "/consulta/consulta_tickets_online2",
          name: "consultSportsTickets2",
          beforeEnter: guardMyroute,
          component: () => import("../views/Balance/ConsultSportsTickets.vue"),
        },
        {
          path: "/consulta/consulta_tickets_casino",
          name: "consultCasinoTickets",
          beforeEnter: guardMyroute,
          component: () => import("../views/Balance/ConsultCasinoTickets.vue"),
        },
        {
          path: "/consulta/consulta_depositos",
          name: "consultDeposits",
          beforeEnter: guardMyroute,
          component: () => import("../views/Balance/ConsultDeposits.vue"),
        },
        {
          path: "/consulta/consulta_retiros",
          name: "consultWithdrawals",
          beforeEnter: guardMyroute,
          component: () => import("../views/Balance/ConsultWithdrawals.vue"),
        },
        {
          path: "/gestion/gestion_cuenta",
          name: "myAccount",
          beforeEnter: guardMyroute,
          component: () => import("../views/Config/MyAccount.vue"),
        },
        {
          path: "/gestion/verificar_cuenta",
          name: "verifyAccount",
          beforeEnter: guardMyroute,
          component: () => import("../views/Config/VerifyAccount.vue"),
        },
        {
          path: "/gestion/cambiar-clave",
          name: "changePassword",
          beforeEnter: guardMyroute,
          component: () => import("../views/Config/ChangePassword.vue"),
        },
        {
          path: "/gestion/misbonos",
          name: "myBonus",
          beforeEnter: guardMyroute,
          component: () => import("../views/Config/MyBonus.vue"),
        },
        {
          path: "/gestion/shop-bonuses",
          name: "shopBonuses",
          component: () => import("../views/Config/ShopBonuses.vue"),
        },
        {
          path: "/gestion/autoexclusion",
          name: "autoExclusion",
          component: () => import("../views/Config/Exclusion.vue"),
        },
        {
          path: "/gestion/autoexclusion-producto",
          name: "autoExclusionProduct",
          component: () => import("../views/Config/ExclusionProduct.vue")
        },
        {
          path: "/gestion/limitaciones",
          name: "limitations",
          component: () => import("../views/Config/Limitations.vue")
        },
        {
          path: "/gestion/limitedeposito",
          name: "limitDeposito",
          component: () => import("../views/Config/LimitDeposit.vue"),
        },
        {
          path: "/gestion/historial_saldo",
          name: "historialSaldo",
          component: () => import("../views/Config/BalanceHistory.vue"),
        },
        {
          path: "/referido/agregar_referidos",
          name: "AgregarReferidos",
          component: () => import("../views/Promotions/Referrals.vue")
        },
        {
          path: "/referido/estado_referidos",
          name: "estadoDeReferidos",
          beforeEnter: guardMyroute,
          component: () => import("../views/Promotions/ReferralsState.vue")
        },
        {
          path: "/shop-bonuses",
          name: "shopBonuses2",
          component: () => import("../views/Config/ShopBonuses.vue"),
        },
      {
          path: "/shop-bonuses-cards/:categoryId",
          name: "shopBonusesCard",
          component: () => import("../views/Config/ShopBonusesCard.vue"),
      },
      {
          path: "/shop-bonuses-card/:categoryId",
          name: "shopBonusesCardV2",
          component: () => import("../views/Config/ShopBonusesCardV2.vue"),
      },
      {
          path: "/shop-bonuses-card/:categoryId",
          name: "shopBonusesCardV3",
          component: () => import("../views/Config/ShopBonusesCardV3.vue"),
      },
        {
          path: "/consulta/mi_lealtad",
          name: "myLoyalty",
          beforeEnter: guardMyroute,
          component: () => import("../views/Config/MyLoyalty.vue"),
        },
        {
          path: "/gestion/mi_lealtad",
          name: "myLoyalty2",
          beforeEnter: guardMyroute,
          component: () => import("../views/Config/MyLoyalty.vue"),
        },
        {
          path: "/contactenos",
          name: "contactUs",
          component: () => import("../views/Help/ContactUs.vue"),
        },
        {
          path: "/trabaja-con-nosotros",
          name: "workWithUs",
          component: () => import("../views/Help/WorkWithUs.vue"),
        },
        {
          path: "/terminosycondiciones",
          name: "termsAndConditions",
          component: () => import("../views/Help/TermsAndConditions.vue"),
        },
        {
          path: "/terminosycondiciones/:sectionId",
          name: "termsAndConditions2",
          component: () => import("../views/Help/TermsAndConditions.vue"),
        },
        {
          path: "/termosecondicoes",
          name: "ltermsAndConditions",
          component: () => import("../views/Help/TermsAndConditions.vue"),
        },
        {
          path: "/termosecondicoes/:sectionId",
          name: "ltermsAndConditions2",
          component: () => import("../views/Help/TermsAndConditions.vue"),
        },
        {
          path: "/politica-de-privacidad",
          name: "politica-de-privacidad",
          component: () => import("../views/Help/TermsAndConditions.vue"),
        },
        {
          path: "/politica-de-privacidade",
          name: "lpolitica-de-privacidad",
          component: () => import("../views/Help/TermsAndConditions.vue"),
        },
        {
          path: "/politica-de-privacidad/:sectionId",
          name: "politica-de-privacidad2",
          component: () => import("../views/Help/TermsAndConditions.vue"),
        },
        {
          path: "/politica-de-privacidade/:sectionId",
          name: "lpolitica-de-privacidad2",
          component: () => import("../views/Help/TermsAndConditions.vue"),
        },
        {
          path: "/preguntasfrecuentes",
          name: "preguntasfrecuentes",
          component: () => import("../views/Help/TermsAndConditions.vue"),
        },
        {
          path: "/preguntasfrecuentes/:sectionId",
          name: "preguntasfrecuentes2",
          component: () => import("../views/Help/TermsAndConditions.vue"),
        },
        {
          path: "/juego-responsable",
          name: "juego-responsable",
          component: () => import("../views/Help/TermsAndConditions.vue"),
        },
        {
          path: "/juego-responsable/:sectionId",
          name: "juego-responsable2",
          component: () => import("../views/Help/TermsAndConditions.vue"),
        },
        {
          path: "/responsável-pelo-jogo",
          name: "ljuego-responsable",
          component: () => import("../views/Help/TermsAndConditions.vue"),
        },
        {
          path: "/responsável-pelo-jogo/:sectionId",
          name: "ljuego-responsable2",
          component: () => import("../views/Help/TermsAndConditions.vue"),
        },
        {
          path: "/geolocalizacion",
          name: "geolocation",
          component: () => import("../views/Help/Geolocation.vue"),
        },
        {
          path: "/reclamaciones",
          name: "claims",
          component: () => import("../views/Help/Claims.vue"),
        },
        {
          path: "/mis-reclamaciones",
          name: "myClaims",
          component: () => import("../views/Help/MyClaims.vue"),
        },
        {
          path: "/resultados",
          name: "results",
          component: () => import("../views/Help/Results.vue"),
        },
        {
          path: "/mundial",
          name: "mundial",
          component: () => import("../views/Help/Mundial.vue"),
        },
        {
          path: "/thankyou",
          name: "thankyou",
          component: () => import("../views/Help/ThankYou.vue"),
        },
        {
          path: "/graciasdeposito",
          name: "graciasdeposito",
          component: () => import("../views/Help/GraciasDeposito.vue"),
        },
        {
          path: "/promociones-bonos",
          name: "promotions",
          component: () => import("../views/Help/Promotions.vue"),
        },
        {
          path: "/promociones-bonos/:sectionId",
          name: "promotions2",
          component: () => import("../views/Help/Promotions.vue"),
        },
        {
          path: "/promociones-bonos/id/:bonoId",
          name: "promotions3",
          component: () => import("../views/Help/Promotions.vue"),
        },
        {
          path: "/promos-bonus",
          name: "ppromotions",
          component: () => import("../views/Help/Promotions.vue"),
        },
        {
          path: "/promos-bonus/:sectionId",
          name: "ppromotions2",
          component: () => import("../views/Help/Promotions.vue"),
        },
        {
          path: "/promos-bonus/id/:bonoId",
          name: "ppromotions3",
          component: () => import("../views/Help/Promotions.vue"),
        },
        {
          path: "/banner-right",
          name: "BannersSlider",
          component: () => import("../components/BannersSlider.vue"),
        },
        {
          path: "/banner-left",
          name: "BannersSlider2",
          component: () => import("../components/BannersSlider.vue"),
        },
        {
          path: "/banner-rightnl",
          name: "BannersSlider3",
          component: () => import("../components/BannersSlider.vue"),
        },
        {
          path: "/banner-leftnl",
          name: "BannersSlider4",
          component: () => import("../components/BannersSlider.vue"),
        },
        {
          path: "/banner-topcenter",
          name: "BannersSlider5",
          component: () => import("../components/BannersSlider.vue"),
        },
        {
          path: "/banner-topcenternl",
          name: "BannersSlider6",
          component: () => import("../components/BannersSlider.vue"),
        },
        {
          path: "/recuperar-clave",
          name: "recoverPassword",
          component: () => import("../views/Help/RecoverPassword.vue"),
        },
        {
          path: "/recuperar-clave-validar/:tokenP",
          name: "recoverPasswordSend",
          component: () => import("../views/Help/RecoverPasswordSend.vue"),
        },
        {
          path: "/recuperar-clave-activar/:tokenP",
          name: "recoverPasswordSend2",
          component: () => import("../views/Help/RecoverPasswordSend.vue"),
        },
        {
          path: "/validar-actualizacion/:tokenP",
          name: "updateData",
          component: () => import("../views/Help/UpdateData.vue"),
        },
        {
          path: "/verificar-email/:email/:tokenP",
          name: "registerEmailSend",
          component: () => import("../views/Help/RegisterEmailSend.vue"),
        },
        {
          path: "/mensajes",
          name: "messages",
          beforeEnter: guardMyroute,
          component: () => import("../views/Help/Messages.vue"),
        },
        {
          path: "/torneos",
          name: "tournaments",
          component: () => import("../views/Promotions/Tournaments.vue"),
        },
        {
          path: "/torneiras",
          name: "torneiras",
          component: () => import("../views/Promotions/Tournaments.vue"),
        },
        {
          path: "/bingos",
          name: "bingos",
          component: () => import("../views/Products/LobbyBingos.vue"),
        },
        {
          path: "/bingos/:GameId",
          name: "bingos2",
          component: () => import("../views/Products/LobbyBingos.vue"),
        },
        {
          path: "/bingos/categoria/:CategoryId",
          name: "bingos3",
          component: () => import("../views/Products/LobbyBingos.vue"),
        },
        {
          path: "/bingos/categoria/:CategoryId/:GameId",
          name: "bingos4",
          component: () => import("../views/Products/LobbyBingos.vue"),
        },
        {
            path: "/bingos/proveedor/:ProviderId",
            name: "bingos5",
            component: () => import("../views/Products/LobbyBingos.vue"),
        },
        {
          path: "/sorteos",
          name: "raffles",
          component: () => import("../views/Promotions/Raffles.vue"),
        },
        {
          path: "/programa_lealtad",
          name: "myLoyaltyGuide",
          component: () => import("../views/Help/MyLoyaltyGuide.vue"),
        },
        {
          path: "/programa-lealtad",
          name: "myLoyaltyGuide",
          component: () => import("../views/Help/MyLoyaltyGuide.vue"),
        },
        {
          path: "/clube-da-loto",
          name: "lmyLoyaltyGuide",
          component: () => import("../views/Help/MyLoyaltyGuide.vue"),
        },
        {
          path: "/televentas",
          name: "LandingTelesales",
          component: () => import("../views/Help/LandingTelesales.vue"),
        },
        {
          path: "/landing/app",
          name: "landingApp",
            beforeEnter: guardMyRouteInfoApp,
          component: () => import("../views/Help/LandingApp2.vue"),
        },
        {
          path: "/landing/appIos",
          name: "landingAppIos",
            beforeEnter: guardMyRouteInfoApp,
          component: () => import("../views/Help/LandingApp3.vue"),
        },
        {
          path: "/landing/app-mobile",
          name: "llandingApp",
            beforeEnter: guardMyRouteInfoApp,
          component: () => import("../views/Help/LandingApp2.vue"),
        },
      {
          path: "/landing/app-pwa",
          name: "landingAppPwa",
          beforeEnter: guardMyRouteInfoApp,
          component: () => import("../views/Help/LandingAppAndoridAndPwa.vue"),
      },
        {
          path: "/landing/cambiar-clave",
          name: "landingChangePassword",
          component: () => import("../views/Help/LandingChangePassword.vue")
        },
        {
          path: "/landing/verificarCuenta",
          name: "landingVerifyAccount",
          component: () => import("../views/Help/LandingVerifyAccount.vue")
        },
        {
          path: "/landing/sorteos/:LotteryId",
          name: "landingLottery",
          component: () => import("../views/Help/LandingLottery.vue"),
        },
        {
          path: "/landing-register/",
          name: "LandingRegister",
          component: () => import("../views/Help/LandingRegister.vue"),
        },
        {
          path: "/liga/:ligaId",
          name: "DataFactory",
          component: () => import("../views/Help/DataFactory.vue"),
        },
        {
          path: "/my-bonuses-progress",
          name: "myBonusesProgress",
          component: () => import("../views/Balance/MyBonusesProgress.vue"),
        },
        {
          path: "/wallet",
          name: "wallet",
          component: () => import("../views/Config/Wallets.vue"),
        },
        {
          path: "/pos/login",
          name: "loginPos",
          component: () => import("../views/POS/login/LandingLogin.vue")
        },
        {
          path: "/landing/login-playtech",
          name: "LoginPokerPlaytech",
          component: () => import("../views/LandingLoginPlaytech.vue")
        },
        {
          path: "/pos/menu",
          name: "menuPos",
          beforeEnter: guardMyRouteAppPos,
          component: () => import("../views/POS/menu/MenuPos.vue")
        },
        {
          path:"/pos/bets-sport",
          name: "BetSport",
          beforeEnter: guardMyRouteAppPos,
          component: () => import("../views/POS/views/BetsSport.vue")
        },
        {
          path: "/pos/change-password",
          name: "changePasswordP",
          beforeEnter: guardMyRouteAppPos,
          component: () => import("../views/POS/views/ChangePasswordPos.vue")
        },
        {
          path: "/pos/flow-cash",
          name: "flowCash",
          beforeEnter: guardMyRouteAppPos,
          component: () => import("../views/POS/views/FlowCash.vue")
        },
        {
          path: "/pos/flow-cash-summary",
          name: "flowCashSummary",
          beforeEnter: guardMyRouteAppPos,
          component: () => import("../views/POS/views/FlowCashSummary.vue")
        },
        {
          path: "/pos/prize-payment",
          name: "prizePayment",
          beforeEnter: guardMyRouteAppPos,
          component: () => import("../views/POS/views/PrizePayment.vue")
        },
        {
          path: "/pos/note-withdrawal-payment",
          name: "noteWithdrawalPayment",
          beforeEnter: guardMyRouteAppPos,
          component: () => import("../views/POS/views/NoteWithdrawalPayment.vue")
        },
        {
          path: "/pos/credit-recharge",
          name: "creditRecharge",
          beforeEnter: guardMyRouteAppPos,
          component: () => import("../views/POS/views/CreditRecharge.vue")
        },
        {
          path: "/pos/resultados",
          name: "resultsPos",
          beforeEnter: guardMyRouteAppPos,
          component: () => import("../views/POS/views/Results.vue"),
        },
      ],
});

export default router;

// FILE DOCUMENTED
