/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: ['@node-rs/argon2'],
        staleTimes: {
            dynamic: 0,
        },
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'plus.unsplash.com',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
