"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Post_1 = require("../Post");
class InstagramPost extends Post_1.default {
    constructor(files) {
        super('instagram', 'story', new Date(), 'Hello', 'https://instagram.com/stories/_USERNAME_', '');
        this.Files = [];
        this.Files = files;
    }
}
exports.default = InstagramPost;
//# sourceMappingURL=InstagramStoriePost.js.map