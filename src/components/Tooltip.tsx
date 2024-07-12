"use client";

import {
    Button,
    OverlayArrow,
    Tooltip as AriaTooltip,
    TooltipTrigger,
} from "react-aria-components";

import style from "./Tooltip.module.css";

export interface TooltipProps {
    tooltip: React.ReactNode;
    children: React.ReactNode;
    delay?: number;
    className?: string;
}

export default function Tooltip(props: TooltipProps) {
    return (
        <TooltipTrigger delay={props.delay}>
            <Button className={props.className}>{props.children}</Button>
            <AriaTooltip className={style.tooltip}>
                <OverlayArrow className={style.overlayArrow}>
                    {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                    <svg width={8} height={8} viewBox="0 0 8 8">
                        <path d="M0 0 L4 4 L8 0" />
                    </svg>
                </OverlayArrow>
                {props.tooltip}
            </AriaTooltip>
        </TooltipTrigger>
    );
}
