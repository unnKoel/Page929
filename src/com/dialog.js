/**
 * Created by common on 2015/9/21.
 *
 * caiker_dialog
 */
define(function (require) {
    var e = require("../lib/jquery-1.11.2");
    var Dialog = function () {
        this.dialogEle = false;
        this.vesselEle = false;
        this.opts = false;
        this.jqOverlay = false;
        var self = this;

        /**
         * dialog初始化
         * @param dialogEle dialog对话框
         * @param vesselEle dialog容器
         * @param opts
         * @returns {Dialog}
         */
        this.init = function (dialogEle, vesselEle, opts) {
            this.dialogEle = dialogEle;
            this.vesselEle = vesselEle;
            this.opts = opts;
            e(self.dialogEle).css("z-index", 100002).hide();
            var jqVessel = e(self.vesselEle);
            var jqOverlay = e('<div class="overlay-mask"></div>').css({
                width: '100%',
                position: 'absolute',
                left: 0,
                top: 0,
                zIndex: 100001,
                display: 'none'
            });
            this.jqOverlay = jqOverlay;
            jqVessel.css({
                position: 'relative',
                width: '100%'
            });
            jqVessel.append(jqOverlay);
            return this;
        };

        /**
         * dialog对话框打开
         * @param opt
         */
        this.open = function (opt) {
            var jqVessel = e(self.vesselEle),
                overlayMskHeight = undefined;
            //设置jqOverlay的高度
            if (jqVessel[0].nodeName === 'BODY') {
                var winHeight = e(window).height(),
                    docHeight = e(document).height();
                overlayMskHeight = winHeight >= docHeight ? winHeight : docHeight;
            } else {
                overlayMskHeight = jqVessel.outerHeight();
            }
            self.jqOverlay.css('height', overlayMskHeight + 'px');
            e(self.dialogEle).show();
            self.jqOverlay.show();
            //dialog�ر��¼���
            e(self.dialogEle).find('.ks-overlay-close').click(function () {
                self.close();
                if (opt && opt.autoOff && autoOffFun) {
                    clearTimeout(autoOffFun);
                }
            });
            if (opt && opt.autoOff) {
                var autoOffFun = setTimeout(self.close, opt.millisecond);
            }
        };

        /**
         * dialog对话框关闭
         */
        this.close = function () {
            e(self.dialogEle).hide();
            self.jqOverlay.hide();
        }
    };
    return Dialog;
});

