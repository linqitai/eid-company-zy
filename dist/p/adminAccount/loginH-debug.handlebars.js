define("xg/eid-company-zy/1.0.4/p/adminAccount/loginH-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
    var Handlebars = require("alinw/handlebars/1.3.0/runtime-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, ">= 1.0.0"];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        return '<form class="form form-horizontal" id="loginForm" >\r\n    <input type="hidden" id="loginType" name="loginType" value="ims">\r\n    <div class="row cl">\r\n      <label class="form-label col-sm-4">用户名：</label>\r\n      <div class="formControls col-sm-5">\r\n        <input type="text" class="input-text radius" autocomplete="off" placeholder="请输入手机号" name="username" id="username" tabindex="1">\r\n      </div>\r\n    </div>\r\n    <div class="row cl">\r\n      <label class="form-label col-sm-4">密码：</label>\r\n      <div class="formControls col-sm-5">\r\n        <input type="password" class="input-text radius" autocomplete="off" placeholder="密码" name="password" id="password" tabindex="2">\r\n      </div>\r\n      <div class="col-xs-5"> </div>\r\n    </div>\r\n    <div class="row cl">\r\n      <label class="form-label col-sm-4">验证码：</label>\r\n      <div class="formControls col-sm-5">\r\n        <input type="text" class="input-text radius" autocomplete="off" placeholder="请输入验证码" name="checkCode" id="checkCode" tabindex="3">\r\n        <img class="checkCode" src="/checkCode.jpg">\r\n      </div>\r\n    </div>\r\n    <div class="row cl">\r\n      <div class="col-sm-6 col-sm-offset-4">\r\n        <!-- <a href="javascript:void(0)" class="forgetPsd">忘记密码请联系客服！</a> -->\r\n        <input class="btn btn-primary" type="submit" value="&nbsp;&nbsp;提交&nbsp;&nbsp;">\r\n      </div>\r\n    </div>\r\n  </form>'
    })
});