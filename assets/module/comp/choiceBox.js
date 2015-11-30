/**
 * Created by common on 2015/9/9.
 * caiker_choiceBox
 */

define(function () {
        var $ = require("../lib/jquery-1.11.2.min");

        return function () {
            this.selectorLists = [];
            this.container = !1;
            this.selectMain = !1;
            this.selectMenu = !1;
            this.opts = !1;
            this.ul = !1;
            var self = this;

            function __XgetPosition(s, endEle) {
                var top = 0,
                    left = 0,
                    e = s.get(0);
                while (e.offsetParent) {
                    top += e.offsetTop;
                    left += e.offsetLeft;
                    e = e.offsetParent;
                    if ($(e).attr('id') == endEle.attr('id')) {
                        break;
                    }
                }

                return {x: left, y: top};
            }

            this.createSelectors = function (container, selectorLists, selectMain, opts) {
                self.container = container;
                self.selectMain = selectMain;
                self.opts = opts;

                var width = selectMain.outerWidth(),
                    ul = $('<ul class="selectMenu hide"></ul>'),
                    itemHeight = opts.itemHeight,
                    selectInput = selectMain.find('input'),
                    item = !1;
                self.ul = ul;
                ul.css('width', width),
                    self.selectMenu = ul,
                    selectMain.css('cursor', 'pointer'),
                    opts.defaultVal ? selectInput.val(opts.defaultVal) : selectInput.val(selectorLists[0]),
                    selectInput.attr("readonly", "readonly").css({'cursor': 'pointer'});

                if (selectorLists.length - 1 != 0) {
                    item = $('<li class="selectItem br_top"></li>').css({
                        'height': itemHeight + 'px',
                        'line-height': itemHeight + 'px'
                    }).text(selectorLists[0]),
                        ul.append(item),
                        self.selectorLists.push(item);
                }

                if (selectorLists.length * itemHeight > opts.menuMaxHeight) {
                    ul.css({'height': opts.menuMaxHeight + 'px', 'overflow-y': 'scroll'});
                }

                for (var i = 1; i < selectorLists.length - 1; i++) {
                    item = $('<li class="selectItem"></li>').css({
                        'height': itemHeight + 'px',
                        'line-height': itemHeight + 'px'
                    }).text(selectorLists[i]);
                    ul.append(item),
                        self.selectorLists.push(item);
                }

                item = $('<li class="selectItem br_bottom"></li>').css({
                    'height': itemHeight + 'px',
                    'line-height': itemHeight + 'px'
                }).text(selectorLists[selectorLists.length - 1]);
                selectorLists.length == 1 ? (item.css('border-radius', '5px')) : !1;
                ul.append(item),
                    self.selectorLists.push(item);

                $(self.container).css('position', 'relative').append(ul);
                var offset = __XgetPosition(self.selectMain, self.container),
                    ulTop = offset.y + self.opts.y + "px",
                    ulLeft = offset.x + self.opts.x + "px";
                ul.css({position: 'absolute', top: ulTop, left: ulLeft});

                self.pullDown();
                self.selectItem(opts.selItemCallback);
                self.docPickup();
                return this;
            }
            ;

            this.drawPosition = function () {
                var offset = __XgetPosition(self.selectMain, self.container),
                    ulTop = offset.y + self.opts.y + "px",
                    ulLeft = offset.x + self.opts.x + "px";
                self.ul.css('width', self.selectMain.outerWidth());
                self.ul.css({top: ulTop, left: ulLeft});
            };

            //this.drew = function () {
            //    self.ul.css('width', self.selectMain.outerWidth());
            //    var offset = __XgetPosition(self.selectMain, self.container),
            //        ulTop = offset.y + self.opts.y + "px",
            //        ulLeft = offset.x + self.opts.x + "px";
            //    self.ul.css({top: ulTop, left: ulLeft});
            //};

            this.pullDown = function () {
                self.selectMain.click(function (event) {
                    var offSelfSelMenus = $('.selectMenu').not(self.selectMenu),  //关闭同一page上的其他选择下拉框
                        offSelfSelMains = $('.choiceBox').not(self.selectMain);
                    offSelfSelMenus.addClass('hide'),
                        offSelfSelMains.removeClass('down');
                    self.drawPosition();
                    !$(this).hasClass('down') ? (
                        self.selectMenu.removeClass('hide')
                    ) : (
                        self.selectMenu.addClass('hide')
                    ),
                        $(this).toggleClass('down'),
                        event.stopPropagation();
                });
            };

            this.selectItem = function (callback) {
                for (var i = 0; i < self.selectorLists.length; i++) {
                    self.selectorLists[i].on('click', function () {
                        self.selectMenu.addClass('hide'),
                            self.selectMain.find('input').val($(this).html()),
                            self.selectMain.removeClass('down'),
                            callback ? callback($(this).html()) : void (0);
                    })
                }
            };

            this.docPickup = function () {
                $(document).click(function () {
                    self.selectMenu.addClass('hide'),
                        self.selectMain.removeClass('down')
                });
            }
        };
    }
)
;
