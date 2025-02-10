'use server';

import { prisma } from '@/lib/prisma';
import { ContributeSchema } from '@/validations/contribute.schema';

export const sendContribution = async (values: ContributeSchema) => {
    const { email, content } = values;
    const result = await prisma.contributes.create({
        data: {
            email,
            content,
        },
    });

    if (!result) {
        return {
            status: 500,
            message: 'Failed to send contribution',
        };
    }

    return {
        status: 200,
        message: 'Contribution sent successfully',
    };
};
