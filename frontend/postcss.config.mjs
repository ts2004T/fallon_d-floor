/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    "@csstools/postcss-global-data": {
      files: ["./app/breakpoints.css"],
    },
    "postcss-custom-media": {},
    tailwindcss: {},
  },
};

export default config;
