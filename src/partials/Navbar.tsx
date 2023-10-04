import { Navbar as BpNavbar, Alignment, Button } from "@blueprintjs/core";
import { observer } from "mobx-react";
import { useIsSettingsDrawerOpen } from "./SettingsDrawer";

import { APP_DISPLAY_NAME } from "../config";
import { NavLink } from "react-router-dom";

export const Navbar = observer(() => {
    const [, setSettingsOpen] = useIsSettingsDrawerOpen();

    return (
        <BpNavbar>
            <BpNavbar.Group align={Alignment.LEFT}>
                <BpNavbar.Heading>
                    <NavLink to="/">{APP_DISPLAY_NAME}</NavLink>
                </BpNavbar.Heading>
                <BpNavbar.Divider />
            </BpNavbar.Group>

            <BpNavbar.Group align={Alignment.RIGHT}>
                <Button minimal icon="cog" onClick={() => setSettingsOpen(true)} />
            </BpNavbar.Group>
        </BpNavbar>
    );
});
