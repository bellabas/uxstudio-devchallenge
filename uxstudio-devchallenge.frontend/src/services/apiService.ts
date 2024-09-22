import axios, { type AxiosResponse } from 'axios';

class ApiService {
    private baseUrl: string;

    constructor() {
        this.baseUrl = 'http://localhost:8080';
    }

    public async get<T>(endpoint: string): Promise<AxiosResponse<T>> {
        try {
            const response = await axios.get<T>(`${this.baseUrl}${endpoint}`);
            return response;
        } catch (error) {
            console.error(`Error fetching data from ${endpoint}:`, error);
            throw error;
        }
    }

    public async post<T>(endpoint: string, data: any): Promise<AxiosResponse<T>> {
        try {
            const response = await axios.post<T>(`${this.baseUrl}${endpoint}`, data);
            return response;
        } catch (error) {
            console.error(`Error posting data to ${endpoint}:`, error);
            throw error;
        }
    }

    public async put<T>(endpoint: string, data: any): Promise<AxiosResponse<T>> {
        try {
            const response = await axios.put<T>(`${this.baseUrl}${endpoint}`, data);
            return response;
        } catch (error) {
            console.error(`Error updating data at ${endpoint}:`, error);
            throw error;
        }
    }

    public async delete<T>(endpoint: string): Promise<AxiosResponse<T>> {
        try {
            const response = await axios.delete<T>(`${this.baseUrl}${endpoint}`);
            return response;
        } catch (error) {
            console.error(`Error deleting data from ${endpoint}:`, error);
            throw error;
        }
    }
}

export default new ApiService();
