import { observer } from "mobx-react";
import { THEME_STORE, ThemeSetting } from "../models/theme";

export const ThemeSelect = observer(() => {
    const setting = THEME_STORE.userSetting.value;

    return (
        <div className="button-group small">
            <button
                type="button"
                className="button"
                title="System"
                onClick={() => THEME_STORE.setUserSetting(ThemeSetting.SYSTEM)}
                data-active={setting === ThemeSetting.SYSTEM}
            >
                System
            </button>
            <button
                type="button"
                className="button"
                title="Light"
                onClick={() => THEME_STORE.setUserSetting(ThemeSetting.LIGHT)}
                data-active={setting === ThemeSetting.LIGHT}
            >
                Light
            </button>
            <button
                type="button"
                className="button"
                title="Dark"
                onClick={() => THEME_STORE.setUserSetting(ThemeSetting.DARK)}
                data-active={setting === ThemeSetting.DARK}
            >
                Dark
            </button>
        </div>
    );
});
