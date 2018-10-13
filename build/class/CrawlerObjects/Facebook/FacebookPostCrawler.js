"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CrawlerObject_1 = require("../CrawlerObject");
class FacebookPostCrawler extends CrawlerObject_1.default {
    onResponse(res) {
        throw new Error("Method not implemented.");
    }
    constructor(cb) {
        super('facebookPost', 'https://www.instagram.com/', 'article', process);
    }
}
exports.default = FacebookPostCrawler;
//# sourceMappingURL=FacebookPostCrawler.js.map