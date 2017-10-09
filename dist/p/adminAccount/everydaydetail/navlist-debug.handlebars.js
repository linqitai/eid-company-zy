define("xg/eid-company-zy/1.0.4/p/adminAccount/everydaydetail/navlist-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
    var Handlebars = require("alinw/handlebars/1.3.0/runtime-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, ">= 1.0.0"];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        var buffer = "",
            stack1, helper, functionType = "function",
            escapeExpression = this.escapeExpression;
        buffer += ' <i class="Hui-iconfont"></i>\r\n <a class="c-666" href="javascript:void(0)">当前位置</a>\r\n    <span class="c-999 en">&gt;</span><a href="/company/count/shopDetail.htm?companyId=';
        if (helper = helpers.companyId) {
            stack1 = helper.call(depth0, {
                hash: {},
                data: data
            })
        } else {
            helper = depth0 && depth0.companyId;
            stack1 = typeof helper === functionType ? helper.call(depth0, {
                hash: {},
                data: data
            }) : helper
        }
        buffer += escapeExpression(stack1) + '" class="c-666">门店统计</a>\r\n    <span class="c-999 en">&gt;</span><span class="c-666">门店详情</span>';
        return buffer
    })
});