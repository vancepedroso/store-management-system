import axios from "axios";

const axiosClient = axios.create({
    baseURL: "http://localhost:8000/api"
})

console.log('Base URL:', axiosClient.defaults.baseURL);

axiosClient.interceptors.request.use((config) =>
{
    const token = localStorage.getItem('ACCESS_TOKEN')
    config.headers.Authorization = `Bearer ${token}`
    return config;
})

axiosClient.interceptors.response.use((response) =>
{
    return response;
}, (error) =>
{
    try{
        const {response} = error;
        if(response.status == 401)
        {
            localStorage.remove('ACCESS_TOKEN')
        }
    }
    catch(e)
    {
        console.log(e);

    }
   
    
    throw error;
})

export default axiosClient;