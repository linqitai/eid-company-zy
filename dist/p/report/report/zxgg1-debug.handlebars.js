define("xg/eid-company/1.0.4/p/report/report/zxgg1-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
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
            buffer += '\r\n        <tr>\r\n            <td rowspan="6" style="width:120px;">' + escapeExpression((helper = helpers.addOne || depth0 && depth0.addOne, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, data == null || data === false ? data : data.index, options) : helperMissing.call(depth0, "addOne", data == null || data === false ? data : data.index, options))) + '</td>\r\n            <td>立案时间</td>\r\n            <td>执行法院</td>\r\n            <td>执行申请人</td>\r\n            <td>被执行人姓名</td>\r\n        </tr>\r\n        <tr>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.sortTimeString, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.sortTimeString, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.court, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.court, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.proposer, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.proposer, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.pname, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.pname, options))) + '</td>\r\n        </tr>\r\n        <tr>\r\n            <td>执行案号</td>\r\n            <td>案件状态</td>\r\n            <td>执行标的</td>\r\n            <td>被执行人身份证号</td>\r\n        </tr>\r\n        <tr>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.caseNo, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.caseNo, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.caseState, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.caseState, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.execMoney, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.execMoney, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.idcardNo, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.idcardNo, options))) + '</td>\r\n        </tr>\r\n        <tr>\r\n            <td class="match-level">匹配度</td>\r\n            <td colspan=\'3\' class="report-content">' + escapeExpression((helper = helpers.matching || depth0 && depth0.matching, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.matchRatio, options) : helperMissing.call(depth0, "matching", depth0 && depth0.matchRatio, options))) + "</td>\r\n        </tr>\r\n        <tr>\r\n            <td>案件概要</td>\r\n            <td colspan='3' class=\"report-content\">" + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.body, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.body, options))) + "</td>\r\n        </tr>\r\n        ";
            return buffer
        }

        function program4(depth0, data) {
            return '\r\n        <tr>\r\n            <td  style="width:120px;">1</td>\r\n            <td colspan="8">查无数据</td>\r\n        </tr>\r\n        '
        }
        buffer += '<table class="record mt40">\r\n    <thead class="text-c">\r\n        <tr>\r\n            <td style="width:120px;">序号</td>\r\n            <td class="title-bold" colspan="4">执行公告</td>\r\n        </tr>\r\n    </thead>\r\n    <tbody>\r\n        ';
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