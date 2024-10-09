import { z } from 'zod';

export const signupSchema = z.object({
  name: z.string().max(50, "Nome deve ter no máximo 50 caracteres"),
  email: z.string().email("E-mail inválido"),
  password: z.string()
    .min(6, "Senha deve ter no mínimo 6 caracteres")
    .regex(/[a-z]/, "Senha deve conter pelo menos uma letra minúscula")
    .regex(/[A-Z]/, "Senha deve conter pelo menos uma letra maiúscula")
    .regex(/\d/, "Senha deve conter pelo menos um dígito")
    .regex(/[^a-zA-Z0-9]/, "Senha deve conter pelo menos um caractere especial"),
  confirmpassword: z.string(),
  group: z.enum(["student", "professor", "external community"]),
}).refine(data => data.password === data.confirmpassword, {
  message: 'As senhas não coincidem',
  path: ['confirmpassword'],
});

export type TsignupSchema = z.infer<typeof signupSchema>;

export const DeviceSchema = z.object({
  id: z.coerce.number().min(1, "Deve ser um número"),
  serial_number: z.string().max(30, "Número de série deve ter no máximo 50 caracteres"),
  model: z.string().max(30, "Modelo deve ter no máximo 50 caracteres"),
  location_id: z.coerce.number().min(1, "Deve ser um número"),
});

export type TDeviceSchema = z.infer<typeof DeviceSchema>;

export const newMetricTypeSchema = z.object({
  id: z.coerce.number({ message: "Deve ser um número" }),
  name: z.string().max(30, "Nome deve ter no máximo 30 caracteres"),
  description: z.string().max(100, "Descrição deve ter no máximo 100 caracteres"),
});

export type TnewMetricTypeSchema = z.infer<typeof newMetricTypeSchema>;

export const LocationSchema = z.object({
  id: z.coerce.number({ message: "Deve ser um número" }),
  campus: z.string().max(30, "Campus deve ter no máximo 30 caracteres"),
  building: z.string().max(30, "Building deve ter no máximo 30 caracteres"),
  room: z.string().max(30, "Room deve ter no máximo 30 caracteres"),
});

export type TLocationSchema = z.infer<typeof LocationSchema>;

export interface Metrics {
  id: number;
  location_id: number;
  value: number;
  datetime: string;
  device_id: number;
  metric_type_id: number;
}

export interface Device {
  id: number;
  serial_number: string;
  model: string;
  location_id: number;
}

export interface Metric {
  id: number;
  name: string;
  description: string;
}

export interface Location {
  id: number;
  campus: string;
  building: string;
  room: string;
}

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
