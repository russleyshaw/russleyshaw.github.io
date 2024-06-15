"use client";

import { formatDistanceToNow } from "date-fns";

export interface DateSinceProps {
    date: Date;
}

export default function DateSince(props: DateSinceProps) {
    const { date } = props;

    return (
        <span title={date.toLocaleString()}>{formatDistanceToNow(date, { addSuffix: true })}</span>
    );
}
