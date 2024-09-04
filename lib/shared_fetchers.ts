import api from "../app/api";
import { useRef } from "react";
import { Metrics } from "@/lib/types";
import { Device } from "@/lib/types";


export const fetchMetricTypes = async () => {
    const metricTypesUrl = `${api.defaults.baseURL}/metric-type/`;
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(metricTypesUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, 
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        const metricTypesData = await response.json();
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

export const getDevices = async (id:string | null) => {
    const devicesurl = `${api.defaults.baseURL}/device/${id != null ? id+'/' : ''}`;

    try {
        const token = localStorage.getItem('token');
        const response = await fetch(devicesurl, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': '*/*',
            },
        });
        const devices = await response.json()
        return devices
    } catch (e: any) {
        console.log(e)
    }
}

export const fetchLocations = async () => {
    const locationsUrl = `${api.defaults.baseURL}/location/`;
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(locationsUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'accept': '*/*',
        },
      });

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }

      const locationsData = await response.json();
      return locationsData;
    } catch (e: any) {
      console.log(e);
    }
  };