import { observer } from "mobx-react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../partials/Navbar";

import styles from "./RootLayout.module.css";

export const RootLayout = observer(() => {
    return (
        <div className={styles.root}>
            <Navbar />
            <Outlet />
        </div>
    );
});
