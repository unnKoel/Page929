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
            lab_prompt_dialog: {
                load: function () {
                    return require('./predefine_com/lab_prompt_dialog')
                },
                site: '#page929_prompt',
                interactCom: []
            },
            lab_affirm_dialog: {
                load: function () {
                    return require('./predefine_com/lab_affirm_dialog')
                },
                site: '#page929_affirm',
                interactCom: []
            },
            lab_head_tail: {
                load: function () {
                    return require('./predefine_com/lab_head_tail')
                },
                site: '#page929_head',
                interactCom: ['lab_login']
            },
            lab_login: {
                load: function () {
                    return require('./predefine_com/lab_login')
                },
                site: '#page929_login',
                interactCom: ['lab_head_tail', 'lgCallback']
            },

            lab_paging: {
                load: function () {
                    return require('./gallery_com/lab_paging')
                },
                site: '#page929_paging'
            }
        }
    );
});