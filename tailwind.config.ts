import type { Config } from "tailwindcss";

const config: Config = {
  content: {
    files: [
      "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    safelist: [
      'md:flex', 'md:block', 'md:hidden', 'hidden', 'block', 'flex', 'space-x-6', 'text-yellow-400', 'hover:text-yellow-400', 'transition-colors', 'bg-red-500', 'bg-green-500', 'bg-blue-500', 'text-center', 'text-left', 'text-right', 'w-full', 'container', 'mx-auto', 'py-3', 'px-4', 'z-50', 'sticky', 'top-0', 'justify-between', 'items-center', 'font-bold', 'rounded-lg', 'hover:bg-yellow-500', 'text-gray-900', 'text-gray-200', 'text-gray-300'
    ],
  },
  theme: {
    extend: {
      colors: {
        brand: "rgb(251 191 36)", // Add your custom brand color
      },
    },
  },
  plugins: [],
};

export default config;