import { observer } from "mobx-react";

import { APP_DISPLAY_NAME } from "../config";
import { NavLink } from "react-router-dom";
import { ThemeSelect } from "./ThemeSelect";

import styles from "./Navbar.module.css";

export const Navbar = observer(() => {
    return (
        <div className={styles.root}>
            <div>
                <NavLink className={styles.siteTitle} to="/">
                    {APP_DISPLAY_NAME}
                </NavLink>
            </div>

            <div>
                <ThemeSelect />
            </div>
        </div>
    );
});
