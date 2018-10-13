"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Diary {
    constructor(ioServer) {
        this._Posts = [];
        this.IOServer = ioServer;
    }
    get Posts() {
        return this._Posts;
    }
    add(post) {
        if (Array.isArray(post)) {
            this._Posts = [
                ...this._Posts,
                ...post
            ];
        }
        else {
            this.Posts.push(post);
        }
        this.IOServer.emit('post:new', post);
    }
}
exports.default = Diary;
//# sourceMappingURL=Diary.js.map