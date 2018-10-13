"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Post_1 = require("../Post");
const InstagramFile_1 = require("./InstagramFile");
class InstagramPost extends Post_1.default {
    constructor(e) {
        super('instagram', 'post', new Date(), 'Hello', `https://www.instagram.com/p/${e.node.shortcode}/?taken-by=${e.node.owner.username}`, e.node.id);
        this.Files = [];
        if (e.node.edge_sidecar_to_children) {
            this.Files = e.node.edge_sidecar_to_children.edges.map(me => {
                return new InstagramFile_1.default(me.node);
            });
        }
        else {
            this.Files = [new InstagramFile_1.default(e.node)];
        }
        this.ShortCode = e.node.shortcode;
    }
    static saveFeed(feed) {
        feed.edges.map(e => {
        });
    }
}
exports.default = InstagramPost;
//# sourceMappingURL=InstagramPost.js.map