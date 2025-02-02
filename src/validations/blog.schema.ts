import { z } from 'zod';

export const blogSchema = z.object({
    title: z.string().min(1, 'Tiêu đề bài viết là bắt buộc.'),
    thumbnail: z.string().min(1, 'Thumbnai bài viết là bắt buộc.'),
    description: z.string().min(1, 'Mô tả bài viết là bắt buộc.'),
    content: z.string().min(1, 'Nội dung bài viết là bắt buộc.'),
    categoriesId: z.string().min(1, 'Danh mục bài viết là bắt buộc.'),
    tags: z
        .array(
            z.object({
                id: z.string(),
                text: z.string(),
            })
        )
        .min(1, 'Tag bài viết là bắt buộc.'),
    isPublished: z.boolean().default(true),
});

export type BlogSchema = z.infer<typeof blogSchema>;
