var React = require('react');

var person = React.createClass({
    render: function () {
        return (
            <div>
            <div className="brief">
               <div className="clearFloat">
                <div className="left">
                    <div className="picFrame">
                        <img src={this.props.personImg} />
                    </div>
                </div>
                <div className="right">
                    <div>
                        <span className="name">{this.props.name}</span>
                        <span className="uid">{this.props.uid}</span>
                        <span><a href="" className="homePage">个人主页</a></span>
                    </div>
                </div>
                </div>
                <div className="line"></div>
            </div>
    <h2 className="interestCompany">
    <em></em>
    <a href="">对我感兴趣的企业</a>
    </h2>

    <h2 className="manShow">
    <em></em>
    <a href="">我的个人秀</a>
    </h2>
    <ul className="manShowUl">
    <li className="odd">
    <label>称呼:</label>
<span className="name">{this.props.name}</span>
    </li>
    <li className="even">
    <label>手机:</label>
<span className="phone">{this.props.phone}</span>
    </li>
    <li className="odd">
    <label>邮箱:</label>
<span className="email">{this.props.email}</span>
    </li>
    <li className="even">
    <label>所在公司:</label>
<span className="com">{this.props.company.name}</span>
    </li>
    <li className="odd">
    <label>职位:</label>
<span className="pos">{this.props.position}</span>
    </li>
    </ul>
    <div className="complete">
    <a href="">完善资料</a>
    </div>
</div>);
    }
});

module.exports = person;



