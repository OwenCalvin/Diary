"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CrawlerObject {
    constructor(name, url, process = null, waitFor = null) {
        this.Name = name,
            this.URL = url;
        this.Process = process;
        this.WaitFor = waitFor;
    }
    execute(page) {
        this.Process(page);
    }
}
exports.default = CrawlerObject;
//# sourceMappingURL=CrawlerObject.js.map