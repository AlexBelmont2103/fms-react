/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");
export default {
  important: true,
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
            background:"#5C4082",
            foreground:"#ffffff",
            primary: {
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
              100: "#F7F7F7",
              200: "#EFEFEF",
              300: "#D1D1D1",
              400: "#A3A3A3",
              500: "#666666",
              600: "#574A4B",
              700: "#493337",
              800: "#3B2027",
              900: "#30131D",
              DEFAULT: "#666666",
              foreground: "#ffffff",
            },
            success: {
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
            warning: {
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
            danger: {
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
        "purple-light": {
          extend: "light",
          colors: {
            background:"#254EDB",
            primary: {
              100: "#D6E4FF",
              200: "#ADC8FF",
              300: "#84A9FF",
              400: "#6690FF",
              500: "#3366FF",
              600: "#254EDB",
              700: "#1939B7",
              800: "#102693",
              900: "#091A7A",
              DEFAULT: "#3366FF",
              foreground: "#ffffff",
            },
            secondary: {
              100: "#D9F0FE",
              200: "#B4DEFE",
              300: "#8EC8FE",
              400: "#72B4FD",
              500: "#4494FC",
              600: "#3172D8",
              700: "#2255B5",
              800: "#153B92",
              900: "#0D2878",
              DEFAULT: "#4494FC",
              foreground: "#ffffff",
            },
            success: {
              100: "#EDFCD6",
              200: "#D7FAAE",
              300: "#B7F183",
              400: "#96E361",
              500: "#69D132",
              600: "#4DB324",
              700: "#349619",
              800: "#20790F",
              900: "#126409",
              DEFAULT: "#69D132",
              foreground: "#ffffff",
            },
            warning: {
              100: "#FFF4CC",
              200: "#FFE699",
              300: "#FFD466",
              400: "#FFC23F",
              500: "#FFA500",
              600: "#DB8500",
              700: "#B76900",
              800: "#934F00",
              900: "#7A3D00",
              DEFAULT: "#FFA500",
              foreground: "#ffffff",
            },
            danger: {
              100: "#FFE6D4",
              200: "#FFC7AA",
              300: "#FFA07F",
              400: "#FF7C60",
              500: "#FF402B",
              600: "#DB221F",
              700: "#B7151F",
              800: "#930D21",
              900: "#7A0821",
              DEFAULT: "#FF402B",
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
