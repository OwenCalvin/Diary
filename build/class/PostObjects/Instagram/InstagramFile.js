"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InstagramFile {
    constructor(node) {
        this.URL = node.display_url,
            this.IsVideo = node.is_video,
            this.Width = node.dimensions.width,
            this.Height = node.dimensions.height;
    }
}
exports.default = InstagramFile;
//# sourceMappingURL=InstagramFile.js.map