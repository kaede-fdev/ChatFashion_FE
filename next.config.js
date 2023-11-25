/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "res.cloudinary.com",
            port: "",
            pathname: "/dy1uuo6ql/**",
          },
          {
            protocol: "https",
            hostname: "firebasestorage.googleapis.com",
            port: "",
            pathname: "/v0/b/**"
          }
        ],
      },
}

module.exports = nextConfig
