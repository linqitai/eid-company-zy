define("xg/eid-company-zy/1.0.4/p/customerParent/rechargeManage/queryBoxTmp-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
    var Handlebars = require("alinw/handlebars/1.3.0/runtime-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, ">= 1.0.0"];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        var buffer = "",
            stack1, helperMissing = helpers.helperMissing,
            escapeExpression = this.escapeExpression,
            self = this;

        function program1(depth0, data) {
            var buffer = "",
                helper, options;
            buffer += '\r\n<div class="queryBox text" id="statusSelect">\r\n    总充值：' + escapeExpression((helper = helpers.formatMoney || depth0 && depth0.formatMoney, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.totalAmount, options) : helperMissing.call(depth0, "formatMoney", depth0 && depth0.totalAmount, options))) + "元，剩余：" + escapeExpression((helper = helpers.formatMoney || depth0 && depth0.formatMoney, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.remainAmount, options) : helperMissing.call(depth0, "formatMoney", depth0 && depth0.remainAmount, options))) + "元，已使用：" + escapeExpression((helper = helpers.formatMoney || depth0 && depth0.formatMoney, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.useAmount, options) : helperMissing.call(depth0, "formatMoney", depth0 && depth0.useAmount, options))) + "元，当前超用：" + escapeExpression((helper = helpers.formatMoney || depth0 && depth0.formatMoney, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.overUsedAmount, options) : helperMissing.call(depth0, "formatMoney", depth0 && depth0.overUsedAmount, options))) + "元 （充值请拨打138-6814-7190（盛经理））\r\n</div>\r\n";
            return buffer
        }

        function program3(depth0, data) {
            return " "
        }
        buffer += " ";
        stack1 = helpers["if"].call(depth0, depth0, {
            hash: {},
            inverse: self.program(3, program3, data),
            fn: self.program(1, program1, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += "\r\n\r\n\r\n\r\n";
        return buffer
    })
});