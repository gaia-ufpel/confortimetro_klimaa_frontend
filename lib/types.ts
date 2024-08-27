import {z} from 'zod';

export const signupSchema = z.object({
    name: z.string().max(50, "Nome deve ter no máximo 50 caracteres"),
    email: z.string().email("E-mail inválido"),
    password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
    confirmpassword: z.string(),
}).refine(data => data.password === data.confirmpassword, {
    message: 'As senhas não coincidem',
    path: ['confirmpassword'],
});


export type TsignupSchema = z.infer<typeof signupSchema>;