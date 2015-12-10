/**
 * Created by common on 2015/12/9.
 */
define(function (require) {
    var page929 = require('../../src/page_929');
    page929.build(
        {
            lab_login: {
                load: function () {
                    return require('D:/project/Page929/example/demo_com/lab_login')
                },
                site: '#login',
                interactCom: []
            }
        }
    );
});