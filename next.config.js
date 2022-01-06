/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: process.env.NODE_ENV !== 'development',
  images: {
    domains: ['i.annihil.us']
  }
}
