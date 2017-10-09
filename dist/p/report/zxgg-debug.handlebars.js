define("xg/eid-company-zy/1.0.4/p/report/zxgg-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
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
                stack1, helper, options;
            buffer += '\r\n        <tr>\r\n            <td style="width:100px;">执行公告</td>\r\n            <td style="width:120px;" class="report-content">' + escapeExpression((helper = helpers.substrNum || depth0 && depth0.substrNum, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, (stack1 = depth0 && depth0[0], stack1 == null || stack1 === false ? stack1 : stack1.context), options) : helperMissing.call(depth0, "substrNum", (stack1 = depth0 && depth0[0], stack1 == null || stack1 === false ? stack1 : stack1.context), options))) + '</td>\r\n            <td style="width:100px;">失信公告</td>\r\n            <td style="width:120px;" class="report-content">' + escapeExpression((helper = helpers.substrNum || depth0 && depth0.substrNum, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, (stack1 = depth0 && depth0[1], stack1 == null || stack1 === false ? stack1 : stack1.context), options) : helperMissing.call(depth0, "substrNum", (stack1 = depth0 && depth0[1], stack1 == null || stack1 === false ? stack1 : stack1.context), options))) + '</td>\r\n            <td style="width:100px;">曝光台</td>\r\n            <td style="width:120px;" class="report-content">' + escapeExpression((helper = helpers.substrNum || depth0 && depth0.substrNum, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, (stack1 = depth0 && depth0[4], stack1 == null || stack1 === false ? stack1 : stack1.context), options) : helperMissing.call(depth0, "substrNum", (stack1 = depth0 && depth0[4], stack1 == null || stack1 === false ? stack1 : stack1.context), options))) + '</td>\r\n            <td style="width:100px;">法院公告</td>\r\n            <td style="width:120px;" class="report-content">' + escapeExpression((helper = helpers.substrNum || depth0 && depth0.substrNum, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, (stack1 = depth0 && depth0[2], stack1 == null || stack1 === false ? stack1 : stack1.context), options) : helperMissing.call(depth0, "substrNum", (stack1 = depth0 && depth0[2], stack1 == null || stack1 === false ? stack1 : stack1.context), options))) + '</td>\r\n        </tr>\r\n        <tr>\r\n            <td style="width:100px;">开庭公告</td>\r\n            <td style="width:120px;" class="report-content">' + escapeExpression((helper = helpers.substrNum || depth0 && depth0.substrNum, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, (stack1 = depth0 && depth0[5], stack1 == null || stack1 === false ? stack1 : stack1.context), options) : helperMissing.call(depth0, "substrNum", (stack1 = depth0 && depth0[5], stack1 == null || stack1 === false ? stack1 : stack1.context), options))) + '</td>\r\n            <td style="width:100px;">案件流程</td>\r\n            <td style="width:120px;" class="report-content">' + escapeExpression((helper = helpers.substrNum || depth0 && depth0.substrNum, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, (stack1 = depth0 && depth0[6], stack1 == null || stack1 === false ? stack1 : stack1.context), options) : helperMissing.call(depth0, "substrNum", (stack1 = depth0 && depth0[6], stack1 == null || stack1 === false ? stack1 : stack1.context), options))) + '</td>\r\n            <td style="width:100px;">裁判文书</td>\r\n            <td style="width:120px;" class="report-content">' + escapeExpression((helper = helpers.substrNum || depth0 && depth0.substrNum, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, (stack1 = depth0 && depth0[3], stack1 == null || stack1 === false ? stack1 : stack1.context), options) : helperMissing.call(depth0, "substrNum", (stack1 = depth0 && depth0[3], stack1 == null || stack1 === false ? stack1 : stack1.context), options))) + '</td>\r\n            <td style="width:100px;">网贷黑名单</td>\r\n            <td style="width:120px;" class="report-content">' + escapeExpression((helper = helpers.substrNum || depth0 && depth0.substrNum, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, (stack1 = depth0 && depth0[7], stack1 == null || stack1 === false ? stack1 : stack1.context), options) : helperMissing.call(depth0, "substrNum", (stack1 = depth0 && depth0[7], stack1 == null || stack1 === false ? stack1 : stack1.context), options))) + "</td>\r\n        </tr>\r\n         ";
            return buffer
        }

        function program3(depth0, data) {
            return '\r\n        <tr>\r\n            <td class="text-c" colspan="8">查无数据</td>\r\n        </tr>\r\n        '
        }
        buffer += '<h2 class="text-c mt50" style="font-size:40px;margin-bottom:40px;">法院涉诉信息</h2>\r\n<table class="consumeBehavior">\r\n    <thead class="text-c">\r\n        <tr>\r\n            <td class="title-bold" colspan="8">法院信息汇总</td>\r\n        </tr>\r\n    </thead>\r\n    <tbody>\r\n        ';
        stack1 = helpers["if"].call(depth0, depth0, {
            hash: {},
            inverse: self.program(3, program3, data),
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