"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArgsHaveTime = void 0;
// Checks if the provided argument contains a number
// Params:
//      args - the arguments the user provided in the message
const ArgsHaveTime = (args) => {
    return /\d/.test(args);
};
exports.ArgsHaveTime = ArgsHaveTime;
