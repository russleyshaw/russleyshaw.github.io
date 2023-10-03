import { observer } from "mobx-react";
import { Outlet } from "react-router-dom";
import styled, { DefaultTheme, ThemeProvider, createGlobalStyle, css } from "styled-components";
import { Navbar } from "../partials/Navbar";
import { SettingsDrawer } from "../partials/SettingsDrawer";
import { AppSettings, AppSettingsContext } from "../models/app_settings";
import { useState } from "react";
import { useDarkMode } from "../lib/theme";

const DARK_MODE_CSS = css`
    background-color: #2f343c;
`;

const GlobalStyle = createGlobalStyle`
    html, body, #root {
        height: 100%;
        width: 100%;

        margin: 0;
        padding: 0;

        ${p => p.theme.isDarkMode && DARK_MODE_CSS}
    }


    h1, h2, h3, h4, h5, h6 {
        margin: 0;
        padding: 0;
    }

    code, pre {
        padding: 0;
        margin: 0;
    }

`;

const RootDiv = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
`;

export const RootLayout = observer(() => {
    const [appSettings] = useState(() => new AppSettings());

    const styledTheme: DefaultTheme = {
        isDarkMode: appSettings.isDarkMode,
    };

    useDarkMode(appSettings.isDarkMode);

    return (
        <AppSettingsContext.Provider value={appSettings}>
            <ThemeProvider theme={styledTheme}>
                <GlobalStyle />
                <RootDiv>
                    <Navbar />
                    <Outlet />
                    <SettingsDrawer />
                </RootDiv>
            </ThemeProvider>
        </AppSettingsContext.Provider>
    );
});
