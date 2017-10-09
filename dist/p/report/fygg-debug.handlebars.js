define("xg/eid-company-zy/1.0.4/p/report/fygg-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
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
            buffer += '\r\n        <tr>\r\n            <td rowspan="5" style="width:120px;">' + escapeExpression((helper = helpers.addOne || depth0 && depth0.addOne, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, data == null || data === false ? data : data.index, options) : helperMissing.call(depth0, "addOne", data == null || data === false ? data : data.index, options))) + '</td>\r\n            <td>姓名</td>\r\n            <td >发布时间</td>\r\n            <td >法院名称</td>\r\n            <td >公告类型</td>\r\n        </tr>\r\n        <tr>\r\n            <td class="report-content">';
            if (helper = helpers.pname) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.pname;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + '</td>\r\n            <td class="report-content">';
            if (helper = helpers.sortTimeString) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.sortTimeString;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + '</td>\r\n            <td class="report-content">';
            if (helper = helpers.court) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.court;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + '</td>\r\n            <td class="report-content">';
            if (helper = helpers.ggType) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.ggType;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + '</td>\r\n        </tr>\r\n        <tr>\r\n            <td >公告版面</td>\r\n            <td class="match-level">匹配度</td>\r\n            <td colspan="4">内容概要</td>\r\n        </tr>\r\n        <tr>\r\n            <td class="report-content">';
            if (helper = helpers.layout) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.layout;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.matching || depth0 && depth0.matching, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.matchRatio, options) : helperMissing.call(depth0, "matching", depth0 && depth0.matchRatio, options))) + '</td>\r\n            <td colspan="4" class="report-content">';
            if (helper = helpers.body) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.body;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + "</td>\r\n        </tr>\r\n        ";
            return buffer
        }

        function program4(depth0, data) {
            return '\r\n        <tr>\r\n            <td  style="width:120px;">1</td>\r\n            <td class="text-c" colspan="8">查无数据</td>\r\n        </tr>\r\n        '
        }
        buffer += '<table class="record mt40">\r\n    <thead class="text-c">\r\n        <tr>\r\n            <td style="width:120px;">序号</td>\r\n            <td class="title-bold" colspan="5">法院公告</td>\r\n        </tr>\r\n    </thead>\r\n    <tbody>\r\n        ';
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