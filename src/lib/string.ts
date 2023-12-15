import { compressToEncodedURIComponent } from "lz-string";

/**
 * Remove all empty lines from the beginning and end of a string.
 * @param text
 * @returns
 */
export function trimLines(text: string) {
    return text.replace(/^\s*\n/, "").replace(/\n\s*$/, "");
}

export function codeToTsPlaygroundUrl(code: string) {
    const encoded = compressToEncodedURIComponent(code);
    const url = `https://www.typescriptlang.org/play?#code/${encoded}`;
    return url;
}
