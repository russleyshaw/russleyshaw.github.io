/** @type {import('tailwindcss').Config} */

import colors from "tailwindcss/colors";

export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    darkMode: "class",
    theme: {
        colors: {
            ...colors,

            platinum: {
                DEFAULT: "#DFE1E2",
            },
            davyGray: {
                DEFAULT: "#515256",
            },
            jet: {
                DEFAULT: "#403E4B",
            },
            raisin: {
                DEFAULT: "#312F3B",
            },
            "fuchsia-blue": {
                50: "#f6f5fd",
                100: "#efedfa",
                200: "#e0def6",
                300: "#c9c3ef",
                400: "#ada0e5",
                500: "#917ad8",
                600: "#7f5ecb",
                700: "#6e4ab7",
                800: "#5b3e99",
                900: "#4c347e",
                950: "#302055",
            },
            orchid: {
                50: "#fcf6fd",
                100: "#f7edfa",
                200: "#efd9f5",
                300: "#e4bbec",
                400: "#ce82da",
                500: "#c068cd",
                600: "#a549b0",
                700: "#893a91",
                800: "#723177",
                900: "#602c63",
                950: "#3d133f",
            },

            "sorrell-brown": {
                50: "#f9f7f3",
                100: "#f2ede2",
                200: "#e4d9c4",
                300: "#cbb48e",
                400: "#c0a077",
                500: "#b38a5c",
                600: "#a57751",
                700: "#8a6144",
                800: "#704f3c",
                900: "#5b4133",
                950: "#30211a",
            },
        },

        extends: {
            fontFamily: {
                sans: ["Inter", "sans-serif"],
            },
        },
    },
};
