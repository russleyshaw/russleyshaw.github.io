import { debounce } from "lodash";
import { makeAutoObservable } from "mobx";

interface LocalStorageModelArgs<T> {
    key: string;
    defaultValue: () => T;
    serialize: (value: T) => string;
    deserialize: (value: string) => T;
}

export class LocalStorageModel<T> {
    value: T;

    private args: LocalStorageModelArgs<T>;

    constructor(args: LocalStorageModelArgs<T>) {
        this.args = args;
        this.value = this.readFromLocalStorage();

        makeAutoObservable(this, {}, { autoBind: true });

        window.addEventListener("storage", this.listener);
    }

    dispose() {
        window.removeEventListener("storage", this.listener);
    }

    setValue(value: T): void {
        this.value = value;
        this.debouncedWrite();
    }

    debouncedWrite = debounce(
        () => {
            this.writeToLocalStorage(this.value);
        },
        250,
        {
            leading: true,
            trailing: true,
        },
    );

    readFromLocalStorage(): T {
        const value = localStorage.getItem(this.args.key);
        if (value) {
            try {
                return this.args.deserialize(value);
            } catch (e) {
                return this.args.defaultValue();
            }
        } else {
            return this.args.defaultValue();
        }
    }

    writeToLocalStorage(value: T): void {
        localStorage.setItem(this.args.key, this.args.serialize(value));
    }

    private listener(e: StorageEvent) {
        if (e.key === this.args.key) {
            const value = this.readFromLocalStorage();
            this.value = value;
        }
    }
}
