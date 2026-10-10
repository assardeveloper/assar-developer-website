/** Static export: the `out/` folder can be hosted anywhere (Vercel, Netlify, Firebase Hosting). */
const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
