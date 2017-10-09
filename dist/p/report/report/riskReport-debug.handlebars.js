define("xg/eid-company/1.0.4/p/report/report/riskReport-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
    var Handlebars = require("alinw/handlebars/1.3.0/runtime-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, ">= 1.0.0"];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        var buffer = "",
            stack1, self = this,
            helperMissing = helpers.helperMissing;

        function program1(depth0, data) {
            var buffer = "",
                stack1, helper, options;
            buffer += '\r\n        <tr>\r\n            <td style="width:120px;">身份信息核验</td>\r\n            <td >被查询人三要素及人脸校验</td>\r\n            <td class="level-block">\r\n                ';
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(2, program2, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.infoCheck, "==", "1", options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.infoCheck, "==", "1", options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += " ";
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(4, program4, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.infoCheck, "==", "2", options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.infoCheck, "==", "2", options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += " ";
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(6, program6, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.infoCheck, "==", "3", options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.infoCheck, "==", "3", options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += '\r\n            </td>\r\n        </tr>\r\n        <tr>\r\n            <td style="width:120px;">公安负面信息</td>\r\n            <td >被查询人命中公安负面信息</td>\r\n            <td class="level-block">\r\n                ';
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(2, program2, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.police, "==", "1", options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.police, "==", "1", options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += " ";
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(4, program4, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.police, "==", "2", options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.police, "==", "2", options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += " ";
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(6, program6, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.police, "==", "3", options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.police, "==", "3", options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += '\r\n            </td>\r\n        </tr>\r\n        <tr>\r\n            <td style="width:120px;">法院涉诉信息</td>\r\n            <td >被查询人命中法院涉诉信息</td>\r\n            <td class="level-block">\r\n                ';
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(2, program2, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.court, "==", "1", options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.court, "==", "1", options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += " ";
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(4, program4, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.court, "==", "2", options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.court, "==", "2", options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += " ";
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(6, program6, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.court, "==", "3", options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.court, "==", "3", options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += '\r\n            </td>\r\n        </tr>\r\n        <tr>\r\n            <td style="width:120px;" rowspan="3">金融信贷信息</td>\r\n            <td >被查询人存在多次申请信息</td>\r\n            <td class="level-block">\r\n                ';
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(2, program2, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.apply, "==", "1", options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.apply, "==", "1", options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += " ";
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(4, program4, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.apply, "==", "2", options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.apply, "==", "2", options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += " ";
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(6, program6, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.apply, "==", "3", options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.apply, "==", "3", options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += '\r\n            </td>\r\n        </tr>\r\n        <tr>\r\n            <td >被查询人存在多头借贷信息</td>\r\n            <td class="level-block">\r\n                ';
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(2, program2, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.lend, "==", "1", options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.lend, "==", "1", options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += " ";
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(4, program4, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.lend, "==", "2", options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.lend, "==", "2", options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += " ";
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(6, program6, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.lend, "==", "3", options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.lend, "==", "3", options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += '\r\n            </td>\r\n        </tr>\r\n        <tr>\r\n            <td >被查询人命中信贷不良信息</td>\r\n            <td class="level-block">\r\n                ';
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(2, program2, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.zaRisk, "==", "1", options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.zaRisk, "==", "1", options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += " ";
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(4, program4, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.zaRisk, "==", "2", options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.zaRisk, "==", "2", options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += " ";
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(6, program6, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.zaRisk, "==", "3", options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.zaRisk, "==", "3", options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += '\r\n            </td>\r\n        </tr>\r\n        <tr>\r\n            <td style="width:120px;" rowspan="2">其他综合信息</td>\r\n            <td >被查询人手机号</td>\r\n            <td class="level-block">\r\n                ';
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(2, program2, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.mobileInfo, "==", "1", options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.mobileInfo, "==", "1", options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += " ";
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(4, program4, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.mobileInfo, "==", "2", options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.mobileInfo, "==", "2", options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += " ";
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(6, program6, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.mobileInfo, "==", "3", options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.mobileInfo, "==", "3", options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += '\r\n            </td>\r\n        </tr>\r\n         <tr>\r\n            <td >特殊名单核查</td>\r\n            <td class="level-block">\r\n                ';
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(2, program2, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.special, "==", "1", options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.special, "==", "1", options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += " ";
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(4, program4, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.special, "==", "2", options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.special, "==", "2", options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += " ";
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(6, program6, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.special, "==", "3", options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.special, "==", "3", options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += "\r\n            </td>\r\n        </tr>\r\n        ";
            return buffer
        }

        function program2(depth0, data) {
            return "\r\n                <div class=\"level-green\"></div><div class='green-span'>绿</div>\r\n                "
        }

        function program4(depth0, data) {
            return "\r\n                <div class=\"level-yellow\"></div><div class='yellow-span'>黄</div>\r\n                "
        }

        function program6(depth0, data) {
            return "\r\n                <div class=\"level-red\"></div><div class='red-span'>红</div>\r\n                "
        }

        function program8(depth0, data) {
            return '\r\n        <tr>\r\n            <td class="text-c" colspan="8">查无数据</td>\r\n        </tr>\r\n        '
        }
        buffer += '<table class="record mt40">\r\n    <tbody>\r\n        <tr>\r\n            <td class="title-bold" colspan="3">身份风险汇总</td>\r\n        </tr>\r\n        <tr>\r\n            <td style="width:120px;">风险类型</td>\r\n            <td >规则</td>\r\n            <td >风险等级</td>\r\n        </tr>\r\n        ';
        stack1 = helpers["if"].call(depth0, depth0, {
            hash: {},
            inverse: self.program(8, program8, data),
            fn: self.program(1, program1, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '\r\n    </tbody>\r\n</table>\r\n    <p style="margin:20px;font-size:18px;color:#242424;line-height:30px;">说明：汇总信息由相应规则组成</p>\r\n';
        return buffer
    })
});