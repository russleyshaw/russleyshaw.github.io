import { Button, ButtonProps } from "@blueprintjs/core";
import { observer } from "mobx-react";
import { useMatch, useNavigate } from "react-router-dom";

interface NavButtonProps extends ButtonProps {
    to: string;
}

export const NavButton = observer((props: NavButtonProps) => {
    const { to } = props;
    const navigate = useNavigate();
    const match = useMatch(to);
    const active = !!match;

    const onClick = () => {
        navigate(to);
    };

    return <Button {...props} active={active} onClick={onClick} />;
});
