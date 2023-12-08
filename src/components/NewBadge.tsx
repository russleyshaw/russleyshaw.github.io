import { motion } from "framer-motion";

import styles from "./NewBadge.module.css";

export interface NewBadgeProps {
    wiggle?: boolean;
}

export default function NewBadge(props: NewBadgeProps) {
    const { wiggle = false } = props;

    return (
        <motion.div
            initial={{
                scale: 1,
                rotate: 0,
            }}
            animate={{
                scale: wiggle ? [1, 1.1, 1] : 1,
                rotate: wiggle ? [0, 10, -10, 0] : 0,
            }}
            transition={{
                delay: 0,
                duration: 1,
                ease: "easeInOut",
                loop: Infinity,
            }}
            className={styles.newBadge}
        >
            New!
        </motion.div>
    );
}
