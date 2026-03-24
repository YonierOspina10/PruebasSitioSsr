import apiService from '../ApiService.ts'; // Importing the apiService for making API requests
import type { Jackpot } from '../../interfaces/IJackpot'; // Importing the Jackpot type for type safety

// Function to fetch jackpot services, optionally taking parameters
export async function getJackpotServices(params?: any): Promise<Jackpot[]> {
    try {
        // Making a request to the API to get jackpot data
        const response = await apiService.request('get_jackpot', params);

        // Validating the response structure
        if (!response || !Array.isArray(response.data)) {
            throw new Error('La respuesta del servidor no es válida.'); // Error if response is invalid
        }

        return response.data as any[]; // Returning the jackpot data
    } catch (error: any) {
        // Logging the error message
        console.error('Error al obtener los jackpots:', error.message || error);

        // Throwing a user-friendly error message
        throw new Error('No se pudieron cargar los datos del jackpots. Intenta nuevamente más tarde.');
    }
}

// FILE DOCUMENTED
