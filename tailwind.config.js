/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    nextui({
      layout: {
        spacingUnit: 3, 
        disabledOpacity: 0.5, 
        dividerWeight: "1px", 
        fontSize: {
          tiny: "0.75rem", // text-tiny
          small: "0.875rem", // text-small
          medium: "1rem", // text-medium
          large: "1.125rem", // text-large
        },
        lineHeight: {
          tiny: "1rem", // text-tiny
          small: "1.25rem", // text-small
          medium: "1.5rem", // text-medium
          large: "1.75rem", // text-large
        },
        radius: {
          small: "8px", // rounded-small
          medium: "12px", // rounded-medium
          large: "14px", // rounded-large
        },
        borderWidth: {
          small: "1px", // border-small
          medium: "2px", // border-medium (default)
          large: "3px", // border-large
        },
      },
      themes: {
        "purple-dark": {
          extend: "dark",
          colors: {
            background: "#0D001A",
            foreground: "#ffffff",
            primary:{
              100: "#F2E4F9",
              200: "#E4CBF4",
              300: "#C7A7E0",
              400: "#A384C1",
              500: "#765898",
              600: "#5C4082",
              700: "#442C6D",
              800: "#2F1C58",
              900: "#201048",
              DEFAULT: "#5C4082",
              foreground: "#ffffff",
            },
            secondary: {
              100: "#F2F2F2",
              200: "#E5E5E5",
              300: "#B2B2B2",
              400: "#666666",
              500: "#000000",
              600: "#000000",
              700: "#000000",
              800: "#000000",
              900: "#000000",
              DEFAULT: "#666666",
              foreground: "#ffffff",
            },
            succes:{
              100: "#E8FCDE",
              200: "#CDFABD",
              300: "#A7F099",
              400: "#83E27B",
              500: "#52d053",
              600: "#3BB247",
              700: "#29953D",
              800: "#1A7833",
              900: "#0F632D",
              DEFAULT: "#3BB247",
              foreground: "#ffffff",
            },
            warning:{
              100: "#FDEFCD",
              200: "#FCDA9C",
              300: "#F7BE6A",
              400: "#F0A144",
              500: "#e6770b",
              600: "#C55C08",
              700: "#A54405",
              800: "#852F03",
              900: "#6E2102",
              DEFAULT: "#C55C08",
              foreground: "#ffffff",
            },
            danger:{
              100: "#FCE2CD",
              200: "#FABF9D",
              300: "#F1926B",
              400: "#E46745",
              500: "#d3290f",
              600: "#B5140A",
              700: "#97070B",
              800: "#7A0411",
              900: "#650214",
              DEFAULT: "#B5140A",
              foreground: "#ffffff",
            },
            focus: "#F182F6",
          },
          layout: {
            disabledOpacity: "0.3",
            radius: {
              small: "4px",
              medium: "6px",
              large: "8px",
            },
            borderWidth: {
              small: "1px",
              medium: "2px",
              large: "3px",
            },
          },
        },
      },
    }),
  ],
};
