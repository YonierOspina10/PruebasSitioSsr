import apiService from '../ApiService';
import type { Jackpot } from '@/interface/IJackpot';

/**
 * Fetches jackpot data from the server.
 *
 * @param params - Optional parameters to be sent with the request.
 * @returns A promise that resolves to an array of Jackpot objects.
 * @throws Will throw an error if the server response is invalid or if the request fails.
 */
export async function getJackpotServices(params?: any): Promise<Jackpot[]> {
	try {
		// Sends a request to the API service to get jackpot data
		const response = await apiService.request('get_jackpot', params);

		// Validates the response to ensure it contains an array of jackpot data
		if (!response || !Array.isArray(response.data)) {
			throw new Error('La respuesta del servidor no es válida.');
		}

		// Returns the jackpot data as an array of Jackpot objects
		return response.data as Jackpot[];
	} catch (error: any) {
		// Logs the error message to the console for debugging purposes
		console.error('Error al obtener los jackpots:', error.message || error);

		// Throws a new error to indicate that the jackpot data could not be loaded
		throw new Error(
			'No se pudieron cargar los datos del jackpots. Intenta nuevamente más tarde.'
		);
	}
}

// FILE DOCUMENTED
