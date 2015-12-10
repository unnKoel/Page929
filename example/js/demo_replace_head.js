/**
 * Created by common on 2015/12/9.
 */
define(function (require) {
    var page929 = require('../../src/page_929');

    page929.user(
        {
            lgCallback: function () {
            }
        }
    );
    page929.build(
        {
            lab_head_tail: {
                load: function () {
                    return require('D:/project/Page929/example/demo_com/lab_head_tail_ac')
                },
                site: '.page',
                interactCom: ['lab_login']
            }
        }
    );
});