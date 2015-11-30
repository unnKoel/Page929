var React = require('react');

var loginView = React.createClass({
    render: function () {
        return (<div className="login-form">
            <div className="login-box">
            <div className="mt">
            <div></div>
            </div>
            <div className="wrap">
            <div></div>
            </div>
            <div className="mc">
            <div className="form">
            <form id="formlogin" method="post" onsubmit="return false;">

            <div className="item item-fore1 highlight">
            <label for="loginname" className="login-label name-label"></label>
            <input id="loginname" className="itxt" name="loginname" tabindex="1" autocomplete="off"
        placeholder="邮箱/已验证手机" type="text" />
            <span className="clear-btn"></span>
            </div>
            <div id="entry" className="item item-fore2 highlight">
            <label className="login-label pwd-label" for="nloginpwd"></label>
            <input id="nloginpwd" name="nloginpwd" className="itxt itxt-error" tabindex="2"
        autocomplete="off" placeholder="密码" type="password" />
            <span className="clear-btn"></span>
            <span className="capslock"><b></b>大小写锁定已打开</span>
        </div>
        <div className="item item-fore3">
            <div className="safe">
            <span className="rem">
            <input id="autoLogin" name="chkRememberMe" className="jdcheckbox" tabindex="3"
        type="checkbox" />
            <label>记住我</label>
            </span>
            <span className="forget-pw-safe">
            <a href="./uc_forgetpwd.html" className="" target="_blank">忘记密码?</a>
        </span>
        </div>
        </div>
        <div className="item-fore4">
            <div className="msg-wrap">
                <div className={this.props.class}><b></b>{this.props.label}</div>
        </div>
        </div>
        <div className="item item-fore5">
            <div className="login-btn">
            <a href="javascript:;" className="btn-img btn-entry" id="loginsubmit" tabindex="6">立&nbsp;即&nbsp;登&nbsp;录</a>
        </div>
        </div>
        </form>
        </div>
        </div>
        </div>
        <div className="ks-overlay-close btn_close"></div>
            </div>);
    }
});

module.exports = loginView