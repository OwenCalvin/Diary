"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
exports.scanDirSync = (root, cb) => {
    const files = fs.readdirSync(root);
    files.forEach(file => {
        const stats = fs.lstatSync(path.join(root, file));
        if (stats.isDirectory()) {
            cb(file);
        }
    });
};
exports.fileExistsSync = (root, file) => {
    return fs.existsSync(path.join(root, file));
};
//# sourceMappingURL=file.js.map