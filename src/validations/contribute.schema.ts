import { z } from 'zod';

export const contributeSchema = z.object({
    email: z.string().email({ message: 'Email không hợp lệ' }),
    content: z.string().min(1, 'Nội dung là bắt buộc'),
});

export type ContributeSchema = z.infer<typeof contributeSchema>;
