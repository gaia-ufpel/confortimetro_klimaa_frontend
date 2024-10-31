// FOR DEVELOPING PURPOSES ONLY
import { Metric } from '@/lib/types';
import { TLocationSchema, TDeviceSchema } from '@/lib/types';
import { User } from '@/lib/types';

export const dummyMetrics: Metric[] = [
    { id: 1, name: 'Temperature', description: 'Temperature' },
    { id: 2, name: 'Humidity', description: 'Relative Humidity' },
    { id: 3, name: 'CO2', description: 'Carbon Dioxide' },
    { id: 4, name: 'VOC', description: 'Volatile Organic Compounds' },
];

export const dummyLocations: TLocationSchema[] = [
    { id: 1, campus: 'Campus 1', building: 'Building 1', room: 'Room 1' },
    { id: 2, campus: 'Campus 2', building: 'Building 2', room: 'Room 2' },
    { id: 3, campus: 'Campus 3', building: 'Building 3', room: 'Room 3' },
    { id: 4, campus: 'Campus 4', building: 'Building 4', room: 'Room 4' },
    { id: 5, campus: 'Campus 5', building: 'Building 5', room: 'Room 5' },
    { id: 6, campus: 'Campus 6', building: 'Building 6', room: 'Room 6' },
    { id: 7, campus: 'Campus 7', building: 'Building 7', room: 'Room 7' },
    { id: 8, campus: 'Campus 1', building: 'Building 1', room: 'Room 1' },
    { id: 9, campus: 'Campus 2', building: 'Building 2', room: 'Room 2' },
    { id: 10, campus: 'Campus 3', building: 'Building 3', room: 'Room 3' },
    { id: 11, campus: 'Campus 4', building: 'Building 4', room: 'Room 4' },
    { id: 12, campus: 'Campus 5', building: 'Building 5', room: 'Room 5' },
    { id: 13, campus: 'Campus 6', building: 'Building 6', room: 'Room 6' },
    { id: 14, campus: 'Campus 7', building: 'Building 7', room: 'Room 7' },
];

export const dummyDevices: TDeviceSchema[] = [
    { id: 1, serial_number: 'SN001', model: 'Model A', location_id: 1 },
    { id: 2, serial_number: 'SN002', model: 'Model B', location_id: 1 },
    { id: 3, serial_number: 'SN003', model: 'Model C', location_id: 2 },
    { id: 4, serial_number: 'SN004', model: 'Model D', location_id: 2 },
    { id: 5, serial_number: 'SN005', model: 'Model E', location_id: 1 },
    { id: 6, serial_number: 'SN001', model: 'Model A', location_id: 1 },
    { id: 7, serial_number: 'SN002', model: 'Model B', location_id: 1 },
    { id: 8, serial_number: 'SN003', model: 'Model C', location_id: 2 },
    { id: 9, serial_number: 'SN004', model: 'Model D', location_id: 2 },
    { id: 10, serial_number: 'SN005', model: 'Model E', location_id: 1 },
];

export const dummyUser: User = {
    id: 4,
    name: 'Carlos Silva',
    email: 'carlos.silva@example.com',
    password: 'Password123!',
    group: 'student',
    is_active: true,
    is_admin: true,
};
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

export const dummyUsers: User[] = [
    {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'Password123!',
        group: 'student',
        is_active: true,
        is_admin: false,
    },
    {
        id: 2,
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        password: 'Password123!',
        group: 'professor',
        is_active: true,
        is_admin: true,
    },
    {
        id: 3,
        name: 'Alice Johnson',
        email: 'alice.johnson@example.com',
        password: 'Password123!',
        group: 'external community',
        is_active: false,
        is_admin: false,
    },
];