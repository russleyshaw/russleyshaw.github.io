import { observer } from "mobx-react";

import { APP_DISPLAY_NAME } from "../config";
import { ThemeSelect } from "./ThemeSelect";

import styles from "./Navbar.module.css";
import { Link } from "@tanstack/react-router";

export const Navbar = observer(() => {
    return (
        <div className={styles.root}>
            <div>
                <Link className={styles.siteTitle} to="/">
                    {APP_DISPLAY_NAME}
                </Link>
            </div>

            <div>
                <ThemeSelect />
            </div>
        </div>
    );
});
