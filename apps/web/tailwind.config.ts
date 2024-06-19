import sharedConfig from "@repo/ui/tailwind.config";
import { Config } from "tailwindcss";

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
      margin: {
        nav: "60px",
        "nav-2x": "120px",
      },
      fontSize: {
        xs: "0.75rem",
      },
    },
  },
};

export default config;
