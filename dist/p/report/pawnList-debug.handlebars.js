define("xg/eid-company-zy/1.0.4/p/report/pawnList-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
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
            buffer += "\r\n            ";
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
                helper, options;
            buffer += '\r\n                <tr>\r\n                    <td><span class="ellipsis w140">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.item, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.item, options))) + '</span></td>\r\n                    <td><span class="ellipsis w140">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.amount, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.amount, options))) + '</span></td>\r\n                    <td><span class="ellipsis w140">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.from, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.from, options))) + '</span></td>\r\n                    <td><span class="ellipsis w140">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.dateTime, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.dateTime, options))) + '</span></td>\r\n                    <td><span class="ellipsis w140">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.breachAction, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.breachAction, options))) + '</span></td>\r\n                    <td><span class="ellipsis w140">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.description, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.description, options))) + "</span></td>\r\n                </tr>\r\n            ";
            return buffer
        }

        function program4(depth0, data) {
            return '\r\n            <tr>\r\n                <td class="text-c" colspan="6">--</td>\r\n            </tr>\r\n        '
        }
        buffer += '<table class="record mt40">\r\n    <thead class="text-c">\r\n    <tr><td class="title-bold" colspan="6">典当行为记录</td></tr>\r\n    <tr>\r\n        <td>典当物品</td>\r\n        <td>典当金额</td>\r\n        <td>典当地点</td>\r\n        <td>典当时间</td>\r\n        <td>违约行为</td>\r\n        <td>描述</td>\r\n    </tr>\r\n    </thead>\r\n    <tbody>\r\n        ';
        stack1 = helpers["if"].call(depth0, depth0, {
            hash: {},
            inverse: self.program(4, program4, data),
            fn: self.program(1, program1, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += "\r\n\r\n\r\n    </tbody>\r\n</table>";
        return buffer
    })
});