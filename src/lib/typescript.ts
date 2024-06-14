"use client";

import { createDefaultMapFromCDN, createSystem, createVirtualCompilerHost } from "@typescript/vfs";
import ts from "typescript";
import lzstring from "lz-string";

const compilerOptions: ts.CompilerOptions = {
    strict: true,
};

export async function getTypeScriptErrors(code: string, filename?: string) {
    const myFilename = filename ?? "index.ts";
    const fsMap = await createDefaultMapFromCDN(compilerOptions, ts.version, true, ts, lzstring);
    fsMap.set(myFilename, code);

    const system = createSystem(fsMap);
    const host = createVirtualCompilerHost(system, compilerOptions, ts);

    const program = ts.createProgram({
        rootNames: [myFilename],
        options: compilerOptions,
        host: host.compilerHost,
    });

    const emitResult = program.emit();
    const allDiagnostics = ts.getPreEmitDiagnostics(program).concat(emitResult.diagnostics);

    return allDiagnostics.map((diagnostic) => {
        if (diagnostic.file) {
            const { line, character } = ts.getLineAndCharacterOfPosition(
                diagnostic.file,
                // biome-ignore lint/style/noNonNullAssertion: <explanation>
                diagnostic.start!,
            );
            const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n");
            return `${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`;
        }
        return ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n");
    });
}
