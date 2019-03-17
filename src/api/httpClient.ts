import axios, { AxiosRequestConfig } from 'axios';

class HttpClient {
    
    get<T>(url: string, config?: AxiosRequestConfig) {
        let axiosConfig: AxiosRequestConfig = {};
        
        if(config) {
            axiosConfig = {... config}
        }
        
        return axios.get<T>(url, axiosConfig)
            .then((response) => response.data);
    }
}

const httpClient = new HttpClient;
export default httpClient;
