/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    APP_NAME: process.env.APP_NAME,
    APP_EMAIL: process.env.APP_EMAIL,
    APP_PHONE: process.env.APP_PHONE,
    APP_ADDRESS: process.env.APP_ADDRESS,
    API_ENDPOINT: process.env.API_ENDPOINT,
    API_IMAGES: process.env.API_IMAGES,
  },
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
};

export default nextConfig;
