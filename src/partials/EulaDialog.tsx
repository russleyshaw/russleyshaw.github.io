import { Button, Callout, Dialog, DialogBody, DialogFooter, Intent } from "@blueprintjs/core";
import { marked } from "marked";
import { observer } from "mobx-react";
import { styled } from "styled-components";
import EULA_RAW from "../../EULA.md?raw";
import { useClosingDelay } from "../lib/react";
import { useBoolSearchParam } from "../lib/router";
import { useAppSettings } from "../models/app_settings";
import { QueryParamKey } from "../router";
import { crc32 } from "../lib/crc";

const EULA_CRC = crc32(EULA_RAW);
const EULA = marked(EULA_RAW);

const MyDialog = styled(Dialog)`
    width: 700px;
`;

const RootDiv = styled.div`
    display: flex;
    flex-direction: column;

    padding: 1rem;

    gap: 1rem;
`;

export const EulaDialog = observer(() => {
    const appSettings = useAppSettings();

    const [isOpen, setIsOpen] = useIsEulaOpen();
    const isEulaAccepted = appSettings.lastAcceptedEulaCrc.value === EULA_CRC;

    if (!isEulaAccepted && !isOpen) {
        setIsOpen(true);
    }

    const onAccept = () => {
        appSettings.setEulaViewed(EULA_CRC);
        setIsOpen(false);
    };

    const isVisible = useClosingDelay(isOpen);

    if (!isVisible) {
        return null;
    }

    return (
        <MyDialog isOpen={isOpen}>
            <DialogBody>
                <RootDiv>
                    {appSettings.lastAcceptedEulaDate.value != null && (
                        <Callout intent={isEulaAccepted ? "primary" : "warning"}>
                            You last accepted the EULA on{" "}
                            {appSettings.lastAcceptedEulaDate.value.toLocaleString()}
                        </Callout>
                    )}

                    {!isEulaAccepted && (
                        <Callout intent="danger">
                            Please agree to the license agreement before using this software.
                        </Callout>
                    )}
                    <div dangerouslySetInnerHTML={{ __html: EULA }} />
                </RootDiv>
            </DialogBody>
            <DialogFooter
                actions={<Button intent={Intent.PRIMARY} text="I Accept" onClick={onAccept} />}
            />
        </MyDialog>
    );
});

export function useIsEulaOpen() {
    return useBoolSearchParam(QueryParamKey.EULA_DIALOG);
}
