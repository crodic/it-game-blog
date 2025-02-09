'use server';

import { sendWelcomeEmail } from '@/actions/send-mail';
import { prisma } from '@/lib/prisma';

const validateEmail = (email: string) => {
    const re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

export const subscribe = async (prevState: any, formData: FormData) => {
    const data = Object.fromEntries(formData) as { email: string };

    if (!validateEmail(data.email)) {
        return {
            error: 'Email không hợp lệ.',
        };
    }

    const findSubscribe = await prisma.subscribe.findUnique({ where: { email: data.email } });
    if (findSubscribe) {
        return {
            error: 'Địa chỉ email đã đăng ký.',
        };
    }

    await prisma.subscribe.create({ data: { email: data.email } });

    const result = await sendWelcomeEmail({
        name: data.email.split('@')[0],
        email: data.email,
    });

    if (!result.success) {
        return {
            error: 'Có lỗi xảy ra, vui lòng thử lại sau.',
        };
    }

    return { message: 'Đăng ký thành công.' };
};
