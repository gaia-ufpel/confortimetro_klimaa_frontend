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
    let metricsURL = `${api.defaults.baseURL}/metric/`;
    try {
        const token = localStorage.getItem('token');
        const metrics = await fetch(`${metricsURL}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'accept': '*/*',
            }
        })
        const metricsData = await metrics.json()
        return metricsData;
    } catch (e: any) {
        console.log(e);
    }
}

export const getMetricsByDeviceId = async (DeviceId: number) => {
    try {
        const metrics = await api.get(`/metric/search?device_id=${DeviceId}`, {
            headers:
            {
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