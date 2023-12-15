import { autorun, makeAutoObservable } from "mobx";
import { LocalStorageModel } from "./local_storage_model";

export enum ThemeSetting {
    SYSTEM = "system",
    LIGHT = "light",
    DARK = "dark",
}

export enum ThemeMode {
    LIGHT = "light",
    DARK = "dark",
}

const DARK_CLASSES = ["dark"];

export class ThemeModel {
    systemMode: ThemeMode;
    userSetting = new LocalStorageModel<ThemeSetting>({
        key: "theme",
        defaultValue: () => ThemeSetting.SYSTEM,
        serialize: value => value,
        deserialize: value =>
            Object.values(ThemeSetting).find(theme => theme === value) ?? ThemeSetting.SYSTEM,
    });

    constructor() {
        const darkModeMq = window.matchMedia("(prefers-color-scheme: dark)");

        this.systemMode = darkModeMq.matches ? ThemeMode.DARK : ThemeMode.LIGHT;
        darkModeMq.addEventListener("change", event => {
            this.setSystemMode(event.matches ? ThemeMode.DARK : ThemeMode.LIGHT);
        });

        makeAutoObservable(this, {}, { autoBind: true });

        autorun(() => {
            if (this.mode === ThemeMode.DARK) {
                document.body.classList.add(...DARK_CLASSES);
                document.documentElement.classList.add(...DARK_CLASSES);
                document.documentElement.setAttribute("data-theme", "dark");
            } else {
                document.body.classList.remove(...DARK_CLASSES);
                document.documentElement.classList.remove(...DARK_CLASSES);
                document.documentElement.setAttribute("data-theme", "light");
            }
        });
    }

    setUserSetting(setting: ThemeSetting) {
        this.userSetting.setValue(setting);
    }

    get mode() {
        if (this.userSetting.value === ThemeSetting.SYSTEM) {
            return this.systemMode;
        }

        return this.userSetting.value === ThemeSetting.DARK ? ThemeMode.DARK : ThemeMode.LIGHT;
    }

    get isDarkMode() {
        return this.mode === ThemeMode.DARK;
    }

    private setSystemMode(mode: ThemeMode) {
        this.systemMode = mode;
    }
}

export const THEME_STORE = new ThemeModel();
