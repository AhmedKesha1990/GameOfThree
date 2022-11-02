export interface Storage {
    register(key: string, item: any): void;
    fetch(key: string): any;
    reserve(target: any, propertyKey: string | symbol, request: string): void;
}
declare const store: Storage;
export { store as Store };
