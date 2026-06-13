/** @type {import('next').NextConfig} */
const nextConfig = {
  // Exporta el sitio como HTML/CSS/JS estatico en la carpeta "out".
  // Capacitor empaqueta esa carpeta dentro de la APK.
  output: 'export',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // Obligatorio con output: 'export' (no hay servidor que optimice imagenes).
    unoptimized: true,
  },
}

export default nextConfig
