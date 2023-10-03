import { Button, Drawer, DrawerSize } from "@blueprintjs/core";
import { observer } from "mobx-react";
import { styled } from "styled-components";
import { ThemeButtons } from "../components/ThemeButtons";
import { APP_VERSION, SHOW_CHANGELOG, SHOW_EULA } from "../config";
import { useClosingDelay } from "../lib/react";
import { useBoolSearchParam } from "../lib/router";
import { useAppSettings } from "../models/app_settings";
import { QueryParamKey } from "../router";
import { useIsChangelogOpen } from "./ChangelogDialog";
import { useIsEulaOpen } from "./EulaDialog";

const RootDiv = styled.div`
    display: flex;
    flex-direction: column;

    padding: 0.5rem;

    gap: 1rem;
`;

export const SettingsDrawer = observer(() => {
    const appSettings = useAppSettings();

    const [isOpen, setIsOpen] = useIsSettingsDrawerOpen();
    const isVisible = useClosingDelay(isOpen);

    const [, setIsChangelogOpen] = useIsChangelogOpen();
    const [, setIsEulaOpen] = useIsEulaOpen();

    if (!isVisible) {
        return null;
    }

    return (
        <Drawer size={DrawerSize.SMALL} isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <RootDiv>
                <ThemeButtons
                    fill
                    theme={appSettings.theme.value}
                    setTheme={appSettings.setTheme}
                />

                {SHOW_EULA && <Button text="EULA" onClick={() => setIsEulaOpen(true)} />}
                {SHOW_CHANGELOG && (
                    <Button
                        text={`Changelog v${APP_VERSION}`}
                        onClick={() => setIsChangelogOpen(true)}
                    />
                )}
            </RootDiv>
        </Drawer>
    );
});

export function useIsSettingsDrawerOpen() {
    return useBoolSearchParam(QueryParamKey.SETTINGS_DRAWER);
}
