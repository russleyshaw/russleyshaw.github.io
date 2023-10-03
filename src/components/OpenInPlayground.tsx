import { Button } from "@blueprintjs/core";
import { observer } from "mobx-react";
import { compressToEncodedURIComponent } from "lz-string";
import { useCallback } from "react";

interface OpenInPlaygroundProps  {
    code: string;
    minimal: boolean;
}

export const OpenInPlayground = observer((props: OpenInPlaygroundProps) => {
    const {code, minimal} = props;

    const onClick = useCallback(() => {
        const encoded = compressToEncodedURIComponent(code);
        const url = `https://www.typescriptlang.org/play?#code/${encoded}`
        window.open(url);
    }, [code]);

    return <Button minimal={minimal} text="Playground" icon="share" onClick={onClick} />
})