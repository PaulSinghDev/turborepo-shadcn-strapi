import sharedConfig from "@repo/ui/tailwind.config";
import { Config } from "tailwindcss";
import colors from "tailwindcss/colors";
import plugin from "tailwindcss/plugin";

const config: Config = {
  presets: [sharedConfig],
  content: [
    "./app/**/*.tsx",
    "../../packages/ui/src/**/*.tsx",
    "./components/**/*.tsx",
  ],
  darkMode: "selector",
  theme: {
    ...sharedConfig.theme,
    extend: {
      ...sharedConfig.theme.extend,
      fontFamily: {
        "work-sans": [
          "Work Sans",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Oxygen",
          "Ubuntu",
          "Cantarell",
          "Open Sans",
          "Helvetica Neue",
          "sans-serif",
        ],
      },
      rotate: {
        m45: "-45deg",
        m90: "-90deg",
      },
      width: {
        18: "4.5rem",
        content: "1100px",
        avatar: "75px",
      },
      maxWidth: {
        content: "1100px",
        header: "800px",
      },

      height: {
        avatar: "75px",
        nav: "60px",
      },
      padding: {
        nav: "60px",
      },
      margin: {
        nav: "60px",
        "nav-2x": "120px",
      },
      fontSize: {
        xs: "0.75rem",
      },
      backgroundImage: {
        "pink-blue":
          "linear-gradient(to left bottom, rgb(244, 114, 182), rgb(147, 197, 253))",
        "radial-pink-blue": `radial-gradient(circle at top left,  ${colors.pink[500]}, transparent), radial-gradient(circle at bottom right, ${colors.sky[500]}, transparent)`,
      },
      textShadow: {
        sm: "0 1px 2px var(--tw-shadow-color)",
        DEFAULT: "0 2px 4px var(--tw-shadow-color)",
        lg: "0 8px 16px var(--tw-shadow-color)",
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "text-shadow": (value) => ({
            textShadow: value,
          }),
        },
        { values: theme("textShadow") }
      );
    }),
  ],
};

export default config;
