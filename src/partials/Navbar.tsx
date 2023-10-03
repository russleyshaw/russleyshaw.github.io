import { Navbar as BpNavbar, Alignment, Button } from "@blueprintjs/core";
import { observer } from "mobx-react";
import { useIsSettingsDrawerOpen } from "./SettingsDrawer";
import { NavButton } from "../components/NavButton";
import { APP_DISPLAY_NAME } from "../config";

export const Navbar = observer(() => {
    const [, setSettingsOpen] = useIsSettingsDrawerOpen();

    return (
        <BpNavbar>
            <BpNavbar.Group align={Alignment.LEFT}>
                <BpNavbar.Heading>{APP_DISPLAY_NAME}</BpNavbar.Heading>
                <BpNavbar.Divider />
                <NavButton minimal icon="home" text="Home" to="/" />
            </BpNavbar.Group>

            <BpNavbar.Group align={Alignment.RIGHT}>
                <Button minimal icon="cog" onClick={() => setSettingsOpen(true)} />
            </BpNavbar.Group>
        </BpNavbar>
    );
});
