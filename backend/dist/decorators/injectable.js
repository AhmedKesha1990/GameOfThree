"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Injectable = void 0;
require("reflect-metadata");
const lib_1 = require("../lib");
const injectable = (name) => {
    return (target) => {
        lib_1.Store.register(name, new target());
    };
};
exports.Injectable = injectable;
//# sourceMappingURL=injectable.js.map