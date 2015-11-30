/**
 * Created by common on 2015/11/13.
 */
define(function (require) {
    var lab_login = require('../assets/module/lab/lab_login.js'),
        $ = require('../assets/module/lib/jquery-1.11.2.min.js');
    login = new lab_login().drew($('body'));
    login.bind_submit();
});