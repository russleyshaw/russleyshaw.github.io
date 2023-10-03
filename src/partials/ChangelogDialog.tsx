import { Dialog, DialogBody } from "@blueprintjs/core";
import { marked } from "marked";
import { observer } from "mobx-react";
import { styled } from "styled-components";
import CHANGELOG_RAW from "../../CHANGELOG.md?raw";
import { APP_NAME, APP_VERSION } from "../config";
import { useClosingDelay } from "../lib/react";
import { useBoolSearchParam } from "../lib/router";
import { useAppSettings } from "../models/app_settings";
import { QueryParamKey } from "../router";

const CHANGELOG = marked(CHANGELOG_RAW);

const MyDialog = styled(Dialog)`
    width: 700px;
`;

const RootDiv = styled.div`
    padding: 1rem;
`;

export const ChangelogDialog = observer(() => {
    const appSettings = useAppSettings();

    const [isOpen, setIsOpen] = useIsChangelogOpen();
    const needsOpen = appSettings.lastViewedChangelog.value !== APP_VERSION;

    if (needsOpen && !isOpen) {
        setIsOpen(true);
    }

    const onClose = () => {
        appSettings.setLastViewedChangelog(APP_VERSION);
        setIsOpen(false);
    };

    const isVisible = useClosingDelay(isOpen);

    if (!isVisible) {
        return null;
    }

    return (
        <MyDialog
            isOpen={isOpen}
            isCloseButtonShown
            canEscapeKeyClose
            canOutsideClickClose
            onClose={onClose}
            title={`${APP_NAME} v${APP_VERSION}`}
        >
            <DialogBody>
                <RootDiv>
                    <div dangerouslySetInnerHTML={{ __html: CHANGELOG }} />
                </RootDiv>
            </DialogBody>
        </MyDialog>
    );
});

export function useIsChangelogOpen() {
    return useBoolSearchParam(QueryParamKey.CHANGELOG_DIALOG);
}
