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

export const newdeviceSchema = z.object({
  serial_number: z.string().max(30, "Número de série deve ter no máximo 50 caracteres"),
  model: z.string().max(30, "Modelo deve ter no máximo 50 caracteres"),
  location_id: z.coerce.number().min(1, "Deve ser um número"),
});

export type TnewdeviceSchema = z.infer<typeof newdeviceSchema>;

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

export function generateSensorData(startDate: Date, numDevices: number): Metrics[] {
  const data: Metrics[] = [];
  let currentId = 1;
  const numEntries = 10; // Número fixo de períodos

  for (let i = 0; i < numEntries; i++) {
    const currentDateTime = new Date(startDate);
    currentDateTime.setMinutes(startDate.getMinutes() + i * 5); // Incrementa o tempo a cada 5 minutos

    for (let deviceId = 1; deviceId <= numDevices; deviceId++) { // Gera dados com base no número de dispositivos fornecido
      for (let metricTypeId = 1; metricTypeId <= 4; metricTypeId++) { // Quatro tipos de métricas (metric_type_id de 1 a 4)
        data.push({
          id: currentId++,
          location_id: Math.floor(Math.random() * 10) + 1, // Valor aleatório para location_id
          value: parseFloat((Math.random() * 100).toFixed(2)), // Valor aleatório entre 0 e 100
          datetime: currentDateTime.toISOString(),
          device_id: deviceId,
          metric_type_id: metricTypeId,
        });
      }
    }
  }

  return data;
}