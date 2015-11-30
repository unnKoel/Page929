/**
 * Created by common on 2015/11/12.
 */
define(function (require) {
    var page = require('../module/page'),
        prepareCom = page.prepareCom;
    page.config.user.lgCallback = function (user) {
        var $ = require('../module/lib/jquery-1.11.2.min'),
            base = require('../module/lib/uc_base'),
            choiceBox = require('../module/comp/choiceBox'),
            lab_pading = require('../module/lab/lab_paging');

        /**
         * 对我感兴趣的企业版面
         */
        var interestedPain = function () {
            this.enrid = !1;
            var self = this;
            this.drew = function () {
                self.tabDrew(1, true);  //进入感兴趣pain，初次加载
            };

            this.tabDrew = function (pageNum, isDrewPage) {
                var enrid = self.enrid;
                var data = enrid ? {page: pageNum, pages: 12, enrid: enrid} : {page: pageNum, pages: 12};
                $.ajax({
                        url: base.domain + "/hh/center/hrList",
                        type: "GET",
                        dataType: "json",
                        data: data,
                        success: function (back) {
                            page.ajax_output(back, function (data) {
                                self.tabTrDrew(data.list);
                                if (isDrewPage) {
                                    new lab_pading().drew($('#bottom'), {
                                        pageCount: data.page.countpage,
                                        current: 1,
                                        backFn: function (pageNum) {
                                            self.tabDrew(pageNum, self.enrid)
                                        }
                                    });
                                }
                            }, {
                                32: function () {
                                    var prompt_dialog = prepareCom.lab_prompt_dialog;
                                    $('#interested tbody').html('');
                                    prompt_dialog.open(prompt_dialog.type.error, "该活动下没有感兴趣的企业记录!")
                                }
                            })
                        }
                    }
                );
            };

            this.tabTrDrew = function (interestComs) {
                var interestComStr = '';
                for (var i = 0; i < interestComs.length; i++) {
                    var interestCom = interestComs[i],
                        singleComStr = '<tr>';
                    singleComStr += '<td><div class="comNameTd">' + interestCom.company_name + '</div></td><td><div class="concatTd">'
                        + interestCom.contacts + '</div></td><td><div class="positionTd">'
                        + interestCom.position + '</div></td><td><div class="concatTypeTd">'
                        + interestCom.phone + '</div></td>'
                        + '<td class="source"><div class="sourceTd"><a href="">' + interestCom.from + '</a></div></td>'
                        + '<td class="del"><a href="javascript:void(0);" class="del_btn" fbid="' + interestCom.fbid + '"><em></em><span>删除</span></a></td></tr>';
                    interestComStr += singleComStr;
                }

                $('#interested tbody').html(interestComStr);
                /**
                 * 绑定删除事件
                 */
                $('.del_btn').on('click', function () {
                    var del_btn = $(this);
                    prepareCom.lab_affirm_dialog.open('确定要删除这条对我感兴趣的企业吗？', function () {
                        $.ajax({
                                url: base.domain + "/hh/center/delHr",
                                type: "POST",
                                dataType: "json",
                                data: {
                                    fbid: del_btn.attr('fbid')
                                },
                                success: function (back) {
                                    page.ajax_output(back, function () {
                                        del_btn.parents('tr').remove();
                                        var prompt_dialog = prepareCom.lab_prompt_dialog;
                                        prompt_dialog.open(prompt_dialog.type.succeed, "感兴趣企业记录删除成功！")
                                    })
                                }
                            }
                        );
                    });
                })
            };
        };
        var intPain = new interestedPain();
        //intPain.drew();

        //页面初始化
        $.ajax({
                url: base.domain + "/hh/center/index",
                type: "GET",
                dataType: "json",
                success: function (back) {
                    page.ajax_output(back, function (data) {
                        var userInfo = data.user,
                            activity = data.activity,
                            history = data.history;
                        userInfo.phone = user.phone;
                        show_userInfo(userInfo);
                        show_history(history);
                        show_activity(activity);
                    })
                }
            }
        );

        function show_userInfo(userInfo) {
            var ele_brief = $('.brief');
            ele_brief.find('.picFrame img').attr('src', base.domain + userInfo.avatar);
            ele_brief.find('.name').html(userInfo.name);
            ele_brief.find('.homePage').attr('href', './default.html?uid=' + userInfo.uid);
            ele_brief.find('.uid').html('NO.' + userInfo.uid);
            var ele_mainShow = $('.manShowUl');
            ele_mainShow.find('.name').text(userInfo.name);
            ele_mainShow.find('.phone').text(userInfo.phone);
            ele_mainShow.find('.email').text(userInfo.email);
            ele_mainShow.find('.com').text(userInfo.company.name);
            ele_mainShow.find('.pos').text(userInfo.position);
        }

        function show_history(history) {
            var ele_history = $('.aside .history ul'),
                ulContent = '';
            for (var i = 0; i < history.length; i++) {
                var h = history[i];
                ulContent += '<li><a href="' + './default.html?actid=' + h.actid + '">' + h.title + '</a></li>';
            }
            ele_history.html(ulContent);
        }

        function show_activity(activity) {
            var ele_activity = $('#activity ul');
            ele_activity.html('');
            for (var i = 0; i < activity.length; i++) {
                var li = $('<li></li>'),
                    ac = activity[i];
                li.append(ac_status(ac.act_status, ac.enr_status));
                li.append('<img src="' + base.domain + '/hh/actReal/realQRcode?cid=' + user.id + '&size=2" class="wm2">');
                li.append('<div class="layout">' +
                    '<div class="top clearFloat">' +
                    '<div class="left">' +
                    '<img src="assets/images/ac-demo_img.png"></div>' +
                    '<div class="right"><div class="des"><h2>' + ac.title + '</h2><p>' + ac.short_desc + '</p></div></div></div>' +
                    '<div class="below" enrid="' + ac.enrid + '">' +
                    '<div class="one"><span class="livLeft"><b class="tit">对我感兴趣的企业</b>' +
                    '<b class="num">共<em>' + ac.hrnum + '</em>家</b><b class="do">' +
                    '<a href="" class="nowTouch">立即联系</a></b></span><span class="livRight">' +
                    '<b class="tit">我加入的MPC</b><b class="num">共<em>' + ac.forward + '</em>家</b>' +
                    '<b class="do"><a href="">修改</a></b></span></div><div class="two">' +
                    '<span class="livLeft"><b class="tit">当前我的排行</b><b class="num">共<em>' + ac.rank + '</em>名</b><b class="do">' +
                    '<a href="">查看排行榜</a></b></span><span class="livRight last"><b><em class="eye"></em>' + ac.view + '</b>' +
                    '<b class="two"><em class="sword"></em>' + ac.forward + '</b><b><em class="heart"></em>' + ac.like + '</b></span></div>' +
                    '</div></div>');
                ele_activity.append(li);
            }

            $('.below .do a.nowTouch').on('click', function () {
                intPain.enrid = $(this).parents('.below').attr('enrid');
                intPain.tabDrew(1, true);
                $('#activity').addClass('hide'),
                    $('#interested').removeClass('hide'),
                    $('#userInfo').addClass('hide');
                return false;
            });


            /*enr_status对应报名状态：0:报名资格审核中,1:报名成功,2:报名失败
             act_status对应活动状态：0:筹划中,1:报名中,2:准备中,3:进行中,4:已结束
             */
            function ac_status(act_status, enr_status) {
                var ele_ac_status = !1;

                switch (enr_status) {
                    case '0':
                        ele_ac_status = '<span class="status check">报名审核中</span>';
                        break;
                    case '1':
                        if (act_status == '1') {
                            ele_ac_status = '<span class="status success">报名成功</span>'
                        } else if (act_status == '2') {
                            ele_ac_status = '<span class="status prepare">准备中</span>';
                        } else if (act_status == '3') {
                            ele_ac_status = '<span class="status under">进行中</span>';
                        } else if (act_status == '4') {
                            ele_ac_status = '<span class="status end">结束</span>';
                        }
                        break;
                    case '2':
                        ele_ac_status = '<span class="status end">报名失败</span>';
                        break;
                }
                return ele_ac_status;
            }
        }

        /**
         * 个人秀
         */
        var userFrm = function () {
            this.eles = [
                $('#user_name'),
                $('#user_phone'),
                $('#user_email'),
                $('#user_company'),
                $('#user_pos'),
                $('#user_jobTime'),
                $('#user_trainField'),
                $('#user_trainPos'),
                $('#user_grade'),
                $('#case_name_a'),
                $('#case_desc_a'),
                $('#case_name_b'),
                $('#case_desc_b'),
                $('.avatar img')
            ];
            this.drew = function (user) {
                //$('#userInfo').removeClass('hide');
                new choiceBox().createSelectors($('#frm'), ['科锐国际人力资源有限公司'], $('#comChBox'), {
                    x: 0,
                    y: 45,
                    itemHeight: 40,
                    menuMaxHeight: 200
                });
                this.eles[0].val(user.name);
                this.eles[1].val(user.phone);
                this.eles[2].val(user.email);
                this.eles[3].val(user.company == 1 ? '科锐国际人力资源有限公司' : '');
                this.eles[4].val(user.position);
                this.eles[5].val(user.work_time);
                this.eles[6].val(user.good_industry);
                this.eles[7].val(user.good_position);
                this.eles[8].val(user.achievement);
                this.eles[9].val(user.case_name_a);
                this.eles[10].val(user.case_describe_a);
                this.eles[11].val(user.case_name_b);
                this.eles[12].val(user.case_describe_b);
                this.eles[13].attr('src', base.domain + user.avatar);
                //$('#userInfo').addClass('hide');
                return this;
            };

            this.verify = function () {
                var verify = require('../module/tools/formVerify'),
                    phoneValidateExp = /^0?(13|15|18|14|17)[0-9]{9}$/,
                    chEngValidateExp = /^[\s\,\#\.A-Za-z\u4e00-\u9fa5]+$/,
                    emailValidateExp = /^\w+((-\w+)|(.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/,
                    jobYearValidateExp = /^[0-9]{1,2}$/,
                    userFrm = this;
                var form1CheckItems = {
                    'user[name]': function (value) {
                        if (!value) {
                            return {code: false, message: '称呼必须填写'};
                        } else if (value.length < 2 || value.length > 64) {
                            return {code: false, message: '称呼长度只能在2-64位字符之间'};
                        } else if (!chEngValidateExp.test(value)) {
                            return {code: false, message: '称呼只能由中文、英文及“ ”、“,”、#组成'};
                        }
                        return {code: true, message: ''};
                    },
                    'user[phone]': function (value) {
                        if (!value) {
                            return {code: false, message: '手机号码必须填写'};
                        } else if (!phoneValidateExp.test(value)) {
                            return {code: false, message: '手机号码格式有误，请输入正确的手机号'};
                        }
                        return {code: true, message: ''};
                    },
                    'user[email]': function (value) {
                        if (value && !emailValidateExp.test(value)) {
                            return {code: false, message: '邮箱格式有误，请输入正确的邮箱地址'};
                        }
                        return {code: true, message: ''};
                    },
                    'user[pos]': function (value) {
                        if (!value) {
                            return {code: false, message: '职位名称必须填写'};
                        } else if (value.length < 2 || value.length > 128) {
                            return {code: false, message: '职位名称只能在2-128位字符之间'}
                        }
                        return {code: true, message: ''};
                    },

                    'user[trainField]': function (value) {
                        if (value && (value.length < 2 || value.length > 64)) {
                            return {code: false, message: '擅长领域只能在2-64位字符之间'};
                        }
                        return {code: true, message: ''};
                    },

                    'user[trainPos]': function (value) {
                        if (value && (value.length < 2 || value.length > 99)) {
                            return {code: false, message: '擅长职位只能在2-99位字符之间'};
                        }
                        return {code: true, message: ''};
                    },

                    'user[jobTime]': function (value) {
                        if (!value) {
                            return {code: false, message: '从业时长必须填写'};
                        } else if (!jobYearValidateExp.test(value)) {
                            return {code: false, message: '从业时长只能由1-2位数字组成'};
                        }
                        return {code: true, message: ''}
                    },

                    'user[grade]': function (value) {
                        if (value && (value.length < 2 || value.length > 200)) {
                            return {code: false, message: '个人成就只能在2-200位字符之间'};
                        }
                        return {code: true, message: ''};
                    },

                    'user[case1]': function (value) {
                        if (value.length < 0 || value.length > 32) {
                            return {code: false, message: '个人成就只能在0-32位字符之间'};
                        }
                        return {code: true, message: ''};
                    },

                    'user[case2]': function (value) {
                        if (value.length < 0 || value.length > 32) {
                            return {code: false, message: '个人成就只能在0-32位字符之间'};
                        }
                        return {code: true, message: ''};
                    }
                };

                new verify().init($('form')[0], form1CheckItems, {
                    xoffset: 0,
                    yoffset: 40,
                    container: $('#frm')
                }).asyncSubmit('a.save', '', function () {
                    $.ajax({
                            url: base.domain + "/hh/user/edituser",
                            type: "POST",
                            dataType: "json",
                            data: {
                                name: userFrm.eles[0].val(),
                                phone: userFrm.eles[1].val(),
                                email: userFrm.eles[2].val(),
                                company: userFrm.eles[3].val() == '科锐国际人力资源有限公司' ? 1 : 1,
                                position: userFrm.eles[4].val(),
                                work_time: userFrm.eles[5].val(),
                                good_industry: userFrm.eles[6].val(),
                                good_position: userFrm.eles[7].val(),
                                achievement: userFrm.eles[8].val(),
                                case_name_a: userFrm.eles[9].val(),
                                case_describe_a: userFrm.eles[10].val(),
                                case_name_b: userFrm.eles[11].val(),
                                case_describe_b: userFrm.eles[12].val()
                            },
                            success: function (back) {
                                page.ajax_output(back, function () {
                                    var prompt_dialog = prepareCom.lab_prompt_dialog;
                                    prompt_dialog.open(prompt_dialog.type.succeed, '个人信息修改成功！')
                                })
                            }
                        }
                    );
                });
            }
        };
        new userFrm().drew(user).verify();


        //活动侧栏切换
        $('.manShow,.complete').click(function () {
            $('#activity').addClass('hide'),
                $('#interested').addClass('hide'),
                $('#userInfo').removeClass('hide');
            return false;
        });

        $('.interestCompany').click(function () {
            intPain.enrid = !1;
            intPain.tabDrew(1, true);
            $('#activity').addClass('hide'),
                $('#interested').removeClass('hide'),
                $('#userInfo').addClass('hide');
            return false;
        });

        $('.enterprise').click(function () {
            $('#activity').removeClass('hide'),
                $('#interested').addClass('hide'),
                $('#userInfo').addClass('hide');
            return false;
        });
    };
    page.load();
});
