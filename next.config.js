/** @type {import("next").NextConfig} */
const nextConfig = {
    swcMinify: true,
    images: {
        domains: [ "cdn.prodigygame.com" ],
    }
}

module.exports = nextConfig
