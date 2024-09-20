/** @type {import('next').NextConfig} */
const nextConfig = {
  // images: {
  //   domains: ["lh3.googleusercontent.com", "utfs.io"],
  // },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "utfs.io",
        port: "",
      },
    ],
  },
  devIndicators: {
    appIsrStatus: false,
  },
};

export default nextConfig;
