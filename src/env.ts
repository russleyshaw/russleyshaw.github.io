export const IS_DEV_MODE = import.meta.env.MODE === "development";
if (IS_DEV_MODE) {
    console.warn("Development Mode");
}
