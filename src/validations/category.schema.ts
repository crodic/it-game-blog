import { z } from 'zod';

export const categorySchema = z.object({
    name: z.string().min(1, 'Tên danh mục là bắt buộc.'),
    description: z.string(),
    color: z.string(),
});

export type CategorySchema = z.infer<typeof categorySchema>;
