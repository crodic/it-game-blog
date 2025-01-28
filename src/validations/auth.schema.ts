import { z } from 'zod';

export const authSchema = z.object({
    email: z.string().email({ message: 'Email không hợp lệ' }),
    password: z.string().min(6),
});

export type AuthSchema = z.infer<typeof authSchema>;
