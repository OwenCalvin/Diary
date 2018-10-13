"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer = require("puppeteer");
class Crawler {
    constructor(objectsToScan) {
        this.ObjectsToScan = objectsToScan;
    }
    launchBrowser() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.Browser) {
                this.Browser = yield puppeteer.launch({
                    headless: false,
                    userDataDir: '/Users/owen/Library/Application Support/Chromium/Default',
                    devtools: true
                });
            }
        });
    }
    scanAll() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.launchBrowser();
            yield Promise.all(this.ObjectsToScan.map((ots) => __awaiter(this, void 0, void 0, function* () {
                const page = yield this.Browser.newPage();
                page.on('response', (res) => ots.onResponse(res));
                yield page.goto(ots.URL);
                if (ots.WaitFor) {
                    yield page.waitFor(ots.WaitFor);
                }
                if (ots.Process) {
                    yield ots.execute(page);
                }
            })));
        });
    }
}
exports.default = Crawler;
//# sourceMappingURL=Crawler.js.map