/**
 * Created by common on 2015/7/8.
 */
define(function (require) {
    var $ = require("../lib/zepto");
    var switchPage = require("../tools/switchPage");

    (function () {
        if ($navback = $(".nav-back"), $navback.length) {
            $navback.on("click",
                function () {
                    if ($(this).hasClass('pre')) {
                        sp = new switchPage(
                            {
                                prevPage: $(".step-one"),
                                currentPage: $(".step-two")
                            }
                        ), sp.prevPage(),
                            $(this).removeClass('pre')
                    } else {
                        window.history.go(-1);
                    }
                });
        }
    })();


    return {
        domain: "http://www.51caiker.com"
    };
});


