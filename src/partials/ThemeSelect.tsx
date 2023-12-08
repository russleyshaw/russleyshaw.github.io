import { Button, ButtonGroup } from "@blueprintjs/core";
import { observer } from "mobx-react";
import { THEME_STORE, ThemeSetting } from "../models/theme";

export const ThemeSelect = observer(() => {
    const setting = THEME_STORE.userSetting.value;

    return (
        <ButtonGroup>
            <Button
                active={setting === ThemeSetting.SYSTEM}
                icon="desktop"
                title="System"
                onClick={() => THEME_STORE.setUserSetting(ThemeSetting.SYSTEM)}
            />
            <Button
                active={setting === ThemeSetting.LIGHT}
                icon="lightbulb"
                title="Light"
                onClick={() => THEME_STORE.setUserSetting(ThemeSetting.LIGHT)}
            />
            <Button
                active={setting === ThemeSetting.DARK}
                icon="moon"
                title="Dark"
                onClick={() => THEME_STORE.setUserSetting(ThemeSetting.DARK)}
            />
        </ButtonGroup>
    );
});
