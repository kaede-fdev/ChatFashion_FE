import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './sections/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors:{
        primaryOrange: "#ffb000",
        primaryBlack: "#1f2c43",
      },
      boxShadow: {
        primaryBlackShadow: "rgba(31, 44, 67, 0.5) 2px 10px 20px, rgba(31, 44, 67, 0.42) -3px 3px 10px;",
        primaryOrangeShadow: "rgba(255, 176, 0, 0.5) 2px 5px 15px, rgba(255, 176, 0, 0.2) -10px 0px 5px;",
        primaryShadow: "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.1) -3px 8px 10px -8px;"
      }
    },
  },
  darkMode: 'class',
  plugins: [
    require('tailwindcss-animated'),
    require('tailwind-scrollbar-hide') 
  ],
}
export default config
