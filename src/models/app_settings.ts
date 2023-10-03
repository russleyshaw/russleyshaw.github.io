import { makeAutoObservable } from "mobx";
import { LocalStorageModel } from "./local_storage_model";
import { useContext } from "react";

import { createContext } from "react";
import { THEMES, Theme, withSystemTheme } from "../lib/theme";
import { parseDate } from "../lib/date";

export class AppSettings {
    isSystemDarkMode: boolean;
    theme = new LocalStorageModel<Theme>({
        key: "theme",
        defaultValue: () => Theme.SYSTEM,
        serialize: value => value,
        deserialize: value => THEMES.find(theme => theme === value) ?? Theme.SYSTEM,
    });

    lastViewedChangelog = new LocalStorageModel<string>({
        key: "lastViewedChangelog",
        defaultValue: () => "",
        serialize: value => value,
        deserialize: value => value,
    });

    lastAcceptedEulaCrc = new LocalStorageModel<string>({
        key: "lastAcceptedEulaCrc",
        defaultValue: () => "",
        serialize: value => value,
        deserialize: value => value,
    });

    lastAcceptedEulaDate = new LocalStorageModel<Date | null>({
        key: "lastAcceptedEulaDate",
        defaultValue: () => null,
        serialize: value => value?.toString() ?? "null",
        deserialize: value => parseDate(value),
    });

    constructor() {
        this.isSystemDarkMode = withSystemTheme(isDarkMode => {
            this.isSystemDarkMode = isDarkMode;
        });

        makeAutoObservable(this, {}, { autoBind: true });
    }

    get isDarkMode(): boolean {
        if (this.theme.value === Theme.SYSTEM) {
            return this.isSystemDarkMode;
        } else {
            return this.theme.value === Theme.DARK;
        }
    }

    setTheme(theme: Theme) {
        this.theme.setValue(theme);
    }

    setLastViewedChangelog(version: string) {
        this.lastViewedChangelog.setValue(version);
    }

    setEulaViewed(crc: string) {
        this.lastAcceptedEulaCrc.setValue(crc);
        this.lastAcceptedEulaDate.setValue(new Date());
    }
}

export const AppSettingsContext = createContext<AppSettings>(undefined!);

export function useAppSettings() {
    return useContext(AppSettingsContext);
}
