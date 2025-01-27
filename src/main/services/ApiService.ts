import axios, {AxiosInstance} from "axios";

class ApiService {
    static getClient(baseUrl: string): AxiosInstance {
        return axios.create({
            baseURL: baseUrl,
            headers: {"Content-Type": "application/json"}
        })
    }
}

export default ApiService;
