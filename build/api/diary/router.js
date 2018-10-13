"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = require("./controller");
const WHSocials = [
    'twitter',
    'soundcloud',
    'youtube'
];
exports.default = (io) => {
    const diaryController = new controller_1.default(io);
    return WHSocials.map(s => ({
        method: 'post',
        route: `/${s}`,
        functions: (req, res) => diaryController[s](req, res)
    }));
};
//# sourceMappingURL=router.js.map