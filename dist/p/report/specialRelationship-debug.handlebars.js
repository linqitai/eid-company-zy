define("xg/eid-company-zy/1.0.4/p/report/specialRelationship-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
    var Handlebars = require("alinw/handlebars/1.3.0/runtime-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, ">= 1.0.0"];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        var buffer = "",
            stack1, helperMissing = helpers.helperMissing,
            escapeExpression = this.escapeExpression,
            functionType = "function",
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
            buffer += "\r\n        ";
            return buffer
        }

        function program2(depth0, data) {
            var buffer = "",
                stack1, helper, options;
            buffer += '\r\n        <tr class="text-c">\r\n            <td style="width:120px;">' + escapeExpression((helper = helpers.addOne || depth0 && depth0.addOne, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, data == null || data === false ? data : data.index, options) : helperMissing.call(depth0, "addOne", data == null || data === false ? data : data.index, options))) + '</td>\r\n            <td class="report-content">';
            if (helper = helpers.flag) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.flag;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + '</td>\r\n            <td class="report-content">';
            if (helper = helpers.content) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.content;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + "</td>\r\n        </tr> ";
            return buffer
        }

        function program4(depth0, data) {
            return '\r\n        <tr>\r\n            <td class="text-c" colspan="8">查无数据</td>\r\n        </tr>\r\n        '
        }
        buffer += '<h3 class="text-c title-bold">特殊名单核查</h3>\r\n<table class="record mt40">\r\n    <tbody>\r\n        <tr>\r\n            <td>序号</td>\r\n            <td>关系等级</td>\r\n            <td>命中内容</td>\r\n            \r\n        </tr>\r\n        ';
        stack1 = helpers["if"].call(depth0, depth0, {
            hash: {},
            inverse: self.program(4, program4, data),
            fn: self.program(1, program1, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '\r\n    </tbody>\r\n</table>\r\n<br>\r\n<p style="margin-bottom:10px;margin-left:20px;font-size:18px;color:#242424;line-height:30px;">说明：<br>\r\n    1、一度关系：EID关系库中与本人有直接关联的人，一般是直系亲属、关系紧密的朋友；二度关系：EID关系库中与一度关系有直接关系的人。<br>\r\n    2、风险类型：高危行为、电信欠费、法院失信人、不良、短时逾期、资信不佳、失联、拒绝。高危行为：申请信息中身份证号关联多个（>3个）手机号、或手机号关联多个（>3个）身份证号；不良：逾期90天以上未还；短时逾期：逾期30/60/90天内未还；拒绝：因某些原因判定为不良而拒绝的；资信不佳：提供的申请资料未达到准入标准、信息被伪冒。<br>\r\n    3、客户类型：银行、非银：P2P、小贷、消费类分期、现金类分期、代偿类分期、其他（信保、信托等）。消费类分期：借贷用于购买消费品并分期偿还的业务；现金类分期：支取现金并分期偿还的业务；代偿类分期：借贷用于偿还已有借款并分期偿还的业务；非银其他：包括担保、信保等。\r\n</p>\r\n';
        return buffer
    })
});