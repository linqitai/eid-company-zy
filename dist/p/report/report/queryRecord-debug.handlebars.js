define("xg/eid-company/1.0.4/p/report/report/queryRecord-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
    var Handlebars = require("alinw/handlebars/1.3.0/runtime-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, ">= 1.0.0"];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        var buffer = "",
            stack1, helper, options, helperMissing = helpers.helperMissing,
            escapeExpression = this.escapeExpression,
            self = this;

        function program1(depth0, data) {
            return '\r\n<img src="http://static.hpbanking.com/xg/uploads/files/94196af2166944470261b4926e7aab80-46-40.png" alt="" style="position: absolute; top: 22px;right:306px;">\r\n'
        }

        function program3(depth0, data) {
            return '\r\n    <img src="http://static.hpbanking.com/xg/uploads/files/1828e0372555fc87ab86752ee310dd81-46-40.png" alt="" style="position: absolute; top: 22px;right:306px;">\r\n'
        }

        function program5(depth0, data) {
            return '\r\n<img src="http://static.hpbanking.com/xg/uploads/files/e0f2c0db696f1870316139f8ac17a294-46-40.png" alt="" style="position: absolute; top: 22px;right:306px;">\r\n\r\n'
        }

        function program7(depth0, data) {
            var buffer = "",
                stack1;
            buffer += " ";
            stack1 = helpers.each.call(depth0, depth0, {
                hash: {},
                inverse: self.noop,
                fn: self.program(8, program8, data),
                data: data
            });
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += "\r\n        ";
            return buffer
        }

        function program8(depth0, data) {
            var buffer = "",
                helper, options;
            buffer += '\r\n        <tr>\r\n            <td style="width:120px;">' + escapeExpression((helper = helpers.addOne || depth0 && depth0.addOne, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, data == null || data === false ? data : data.index, options) : helperMissing.call(depth0, "addOne", data == null || data === false ? data : data.index, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.address, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.address, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.formatDateFull || depth0 && depth0.formatDateFull, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.time, options) : helperMissing.call(depth0, "formatDateFull", depth0 && depth0.time, options))) + "</td>\r\n        </tr>\r\n        ";
            return buffer
        }

        function program10(depth0, data) {
            return '\r\n        <tr>\r\n            <td class="text-c" colspan="8">查无数据</td>\r\n        </tr>\r\n        '
        }
        buffer += '<h2 class="text-c mt50" style="font-size:40px;">身份标识报告</h2>\r\n';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(1, program1, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.max, "==", 1, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.max, "==", 1, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += "\r\n";
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(3, program3, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.max, "==", 2, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.max, "==", 2, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += "\r\n\r\n";
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(5, program5, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.max, "==", 3, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.max, "==", 3, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '\r\n<table class="record mt40">\r\n    <tbody>\r\n        <tr>\r\n            <td colspan="3">身份标识报告查询汇总（近三个月）</td>\r\n        </tr>\r\n        <tr>\r\n            <td style="width:120px;">序号</td>\r\n            <td >查询机构地点</td>\r\n            <td >查询时间</td>\r\n        </tr>\r\n        ';
        stack1 = helpers["if"].call(depth0, depth0, {
            hash: {},
            inverse: self.program(10, program10, data),
            fn: self.program(7, program7, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += "\r\n    </tbody>\r\n</table>";
        return buffer
    })
});