define("xg/eid-company-zy/1.0.4/p/reports/plscan-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
    var Handlebars = require("alinw/handlebars/1.3.0/runtime-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, ">= 1.0.0"];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        var buffer = "",
            stack1, functionType = "function",
            escapeExpression = this.escapeExpression,
            self = this;

        function program1(depth0, data) {
            var buffer = "",
                stack1;
            buffer += " ";
            stack1 = helpers.each.call(depth0, depth0, {
                hash: {},
                inverse: self.noop,
                fn: self.program(2, program2, data),
                data: data
            });
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += " ";
            return buffer
        }

        function program2(depth0, data) {
            var buffer = "";
            buffer += '\r\n        <tr class="text-c">\r\n            <td>' + escapeExpression(typeof depth0 === functionType ? depth0.apply(depth0) : depth0) + "</td>\r\n        </tr>\r\n        ";
            return buffer
        }

        function program4(depth0, data) {
            return '\r\n        <tr>\r\n            <td class="text-c" colspan="8">查无数据</td>\r\n        </tr>\r\n        '
        }
        buffer += '  \r\n<table class="record mt40">\r\n    <thead class="text-c">\r\n        <tr>\r\n            <td colspan="5">贷款申请信息</td>\r\n        </tr>\r\n    </thead>\r\n    <tbody>\r\n        <tr>\r\n            <td style="width: 250px">平台类型</td>\r\n            <td style="width: 250px">信贷平台代码</td>\r\n            <td style="width: 250px">贷款申请时间</td>\r\n            <td style="width: 250px">申请金额区间</td>\r\n            <td style="width: 250px">申请结果</td>\r\n        </tr>\r\n        ';
        stack1 = helpers["if"].call(depth0, depth0, {
            hash: {},
            inverse: self.program(4, program4, data),
            fn: self.program(1, program1, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '\r\n    </tbody>\r\n</table>\r\n<div>\r\n    说明：贷款申请信息模块查询时间段为近24个月。\r\n</div>\r\n<table class="record mt40">\r\n    <thead class="text-c">\r\n        <tr>\r\n            <td colspan="4">贷款放贷信息</td>\r\n        </tr>\r\n    </thead>\r\n    <tbody>\r\n        <tr>\r\n            <td style="width: 250px">平台类型</td>\r\n            <td style="width: 250px">信贷平台代码</td>\r\n            <td style="width: 250px">贷款申请时间</td>\r\n            <td style="width: 250px">申请金额区间</td>\r\n        </tr>\r\n        <tr>\r\n            <td style="width: 250px">平台类型</td>\r\n            <td style="width: 250px">信贷平台代码</td>\r\n            <td style="width: 250px">贷款申请时间</td>\r\n            <td style="width: 250px">申请金额区间</td>\r\n        </tr>\r\n        <tr>\r\n            <td style="width: 250px">平台类型</td>\r\n            <td style="width: 250px">信贷平台代码</td>\r\n            <td style="width: 250px">贷款申请时间</td>\r\n            <td style="width: 250px">申请金额区间</td>\r\n        </tr>\r\n        <tr>\r\n            <td style="width: 250px">信贷平台代码</td>\r\n            <td style="width: 250px">贷款申请时间</td>\r\n            <td style="width: 250px">申请金额区间</td>\r\n            <td style="width: 250px">申请结果</td>\r\n        </tr>\r\n    </tbody>\r\n</table>\r\n<div>\r\n    说明：贷款放贷信息模块查询时间段为近24个月。\r\n</div>\r\n<table class="record mt40">\r\n    <thead class="text-c">\r\n        <tr>\r\n            <td colspan="4">贷款不良信息</td>\r\n        </tr>\r\n    </thead>\r\n    <tbody>\r\n        <tr>\r\n            <td style="width: 250px">信贷黑名单</td>\r\n            <td style="width: 250px">传统金融机构逾期</td>\r\n            <td style="width: 250px">互联网信贷逾期</td>\r\n            <td style="width: 250px">催收被呼记录</td>\r\n        </tr>\r\n        <tr>\r\n            <td style="width: 250px">平台类型</td>\r\n            <td style="width: 250px">信贷平台代码</td>\r\n            <td style="width: 250px">贷款申请时间</td>\r\n            <td style="width: 250px">申请金额区间</td>\r\n        </tr>\r\n    </tbody>\r\n</table>\r\n<div>\r\n    说明：金融/信贷信息数据包含银行、P2P、小贷、消费类分期、现金类分期以及非银行其他。\r\n</div>';
        return buffer
    })
});