import { Button, ButtonGroup } from "@blueprintjs/core";
import { observer } from "mobx-react";
import { Theme } from "../lib/theme";

export interface ThemeButtonsProps {
    fill?: boolean;
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

export const ThemeButtons = observer((props: ThemeButtonsProps) => {
    const { theme, setTheme, fill } = props;

    return (
        <ButtonGroup fill={fill}>
            <Button
                active={theme === Theme.SYSTEM}
                icon="automatic-updates"
                text="System"
                title="System"
                onClick={() => setTheme(Theme.SYSTEM)}
            />
            <Button
                active={theme === Theme.LIGHT}
                icon="lightbulb"
                text="Light"
                title="Light"
                onClick={() => setTheme(Theme.LIGHT)}
            />
            <Button
                active={theme === Theme.DARK}
                icon="moon"
                text="Dark"
                title="Dark"
                onClick={() => setTheme(Theme.DARK)}
            />
        </ButtonGroup>
    );
});
