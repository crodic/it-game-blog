/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { prisma } from '@/lib/prisma';
import { CategorySchema } from '@/validations/category.schema';
import { Prisma } from '@prisma/client';

export const createCategory = async (values: CategorySchema) => {
    try {
        const data = await prisma.category.create({
            data: values,
        });

        return { error: null, data };
    } catch (error: any) {
        console.error(error);
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                return { error: `Danh mục ${values.name} đã tồn tại`, data: null };
            } else {
                return { error: error.message, data: null };
            }
        } else {
            return { error: error.message, data: null };
        }
    }
};

export const deleteCategory = async (id: string) => {
    try {
        const blogsOnCategory = await prisma.blog.findMany({
            where: {
                categoriesId: id,
            },
        });

        if (blogsOnCategory.length > 0) {
            return { error: 'Không thể xoá danh mục này', message: null };
        }

        await prisma.category.delete({
            where: {
                id,
            },
        });

        return { error: null, message: 'Xoá danh mục thành công' };
    } catch (error: any) {
        return { error: error.message, message: null };
    }
};

export const updateCategory = async ({ id, values }: { id: string; values: CategorySchema }) => {
    try {
        const data = await prisma.category.update({
            where: {
                id,
            },
            data: values,
        });

        return { error: null, data };
    } catch (error: any) {
        console.error(error);
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                return { error: `Danh mục ${values.name} tồn tại`, data: null };
            } else {
                return { error: error.message, data: null };
            }
        } else {
            return { error: error.message, data: null };
        }
    }
};
