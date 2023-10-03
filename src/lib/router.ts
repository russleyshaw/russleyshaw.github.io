import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

export function useBoolSearchParam(key: string): [boolean, (value: boolean) => void] {
    const [searchParams, setSearchParams] = useSearchParams();

    const value = searchParams.has(key);
    const setValue = useCallback(
        (value: boolean) => {
            setSearchParams((prev) => {
                if (value) {
                    prev.set(key, "");
                } else {
                    prev.delete(key);
                }

                return prev;
            });
        },
        [key, setSearchParams],
    );

    return [value, setValue];
}
