define("xg/eid-company-zy/1.0.4/p/adminAccount/headerH-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
    var Handlebars = require("alinw/handlebars/1.3.0/runtime-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, ">= 1.0.0"];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        var buffer = "",
            stack1, helper, functionType = "function",
            escapeExpression = this.escapeExpression;
        buffer += '<div class="navbar navbar-fixed-top">\r\n  <div class="container-fluid cl"> \r\n  <a class="logo navbar-logo f-l mr-10" href="#">卓壹身份标识系统</a>\r\n  <span class="logo navbar-slogan f-l mr-10">v1.6</span>\r\n  <nav id="Hui-userbar" class="nav navbar-nav navbar-userbar hidden-xs">\r\n      <ul class="cl">\r\n        <li>\r\n            ';
        if (helper = helpers.username) {
            stack1 = helper.call(depth0, {
                hash: {},
                data: data
            })
        } else {
            helper = depth0 && depth0.username;
            stack1 = typeof helper === functionType ? helper.call(depth0, {
                hash: {},
                data: data
            }) : helper
        }
        buffer += escapeExpression(stack1) + '\r\n        </li>\r\n        <li class="dropDown dropDown_hover"> \r\n          <a href="#" class="dropDown_A">';
        if (helper = helpers.roleName) {
            stack1 = helper.call(depth0, {
                hash: {},
                data: data
            })
        } else {
            helper = depth0 && depth0.roleName;
            stack1 = typeof helper === functionType ? helper.call(depth0, {
                hash: {},
                data: data
            }) : helper
        }
        buffer += escapeExpression(stack1) + '<i class="Hui-iconfont"></i></a>\r\n          <ul class="dropDown-menu menu radius box-shadow">\r\n            <li><a href="javascript:void(0)" data-userid="';
        if (helper = helpers.userId) {
            stack1 = helper.call(depth0, {
                hash: {},
                data: data
            })
        } else {
            helper = depth0 && depth0.userId;
            stack1 = typeof helper === functionType ? helper.call(depth0, {
                hash: {},
                data: data
            }) : helper
        }
        buffer += escapeExpression(stack1) + '" data-mobile="';
        if (helper = helpers.mobile) {
            stack1 = helper.call(depth0, {
                hash: {},
                data: data
            })
        } else {
            helper = depth0 && depth0.mobile;
            stack1 = typeof helper === functionType ? helper.call(depth0, {
                hash: {},
                data: data
            }) : helper
        }
        buffer += escapeExpression(stack1) + '" data-realname="';
        if (helper = helpers.realName) {
            stack1 = helper.call(depth0, {
                hash: {},
                data: data
            })
        } else {
            helper = depth0 && depth0.realName;
            stack1 = typeof helper === functionType ? helper.call(depth0, {
                hash: {},
                data: data
            }) : helper
        }
        buffer += escapeExpression(stack1) + '" id="editInfor">编辑信息</a></li>\r\n            <li><a href="javascript:void(0)" id="updpass">修改密码</a></li>\r\n            <li><a href="javascript:void(0)" id="logoutBtn" data-usertype="';
        if (helper = helpers.userType) {
            stack1 = helper.call(depth0, {
                hash: {},
                data: data
            })
        } else {
            helper = depth0 && depth0.userType;
            stack1 = typeof helper === functionType ? helper.call(depth0, {
                hash: {},
                data: data
            }) : helper
        }
        buffer += escapeExpression(stack1) + '">退出</a></li>\r\n          </ul>\r\n        </li>\r\n        <!-- <li id="Hui-skin" class="dropDown right dropDown_hover">\r\n          <a href="javascript:;" class="dropDown_A" title="换肤"><i class="Hui-iconfont" style="font-size:18px"></i></a>\r\n          <ul class="dropDown-menu menu radius box-shadow">\r\n            <li><a href="javascript:;" data-val="default" title="默认（黑色）">默认（黑色）</a></li>\r\n            <li><a href="javascript:;" data-val="blue" title="蓝色">蓝色</a></li>\r\n            <li><a href="javascript:;" data-val="green" title="绿色">绿色</a></li>\r\n            <li><a href="javascript:;" data-val="red" title="红色">红色</a></li>\r\n            <li><a href="javascript:;" data-val="yellow" title="黄色">黄色</a></li>\r\n            <li><a href="javascript:;" data-val="orange" title="绿色">橙色</a></li>\r\n          </ul>\r\n        </li> -->\r\n      </ul>\r\n  </nav>\r\n  </div>\r\n</div>';
        return buffer
    })
});