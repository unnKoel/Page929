/**
 * Created by common on 2015/12/9.
 */
define(function (require) {
    var $ = require('../lib/jquery-1.11.2'),
        base = require('../lib/uc_base');
    return function () {
        /**
         * 跳转到登陆
         */
        this.open = function () {
            base.toLogin.setBackTo('../example/demo_replace_login.html', '../example/demo_login.html')
        };
    }
});