"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { SunLight, HalfMoon } from "iconoir-react";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const ICON_SIZE = 16;

  return (
    <Button variant="ghost" size="sm" onClick={toggleTheme}>
      {theme === "dark" ? (
        <SunLight/>
      ) : (
        <HalfMoon/>
      )}
    </Button>
  );
};

export { ThemeSwitcher };
