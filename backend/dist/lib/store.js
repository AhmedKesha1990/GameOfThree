"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Store = void 0;
const container = new Map();
const requested = new Map();
const reserve = (target, propertyKey, request) => {
    requested.set(request.toUpperCase(), { propertyKey, request, target });
};
const register = (key, item) => {
    if (requested.has(key.toUpperCase())) {
        requested.get(key.toUpperCase()).target[requested.get(key.toUpperCase()).propertyKey] = item;
    }
    if (container.has(key.toUpperCase())) {
        throw new Error(`${key.toUpperCase()} already registered`);
    }
    container.set(key.toUpperCase(), item);
};
const fetch = (key) => {
    return container.get(key.toUpperCase());
};
const store = { fetch, register, reserve };
exports.Store = store;
//# sourceMappingURL=store.js.map