/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      /* NOTE: 默认使用的字体名称 */
      sans: 'Roboto Mono, monospace'
    },
    extend: {
      fontSize: {
        huge: ['80rem', { lineHeight: '1' }]
      },
      height: {
        screen: '100dvh'
      }
    }
  },
  plugins: []
}
