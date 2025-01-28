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
