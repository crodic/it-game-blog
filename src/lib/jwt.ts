/* eslint-disable @typescript-eslint/no-explicit-any */

import 'server-only';
import { jwtVerify, SignJWT } from 'jose';

const secretKey = 'feeoWXI5s1BQCf0/yjEzK7dSIaTCLirqTHd+PTtDnqI=';
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('1h')
        .sign(key);
}

export async function decrypt<T>(input: string): Promise<T | null> {
    try {
        const { payload } = await jwtVerify(input, key, {
            algorithms: ['HS256'],
        });
        return payload as T;
    } catch (error) {
        console.log(error);
        return null;
    }
}
