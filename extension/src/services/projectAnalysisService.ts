import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

export interface ProjectAnalysisResponse {
    status: string;
    summary?: string;
    issues?: Array<any>;
    fixes?: Array<any>;
    readme?: string;
    error?: string;
    [key: string]: any;
}

export async function analyzeProject(): Promise<ProjectAnalysisResponse> {
    try {
        const response = await axios.post(`${API_BASE_URL}/analyze-project`, {});
        if (!response.data || response.data.status !== "success") {
            throw new Error(response.data?.error || "Unknown error from backend (analyze-project)");
        }
        return response.data;
    } catch (error: any) {
        let errorMessage = "Error fetching project analysis";
        if (error?.response?.data?.error) {
            errorMessage += `: ${error.response.data.error}`;
        } else if (error.message) {
            errorMessage += `: ${error.message}`;
        }
        throw new Error(errorMessage);
    }
}
