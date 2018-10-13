"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Post {
    constructor(socialNetworkName, type, date, text, url, socialID) {
        if (typeof date === 'string') {
            date = new Date(date);
        }
        this.SocialNetworkName = socialNetworkName;
        this.Type = type;
        this.Date = date;
        this.Text = text;
        this.URL = url;
        this.SocialID = socialID;
    }
}
exports.default = Post;
//# sourceMappingURL=Post.js.map