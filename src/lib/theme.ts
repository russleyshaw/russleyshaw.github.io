import { Classes } from "@blueprintjs/core";
import { useEffect } from "react";

export enum Theme {
    SYSTEM = "system",
    DARK = "dark",
    LIGHT = "light",
}

export const THEMES = [Theme.SYSTEM, Theme.DARK, Theme.LIGHT];

export function withSystemTheme(onChange: (isDarkMode: boolean) => void): boolean {
    const darkModeMq = window.matchMedia("(prefers-color-scheme: dark)");

    const isSystemDarkMode = darkModeMq.matches;
    darkModeMq.addEventListener("change", event => {
        const isDarkMode = event.matches;
        onChange(isDarkMode);
    });

    return isSystemDarkMode;
}

export function useDarkModeClasses(isDarkMode: boolean) {
    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add(Classes.DARK);
            document.getElementById("root")?.classList.add(Classes.DARK);
        } else {
            document.body.classList.remove(Classes.DARK);
            document.getElementById("root")?.classList.remove(Classes.DARK);
        }
    }, [isDarkMode]);
}
