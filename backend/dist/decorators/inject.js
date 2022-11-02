"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Inject = void 0;
const lib_1 = require("../lib");
const inject = (name) => {
    return (target, propertyKey) => {
        const resource = lib_1.Store.fetch(name);
        if (!resource) {
            lib_1.Store.reserve(target, propertyKey, name);
        }
        else {
            target[propertyKey] = resource;
        }
        return target[propertyKey];
    };
};
exports.Inject = inject;
//# sourceMappingURL=inject.js.map