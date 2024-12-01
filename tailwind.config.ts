import { Config } from 'tailwindcss';

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}", // รวมไฟล์ทั้งหมดที่อยู่ในโฟลเดอร์ app
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
