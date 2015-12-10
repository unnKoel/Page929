/**
 * Created by common on 2015/12/9.
 */
define(function (require) {
    var page929 = require('../../src/page_929');

    page929.user(
        {
            lgCallback: function () {
            },
            requireLogin: false
        }
    );

    page929.build(
        {
            lab_head_tail: {
                load: function () {
                    return require('../demo_com/lab_head_tail_ac')
                },
                site: '.page',
                interactCom: ['lab_login']
            },

            lab_login: {
                load: function () {
                    return require('../demo_com/lab_goto_login')
                },
                site: '.page',
                interactCom: []
            }
        }
    );
});