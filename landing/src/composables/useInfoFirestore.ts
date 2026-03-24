const WORKER_BASE_URL =
    'https://static2.virtualsoft.tech';

async function fetchConfigFromWorker(params: {
    partner: string;
    lang: string;
    country: string;
    collectionKey: string;
    mobile: string; // '1' | '0'
    logged: string; // '1' | '0'
    useScope: string; // '1' | '0'
    useLogin: string; // '1' | '0'
}) {
    const url = new URL(`${WORKER_BASE_URL}/config`);
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));

    const res = await fetch(url.toString(), {
        method: 'GET',
        headers: { Accept: 'application/json' },
    });

    if (!res.ok) return null;

    const data = await res.json();

    // Expecting an array of documents; fall back to null if not.
    return Array.isArray(data.data) ? (data.data as any[]) : null;
}

/**
 * In-memory cache that lives while the app is mounted.
 * It prevents repeated Firestore reads for the same path.
 */
const firestoreCache = new Map<string, any[] | null>();

/**
 * Generic Firestore reader with optional login and device scope support.
 *
 * @param config - Global site configuration object
 * @param appComponent - Global app state (session, device info, etc.)
 * @param collectionKey - Firestore subcollection name to query
 * @param options - Flags to control optional path segments
 * @returns Array of documents or null if empty / unavailable
 */
export async function useGetInfoFirestore(
    config: any,
    appComponent: any,
    collectionKey: string,
    options?: {
        useLogin?: boolean; // Whether to include login / not_login in the path
        useScope?: boolean; // Whether to include mobile / desktop in the path
    },
) {
    // Extract partner, country and lang
    const partner = config?.partner ?? '';
    const country = config?.countryL ?? '';
    const lang = config?.default_language ?? '';

    if (partner == '') {
        return null;
    }
    // Base Firestore document path segments
    const parts: string[] = [`partner_${partner}`, country];

    // Optionally append login state and device scope (login / not_login - mobile/desktop)
    if (options?.useScope) parts.push(appComponent?.mobile === '1' ? 'mobile' : 'desktop');
    if (options?.useLogin) parts.push(appComponent?.session?.logueado ? 'login' : 'not_login');
    parts.push(lang);

    // Build final Firestore document name
    const docName = parts.join('_');


    // Unique cache key based on document path and subcollection
    const cacheKey = `${docName}__${collectionKey}`;

    // Cache lookup
    if (firestoreCache.has(cacheKey)) {
        return firestoreCache.get(cacheKey) ?? null;
    }

    const partnerParam = String(partner);
    const langParam = String(lang);
    const countryParam = String(country);
    const collectionKeyParam = String(collectionKey);

    const mobileParam = appComponent?.mobile === '1' ? '1' : '0';
    const loggedParam = appComponent?.session?.logueado ? '1' : '0';
    const useScopeParam = options?.useScope ? '1' : '0';
    const useLoginParam = options?.useLogin ? '1' : '0';
    // Perform Firestore query if cache is missing or empty
    const docs = await fetchConfigFromWorker({
        partner: partnerParam,
        lang: langParam,
        country: countryParam,
        collectionKey: collectionKeyParam,
        mobile: mobileParam,
        logged: loggedParam,
        useScope: useScopeParam,
        useLogin: useLoginParam,
    });

    //For banner data, apply filters by 'location', 'isExpired', 'date' and 'startDate properties
    const filteredResponse = processBanners(docs);

    const result = filteredResponse.length ? filteredResponse : null;
    firestoreCache.set(cacheKey, result);

    return result;
}

function processBanners(docs: any[]) {
    console.log(docs);
    //Validate the existence of “isExpired”, “date”, “statrDate” and “location” in the array
    const now = new Date();
    const hasAny = (key: string) => docs.some((item: any) => item && item[key] != null && item[key] !== '');

    const hasIsExpired = hasAny('isExpired');
    const hasDate = hasAny('date');
    const hasLocation = hasAny('location');
    const hasStartDate = hasAny('startDate');

    let banners = docs;
    // Apply filters by isExpired, end date (date) and startDate
    if (hasIsExpired || hasDate || hasStartDate) {
        banners = banners.filter((banner: any) => {
            if (hasIsExpired && banner?.isExpired === true) return false;

            // startDate: if it's in the future, don't show yet
            if (hasStartDate && banner?.startDate) {
                const start = new Date(String(banner.startDate).replace(' ', 'T'));
                if (!isNaN(start.getTime()) && start.getTime() > now.getTime()) return false;
            }

            // date: if it's expired by end date, don't show
            if (hasDate && banner?.date) {
                const end = new Date(String(banner.date).replace(' ', 'T'));
                if (!isNaN(end.getTime()) && end.getTime() < now.getTime()) return false;
            }

            return true;
        });
    }
    //Reorder array according to the location property
    if (hasLocation) {
        banners = [...banners].sort((a: any, b: any) => {
            const la = a?.location == null ? Number.POSITIVE_INFINITY : Number(a.location);
            const lb = b?.location == null ? Number.POSITIVE_INFINITY : Number(b.location);
            return la - lb;
        });
    }

    return banners;
}
