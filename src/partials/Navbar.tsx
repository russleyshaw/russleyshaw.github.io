import { Navbar as BpNavbar, Alignment, Button } from "@blueprintjs/core";
import { observer } from "mobx-react";

import { APP_DISPLAY_NAME } from "../config";
import { NavLink } from "react-router-dom";
import { ThemeSelect } from "./ThemeSelect";

import styles from "./Navbar.module.css";

export const Navbar = observer(() => {
    return (
        <BpNavbar>
            <BpNavbar.Group align={Alignment.LEFT}>
                <BpNavbar.Heading>
                    <NavLink className={styles.siteTitle} to="/">
                        {APP_DISPLAY_NAME}
                    </NavLink>
                </BpNavbar.Heading>
                <BpNavbar.Divider />
            </BpNavbar.Group>

            <BpNavbar.Group align={Alignment.RIGHT}>
                <ThemeSelect />
            </BpNavbar.Group>
        </BpNavbar>
    );
});
