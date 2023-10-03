import { useEffect, useRef, useState, useCallback } from "react";

/**
 * Delays the closing of a component by a specified amount of time.
 * @param isOpen
 * @param delayMs
 * @returns
 */
export function useClosingDelay(isOpen: boolean, delayMs: number = 1000): boolean {
    const [value, setValue] = useState(isOpen);
    const timeout = useRef<number>();

    useEffect(() => {
        if (isOpen) {
            // Open immediately
            setValue(true);
        } else {
            if (timeout.current) {
                clearTimeout(timeout.current);
            }
            // Close after delay
            timeout.current = setTimeout(() => setValue(false), delayMs);
            return () => {
                clearTimeout(timeout.current);
            };
        }
    }, [isOpen]);

    return value;
}

export function useLocalStorageBool(key: string) {
    const [value, setValue] = useState(() => {
        const value = localStorage.getItem(key);
        return value === "true";
    });

    useEffect(() => {
        const value = localStorage.getItem(key);
        setValue(value === "true");
    }, [key]);

    useEffect(() => {
        window.addEventListener("storage", e => {
            if (e.key === key) {
                const value = localStorage.getItem(key);
                setValue(value === "true");
            }
        });

        return () => {
            window.removeEventListener("storage", () => {});
        };
    }, []);

    const setBoolValue = useCallback(
        (newValue: boolean) => {
            setValue(newValue);
            localStorage.setItem(key, newValue ? "true" : "false");
        },
        [key],
    );

    return [value, setBoolValue] as const;
}
