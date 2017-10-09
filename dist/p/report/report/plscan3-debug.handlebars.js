define("xg/eid-company/1.0.4/p/report/report/plscan3-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
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
            var buffer = "",
                stack1;
            buffer += '\r\n        <tr class="text-c">\r\n            ';
            stack1 = helpers.each.call(depth0, depth0, {
                hash: {},
                inverse: self.noop,
                fn: self.program(3, program3, data),
                data: data
            });
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += "\r\n        </tr>\r\n        ";
            return buffer
        }

        function program3(depth0, data) {
            var buffer = "";
            buffer += "\r\n            <td>" + escapeExpression(typeof depth0 === functionType ? depth0.apply(depth0) : depth0) + "</td>\r\n            ";
            return buffer
        }

        function program5(depth0, data) {
            return '\r\n        <tr>\r\n            <td class="text-c" colspan="8">查无数据</td>\r\n        </tr>\r\n        '
        }
        buffer += ' <table class="record mt40">\r\n    <thead class="text-c">\r\n        <tr>\r\n            <td class="title-bold" colspan="5">信贷不良信息</td>\r\n        </tr>\r\n    </thead>\r\n    <tbody>\r\n        ';
        stack1 = helpers["if"].call(depth0, depth0, {
            hash: {},
            inverse: self.program(5, program5, data),
            fn: self.program(1, program1, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '\r\n    </tbody>\r\n</table>\r\n\r\n<h4 style="margin:20px;font-size:18px;color:#242424;">说明：金融/信贷信息数据包含银行、P2P、小贷、消费类分期、现金类分期以及非银行其他。</h4>\r\n \r\n';
        return buffer
    })
});