/**
 * Created by common on 2015/7/13.
 */
define(function (require) {
    function e(t) {
        this.opt = {
            currentPage: null,
            nextPage: null,
            prevPage: null
        };
        $.extend(this.opt, t);
    }

    var $ = require("../lib/zepto");
    return e.prototype.nextPage = function () {
        this.opt.currentPage.addClass("page-prev"),
            this.opt.currentPage.removeClass("page-current"),
            this.opt.nextPage.addClass("page-current"),
            this.opt.nextPage.removeClass("page-next")
    },
        e.prototype.prevPage = function () {
            this.opt.currentPage.addClass("page-next"),
                this.opt.currentPage.removeClass("page-current"),
                this.opt.prevPage.addClass("page-current"),
                this.opt.prevPage.removeClass("page-prev")
        },
        e
});
