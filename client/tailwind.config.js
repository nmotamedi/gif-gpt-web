/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/App.tsx',
    './src/Components/Content.tsx',
    './src/Components/GifDisplay.tsx',
    './src/Components/Landing.tsx',
  ],
  theme: {
    extend: {
      fontFamily: {
        suse: ['SUSE', 'sans-serif'],
        'new-amsterdam': ['New Amsterdam', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
