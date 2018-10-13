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
const CrawlerObject_1 = require("../CrawlerObject");
const InstagramPost_1 = require("../../PostObjects/Instagram/InstagramPost");
class InstagramPostCrawler extends CrawlerObject_1.default {
    constructor(onResponseCallback) {
        super('instagramPost', 'https://www.instagram.com/', (page) => {
            setInterval(() => __awaiter(this, void 0, void 0, function* () {
                if (!this.IsProcessing && !this.EndReached) {
                    // The end is reached when the loading element disappear
                    const loadingElementExists = yield page.evaluate(() => {
                        window.scrollBy(0, 100000);
                        return !!document.querySelector('.Id0Rh');
                    });
                    this.EndReached = !loadingElementExists;
                }
            }), 0);
        });
        this.IsProcessing = false;
        this.EndReached = false;
        this.Finished = false;
        this.InstagramPosts = [];
        this.OnResponseCallback = onResponseCallback;
    }
    onResponse(res) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = res.url();
            if (url.includes('https://www.instagram.com/graphql/query') && !url.includes('only_stories')) {
                this.IsProcessing = true;
                const json = yield res.json();
                const edges = json.data.user.edge_web_feed_timeline.edges;
                if (edges) {
                    this.InstagramPosts = [
                        ...this.InstagramPosts,
                        ...edges.map(e => {
                            if (e.node.__typename !== 'GraphSuggestedUserFeedUnit') {
                                return new InstagramPost_1.default(e);
                            }
                        })
                    ];
                    this.LastInstagramPost = this.InstagramPosts[this.InstagramPosts.length - 1];
                    if (this.EndReached) {
                        console.log(this.InstagramPosts.length);
                        this.OnResponseCallback(this.InstagramPosts);
                    }
                }
                this.IsProcessing = false;
            }
        });
    }
}
exports.default = InstagramPostCrawler;
//# sourceMappingURL=InstagramPostCrawler.js.map