/**
 * Created by common on 2015/11/20.
 */
define(function (require) {
    var component = function () {
    };
    component.prototype.view = '';
    component.prototype.drewType = 'html';
    component.prototype.drew = function (container, data) {
        //if (this.drewType == 'html') {
        //    container.append(this.view);
        //} else if (this.drewType = 'jsx') {
        //    var React = require('react');
        //    React.render(this.view(data), container);
        //}
    };

    return component;
});
