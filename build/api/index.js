"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const color_1 = require("../utils/color");
const express_1 = require("express");
const file_1 = require("../utils/file");
exports.default = (io) => {
    const router = express_1.Router();
    const APIs = [];
    const getFilePath = (file, a, ext = 'ts') => {
        return `./${file}/${a}.${ext.toLowerCase()}`;
    };
    file_1.scanDirSync(__dirname, file => {
        // Run before api import
        const routerFile = getFilePath(file, 'router');
        const middlewareFile = getFilePath(file, 'middleware');
        const configFile = getFilePath(file, 'config');
        if (file_1.fileExistsSync(__dirname, routerFile)) {
            // Some informations about APIs
            let API = {
                name: file
            };
            if (file_1.fileExistsSync(__dirname, configFile)) {
                API = Object.assign({}, API, require(configFile).default);
            }
            APIs.push(API);
            // Load middlewares if middleware.js file exists
            const middlewares = file_1.fileExistsSync(__dirname, middlewareFile) && require(`./${file}/middleware`).default;
            const apiRouter = express_1.Router();
            let apiRouterConfig = require(routerFile).default;
            // Load "before" middlewares
            middlewares.before && middlewares.before.forEach(mw => apiRouter.use(mw));
            if (!Array.isArray(apiRouterConfig)) {
                apiRouterConfig = apiRouterConfig(io);
            }
            // Load routes
            apiRouterConfig.forEach(r => {
                const list = Array.isArray(r);
                const method = r[list ? 0 : 'method'].toLowerCase();
                const route = r[list ? 1 : 'route'];
                let functions = r[list ? 2 : 'functions'];
                functions = Array.isArray(functions) ? functions : [functions];
                apiRouter[method](route, ...functions);
            });
            // Load "after" middlewares
            middlewares.after && middlewares.after.forEach(mw => apiRouter.use(mw));
            // Import API
            router.use(`/${file}`, apiRouter);
            console.log('✅  API:', color_1.color(`${file}`, 'fg.green'));
        }
        else {
            console.log(`❌  API: ${file} - ` + color_1.color('router.ts is required', 'fg.red'));
        }
    });
    router.get('/', (req, res) => res.send(APIs));
    return router;
};
//# sourceMappingURL=index.js.map