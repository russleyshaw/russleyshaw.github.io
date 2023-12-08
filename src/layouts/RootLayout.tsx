import { observer } from "mobx-react";
import { Outlet } from "react-router-dom";
import styled, { DefaultTheme, ThemeProvider, createGlobalStyle, css } from "styled-components";
import { Navbar } from "../partials/Navbar";
import { THEME_STORE } from "../models/theme";

const DARK_MODE_CSS = css`
    background-color: #2f343c;
`;

const GlobalStyle = createGlobalStyle`
    html, body, #root {
        height: 100%;
        width: 100%;

        margin: 0;
        padding: 0;
    }


    h1, h2, h3, h4, h5, h6 {
        margin: 0;
        padding: 0;
    }

    code, pre, p {
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
    const styledTheme: DefaultTheme = {
        isDarkMode: THEME_STORE.isDarkMode,
    };

    return (
        <ThemeProvider theme={styledTheme}>
            <GlobalStyle />
            <RootDiv>
                <Navbar />
                <Outlet />
            </RootDiv>
        </ThemeProvider>
    );
});
