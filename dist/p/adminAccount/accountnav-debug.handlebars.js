define("xg/eid-company-zy/1.0.4/p/adminAccount/accountnav-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
    var Handlebars = require("alinw/handlebars/1.3.0/runtime-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, ">= 1.0.0"];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        var buffer = "",
            stack1, helper, functionType = "function",
            escapeExpression = this.escapeExpression;
        buffer += '<li class="';
        if (helper = helpers.homePage) {
            stack1 = helper.call(depth0, {
                hash: {},
                data: data
            })
        } else {
            helper = depth0 && depth0.homePage;
            stack1 = typeof helper === functionType ? helper.call(depth0, {
                hash: {},
                data: data
            }) : helper
        }
        buffer += escapeExpression(stack1) + '"><a href="/company/homePage.htm">&nbsp;&nbsp;&nbsp;&nbsp;首页</a></li>\r\n<li class="';
        if (helper = helpers.customerManage) {
            stack1 = helper.call(depth0, {
                hash: {},
                data: data
            })
        } else {
            helper = depth0 && depth0.customerManage;
            stack1 = typeof helper === functionType ? helper.call(depth0, {
                hash: {},
                data: data
            }) : helper
        }
        buffer += escapeExpression(stack1) + '"><a href="/company/customerManage.htm">&nbsp;&nbsp;&nbsp;&nbsp;客户管理</a></li>\r\n<li class="';
        if (helper = helpers.deviceManage) {
            stack1 = helper.call(depth0, {
                hash: {},
                data: data
            })
        } else {
            helper = depth0 && depth0.deviceManage;
            stack1 = typeof helper === functionType ? helper.call(depth0, {
                hash: {},
                data: data
            }) : helper
        }
        buffer += escapeExpression(stack1) + '"><a href="/company/deviceManage.htm">&nbsp;&nbsp;&nbsp;&nbsp;设备管理</a></li>\r\n<li class="';
        if (helper = helpers.inforService) {
            stack1 = helper.call(depth0, {
                hash: {},
                data: data
            })
        } else {
            helper = depth0 && depth0.inforService;
            stack1 = typeof helper === functionType ? helper.call(depth0, {
                hash: {},
                data: data
            }) : helper
        }
        buffer += escapeExpression(stack1) + '"><a href="/company/inforService.htm">&nbsp;&nbsp;&nbsp;&nbsp;信息查询</a></li>\r\n<li class="';
        if (helper = helpers.dataCount) {
            stack1 = helper.call(depth0, {
                hash: {},
                data: data
            })
        } else {
            helper = depth0 && depth0.dataCount;
            stack1 = typeof helper === functionType ? helper.call(depth0, {
                hash: {},
                data: data
            }) : helper
        }
        buffer += escapeExpression(stack1) + '"><a href="/company/dataCount.htm">&nbsp;&nbsp;&nbsp;&nbsp;数据统计</a></li>\r\n<li class="';
        if (helper = helpers.rechargeManage) {
            stack1 = helper.call(depth0, {
                hash: {},
                data: data
            })
        } else {
            helper = depth0 && depth0.rechargeManage;
            stack1 = typeof helper === functionType ? helper.call(depth0, {
                hash: {},
                data: data
            }) : helper
        }
        buffer += escapeExpression(stack1) + '"><a href="/company/rechargeManage.htm">&nbsp;&nbsp;&nbsp;&nbsp;充值管理</a></li>\r\n<li class="';
        if (helper = helpers.accountManage) {
            stack1 = helper.call(depth0, {
                hash: {},
                data: data
            })
        } else {
            helper = depth0 && depth0.accountManage;
            stack1 = typeof helper === functionType ? helper.call(depth0, {
                hash: {},
                data: data
            }) : helper
        }
        buffer += escapeExpression(stack1) + '"><a href="/company/userManage.htm">&nbsp;&nbsp;&nbsp;&nbsp;账号管理</a></li>\r\n\r\n';
        return buffer
    })
});