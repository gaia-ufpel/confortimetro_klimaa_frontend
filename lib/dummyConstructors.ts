// FOR DEVELOPING PURPOSES ONLY
import { Metric } from '@/lib/types';
import { TLocationSchema, TDeviceSchema } from '@/lib/types';

export const dummyMetrics: Metric[] = [
    { id: 1, name: 'Temperature', description: 'Temperature' },
    { id: 2, name: 'Humidity', description: 'Relative Humidity' },
    { id: 3, name: 'CO2', description: 'Carbon Dioxide' },
    { id: 4, name: 'VOC', description: 'Volatile Organic Compounds' },
];

export const dummyLocations: TLocationSchema[] = [
    { id: 1, campus: 'Campus 1', building: 'Building 1', room: 'Room 1' },
    { id: 2, campus: 'Campus 2', building: 'Building 2', room: 'Room 2' },
];

export const dummyDevices: TDeviceSchema[] = [
    { id: 1, serial_number: 'SN001', model: 'Model A', location_id: 1 },
    { id: 2, serial_number: 'SN002', model: 'Model B', location_id: 1 },
    { id: 3, serial_number: 'SN003', model: 'Model C', location_id: 2 },
];

interface SensorData {
    id: number;
    location_id: number;
    value: number;
    datetime: string;
    device_id: number;
    metric_type_id: number;
}

export function generateSensorData(startDate: Date): SensorData[] {

    // Função para gerar as datas a cada hora por 24 horas
    function generate24hdates(startDate: Date): Date[] {
        const dates: Date[] = [];
        let currentDate = new Date(startDate);
        currentDate.setHours(0, 0, 0, 0); // Inicia à meia-noite
        for (let i = 0; i < 24; i++) { // Gera uma data para cada hora
            dates.push(new Date(currentDate));
            currentDate.setHours(currentDate.getHours() + 1); // Incrementa uma hora
        }
        return dates;
    }

    const data: SensorData[] = [];

    let currentId = 1;
    // Gera as datas a cada hora por 24 horas
    const dates = generate24hdates(startDate);

    // Itera sobre cada data gerada
    for (const currentDateTime of dates) {
        // Para cada data, gera quatro diferentes métricas (metric_type_id de 1 a 4)
        for (let metricTypeId = 1; metricTypeId <= 4; metricTypeId++) {
            data.push({
                id: currentId++,
                location_id: 1, // Valor aleatório para location_id
                value: parseFloat((Math.random() * 100).toFixed(2)), // Valor aleatório entre 0 e 100
                datetime: currentDateTime.toISOString(),
                device_id: 1, // Usa o device_id fornecido
                metric_type_id: metricTypeId,
            });
        }
    }

    return data;
}