import type { Config } from "tailwindcss";
import tailwindAnimate from "tailwindcss-animate";

const colors = {
  'regal-blue': {
    '50': '#f0f7ff',
    '100': '#e1effd',
    '200': '#bbdefc',
    '300': '#7fc4fa',
    '400': '#3ca7f4',
    '500': '#128be5',
    '600': '#066dc3',
    '700': '#06569e',
    '800': '#094a83',
    '900': '#0d3b66',
    '950': '#092848',
},
'outrageous-orange': {
  '50': '#fff3f1',
  '100': '#ffe5e0',
  '200': '#ffd0c7',
  '300': '#ffafa0',
  '400': '#ff8169',
  '500': '#f95738',
  '600': '#e73c1b',
  '700': '#c22f13',
  '800': '#a02a14',
  '900': '#852917',
  '950': '#481107',
},
'dandelion': {
  '50': '#fefaec',
  '100': '#fbf2ca',
  '200': '#f7e490',
  '300': '#f4d35e',
  '400': '#f0bd2f',
  '500': '#ea9e16',
  '600': '#cf7910',
  '700': '#ac5611',
  '800': '#8c4414',
  '900': '#733714',
  '950': '#421c06',
},
'cod-gray': {
  '50': '#f6f5f5',
  '100': '#e8e5e5',
  '200': '#d2cfd0',
  '300': '#b3adae',
  '400': '#8c8485',
  '500': '#71696a',
  '600': '#615959',
  '700': '#524c4d',
  '800': '#474343',
  '900': '#3e3b3b',
  '950': '#0f0e0e',
},



}

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        ...colors,
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [tailwindAnimate],
} satisfies Config;

export default config;