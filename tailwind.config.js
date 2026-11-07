/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");

module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}", flowbite.content()],
    theme: {
        extend: {
            colors: {
                primary: "#264653",
                secondary: "#111D29",
                lightGrey: "#F7F7F7",
                charcolGrey: "#3C3C3C",
            },
        },
    },
    plugins: [flowbite.plugin()],
};
