import { Drawer, DrawerSize } from "@blueprintjs/core";
import { observer } from "mobx-react";
import { styled } from "styled-components";
import { ThemeButtons } from "../components/ThemeButtons";
import { useClosingDelay } from "../lib/react";
import { useBoolSearchParam } from "../lib/router";
import { useAppSettings } from "../models/app_settings";
import { QueryParamKey } from "../router";

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
            </RootDiv>
        </Drawer>
    );
});

export function useIsSettingsDrawerOpen() {
    return useBoolSearchParam(QueryParamKey.SETTINGS_DRAWER);
}
