import { useCallback } from "react";
import { ColorScheme, ThemeColor, useTheme } from "./components/theme-provider";
import { Button } from "./components/ui/button";

export default function ButtonPage() {
  const theme = useTheme();
  const setScheme = useCallback(
    (scheme: ColorScheme) => {
      return () => theme.setTheme({ ...theme.theme, colorScheme: scheme });
    },
    [theme],
  );

  const setColor = useCallback(
    (color: ThemeColor) => {
      return () => theme.setTheme({ ...theme.theme, color: color });
    },
    [theme],
  );
  
  return (
    <div className="flex gap-2">
      <Button onClick={setScheme("system")}>System</Button>
      <Button onClick={setScheme("light")}>Light</Button>
      <Button onClick={setScheme("dark")}>Dark</Button>
      <Button onClick={setColor("default")}>Default</Button>
      <Button className="green" onClick={setColor("green")}>Green</Button>
      <Button className="orange" onClick={setColor("orange")}>Orange</Button>
      <Button className="yellow"onClick={setColor("yellow")}>Yellow</Button>
    </div>
  );
}
