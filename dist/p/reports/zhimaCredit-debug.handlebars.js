define("xg/eid-company-zy/1.0.4/p/reports/zhimaCredit-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
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
                stack1, helper;
            buffer += ' \r\n        <tr class="text-c">\r\n            <td>';
            if (helper = helpers.score) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.score;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + "</td>\r\n        </tr>\r\n        ";
            return buffer
        }

        function program3(depth0, data) {
            return '\r\n        <tr>\r\n            <td class="text-c" colspan="8">查无数据</td>\r\n        </tr>\r\n        '
        }
        buffer += '<h2 class="text-c">芝麻信息</h2>\r\n<table class="record mt40">\r\n    <tbody>\r\n        <tr>\r\n            <td>申请欺诈评分</td>\r\n        </tr>\r\n        ';
        stack1 = helpers["if"].call(depth0, depth0, {
            hash: {},
            inverse: self.program(3, program3, data),
            fn: self.program(1, program1, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += "\r\n    </tbody>\r\n</table>\r\n<br>\r\n<p style='line-height:30px;'>说明：申请欺诈评分，评分范围为0-100分，其中0分表示无法识别申请信息风险；1-100\r\n分为有效识别，分数越高，风险越小。建议方案的评分阀值40-80分，≦40分直接拒绝，≧80分通过，40-80分的客户建议结合其他信息，进行重点核查。       \r\n阅读须知：<br>\r\n1.本报告的著作权属于杭州信鸽金融信息股份有限公司（简称“信鸽金服”），未经书面许可，不得擅自复制、摘录、编辑、转载、披露和发表。<br>\r\n2.使用本报告，需经过被查询人授权，信鸽金服不承担因授权不充分引起的任何法律责任。<br>\r\n3.本报告中，除信鸽金服的特殊标注外，报告中的信息均由相关数据来源机构和信息主体提供，信鸽金服不保证其真实性和准确性，但承诺在信息整合、汇总、展示的过程中保持客观、中立的地位。<br>\r\n4.本报告反馈的结果仅供参考，对于使用该结果做出的决策导致的后果，信鸽金服不承担任何责任。<br>\r\n5.仅限内部使用，请妥善保管本报告，并注意保密。</p>\r\n";
        return buffer
    })
});