/** @type {import('next').NextConfig} */
const nextConfig = {
    i18n: (await import('./next-i18next.config.js')).i18n
};

export default nextConfig;
