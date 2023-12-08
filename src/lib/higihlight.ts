import { autorun } from "mobx";
import { THEME_STORE } from "../models/theme";

const lightCss = () => import("highlight.js/styles/github.css?raw");
const darkCss = () => import("highlight.js/styles/github-dark.css?raw");

const styleEl = document.createElement("style");
document.head.appendChild(styleEl);

autorun(() => {
    const selectedCss = THEME_STORE.isDarkMode ? darkCss : lightCss;

    selectedCss().then(css => {
        styleEl.innerText = css.default;
    });
});
