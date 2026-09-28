const sharedConfig = require("@velocity/tailwind-config");

/** @type {import('tailwindcss').Config} */
module.exports = {
    ...sharedConfig,
    content: [
        "./src/**/*.{js,ts,jsx,tsx}",
        "./app/**/*.{js,ts,jsx,tsx}",
        "../../packages/**/*.{js,ts,jsx,tsx}",
        "../../packages/**/*.css",
    ],
};