import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://192.168.1.4:4000/api/v1',
})

instance.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('token')
        
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config;
    })

export default instance;