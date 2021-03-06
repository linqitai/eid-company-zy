define("xg/eid-company/1.0.4/p/report/report/personalIcbc2-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
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
            var buffer = "",
                helper, options;
            buffer += '\r\n        <tr class="text-c">\r\n            <td style="width:40%">公司名称</td>\r\n            <td style="width:60%" class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.entName, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.entName, options))) + '</td>\r\n        </tr>\r\n        <tr class="text-c" >\r\n            <td>注册号码</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.regNo, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.regNo, options))) + '</td>\r\n        </tr>\r\n        \r\n        <tr class="text-c" >\r\n            <td>公司类型</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.entType, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.entType, options))) + '</td>\r\n        </tr>\r\n        <tr class="text-c" >\r\n            <td>注册资本（万元）</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.regCap, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.regCap, options))) + '</td>\r\n        </tr>\r\n        <tr class="text-c" >\r\n            <td>注册币种</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.regCapCur, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.regCapCur, options))) + '</td>\r\n        </tr>\r\n        <tr class="text-c" >\r\n            <td>企业状态</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.entStatus, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.entStatus, options))) + '</td>\r\n        </tr>\r\n        <tr class="text-c" >\r\n            <td>认缴出资额（万元）</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.subConam, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.subConam, options))) + '</td>\r\n        </tr>\r\n        <tr class="text-c" >\r\n            <td>认缴出资币种</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.currency, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.currency, options))) + '</td>\r\n        </tr>\r\n        <tr class="text-c" >\r\n            <td>出资比例</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.fundedRatio, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.fundedRatio, options))) + '</td>\r\n        </tr>\r\n        <tr class="text-c" >\r\n            <td>出资方式</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.conFrom, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.conFrom, options))) + '</td>\r\n        </tr>\r\n        <tr class="text-c" >\r\n            <td style="border: none;"></td>\r\n            <td style="border: none;"></td>\r\n        </tr>\r\n        ';
            return buffer
        }

        function program4(depth0, data) {
            return '\r\n        <tr>\r\n            <td class="text-c" colspan="8">查无数据</td>\r\n        </tr>\r\n        '
        }
        buffer += '<table class="record mt40">\r\n    <thead class="text-c">\r\n        <tr>\r\n            <td class="title-bold" colspan="10">个人股权投资信息</td>\r\n        </tr>\r\n    </thead>\r\n    <tbody>\r\n        ';
        stack1 = helpers["if"].call(depth0, depth0, {
            hash: {},
            inverse: self.program(4, program4, data),
            fn: self.program(1, program1, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += "\r\n    </tbody>\r\n</table>";
        return buffer
    })
});