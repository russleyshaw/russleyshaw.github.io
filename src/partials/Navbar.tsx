import { observer } from "mobx-react";
import { APP_DISPLAY_NAME } from "../config";
import { Link } from "@tanstack/react-router";

export const Navbar = observer(() => {
    return (
        <div className="flex flex-row items-end justify-between">
            <div>
                <Link to="/" className="text-center text-3xl font-bold text-purple underline">
                    {APP_DISPLAY_NAME}
                </Link>
            </div>

            <div></div>
        </div>
    );
});
