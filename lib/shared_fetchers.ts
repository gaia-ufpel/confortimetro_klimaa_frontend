import api from "../app/api";

export const fetchMetricTypes = async () => {
    try {
        const response = await api.get(`/metric-type`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'accept': '*/*',
                }
            }
        );

        if (response.status !== 200) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }
        const metricTypesData = response.data;
        return metricTypesData;
    } catch (e: any) {
        console.log(e);
    }
};

export const getMetrics = async () => {
    try {
        const metrics = await api.get(`/metric/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'accept': '*/*',
            }
        })
        const metricsData = await metrics.data
        return metricsData;
    } catch (e: any) {
        console.log(e);
    }
}


export const getDevices = async () => {
    try {
        const response = await api.get(`/device`, {
            headers:
            {
                'Content-Type': 'application/json',
                'Accept': '*/*',
            },
        });

        const devices = await response.data
        return devices
    } catch (e: any) {
        console.log(e)
    }
}

export const fetchLocations = async () => {
    try {
        const response = await api.get(`/location`, {
            headers:
            {
                'Content-Type': 'application/json',
                'accept': '*/*',
            },
        });

        const locationsData = await response.data;
        return locationsData;
    } catch (e: any) {
        console.log(e);
    }
};

export const getUserInfo = async () => {
    try {
        const response = await api.get(`/user`, {
            headers:
            {
                'Content-Type': 'application/json',
                'accept': '*/*',
            },
        });

        const userInfo = await response.data;
        return userInfo;
    } catch (e: any) {
        console.log(e);
    }
}



export const fetchlogin = async (credentials: { email: string, password: string }) => {
    const Cookies = require('js-cookie');
    try {
        const response = await api.post(`/auth/login`, credentials, {
            headers: {
                'Content-Type': 'application/json',
                'accept': '*/*',
            }
        });
        const data = JSON.parse(response.data);
        const token = data.Authorization.split(' ')[1];
        api.defaults.headers.Authorization = token;
        
        return {auth: false, token: token};
    } catch (error: any) {
        console.error('Erro:', error);
        return {auth: true, token: ''};
    }
};