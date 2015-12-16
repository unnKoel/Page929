/**
 * Created by common on 2015/12/16.
 */
define(function (require) {
    var page929 = require('../../src/page_929');
    page929.build(
        {
            lab_prompt_dialog: {
                load: function () {
                    return require('../../src/predefine_com/lab_prompt_dialog')
                }
            },
            lab_affirm_dialog: {
                load: function () {
                    return require('../../src/predefine_com/lab_affirm_dialog')
                }
            },
            lab_head_tail: {
                load: function () {
                    return require('../../src/predefine_com/lab_head_tail')
                },
                interactCom: ['lab_login']
            },
            lab_login: {
                load: function () {
                    return require('../../src/predefine_com/lab_login')
                },
                interactCom: ['lab_head_tail', 'lgCallback']
            }
        }
    );
});