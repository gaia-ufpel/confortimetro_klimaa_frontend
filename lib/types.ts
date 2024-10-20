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
  location_id: z.coerce.number({message: "Deve ser um número inteiro"}).min(1),
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

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  group: string;
  is_active: boolean;
  is_admin: boolean;
}
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


