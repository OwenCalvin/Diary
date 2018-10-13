"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Diary_1 = require("../../class/Diary");
const Crawler_1 = require("../../class/Crawler");
const InstagramStorieCrawler_1 = require("../../class/CrawlerObjects/Instagram/InstagramStorieCrawler");
const InstagramPostCrawler_1 = require("../../class/CrawlerObjects/Instagram/InstagramPostCrawler");
class DiaryController {
    constructor(ioServer) {
        this.Crawler = new Crawler_1.default([
            new InstagramStorieCrawler_1.default('claidotro2', this.instagramStorie),
            new InstagramPostCrawler_1.default(this.instagram.bind(this))
        ]);
        this.IOServer = ioServer;
        this.Diary = new Diary_1.default(ioServer);
        this.Crawler.scanAll();
    }
    //#region NO-WEBHOOKS
    facebook() {
        // this.Diary.addPost(...)
    }
    instagram(posts) {
        console.log(posts.length);
        for (let z of posts) {
            for (let y of posts) {
                if (z.SocialID === y.SocialID) {
                    console.log(z);
                }
            }
        }
        // this.Diary.add(posts)
        // console.log(this.Diary.Posts)
        // this.Diary.addPost(...)
    }
    instagramStorie(test) {
        // console.log(test)
        // this.Diary.addPost(...)
    }
    spotify() {
        // this.Diary.addPost(...)
    }
    //#endregion
    //#region WEBHOOKS
    twitter(req, res) {
        // this.Diary.addPost(...)
    }
    youtube(req, res) {
        // this.Diary.addPost(...)
    }
    soundcloud(req, res) {
        // this.Diary.addPost(...)
    }
}
exports.default = DiaryController;
//# sourceMappingURL=controller.js.map