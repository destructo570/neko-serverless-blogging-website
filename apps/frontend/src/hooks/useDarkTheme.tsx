import { useTheme } from "next-themes";

const useDarkTheme = () => {
  const { theme } = useTheme();
  return theme === "dark";
};

export default useDarkTheme;
