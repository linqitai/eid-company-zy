define("xg/eid-company-zy/1.0.4/p/report/clBehavior-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
    var Handlebars = require("alinw/handlebars/1.3.0/runtime-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, ">= 1.0.0"];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        var buffer = "",
            stack1, helper, functionType = "function",
            escapeExpression = this.escapeExpression,
            self = this;

        function program1(depth0, data) {
            var buffer = "",
                stack1, helper;
            buffer += '\r\n        <tr>\r\n            <td style="width: 400px">校验项</td>\r\n            <td style="width: 600px">比对结果</td>\r\n           \r\n        </tr>\r\n        <tr>\r\n            <td style="width: 400px">姓名-身份证校验</td>\r\n            <td style="width: 600px" class="report-content">';
            if (helper = helpers.idAndName) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.idAndName;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + '</td>\r\n        </tr>\r\n         <tr>\r\n            <td style="width: 400px">身份证-人脸校验</td>\r\n            <td style="width: 600px" class="report-content">';
            if (helper = helpers.idAndFace) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.idAndFace;
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
        buffer += '<div class="title overflowHidden mt50" id="clBehavior">\r\n    <div class="text-c" id="reportTitle" style="font-size:40px;">身份核验信息</div> <!--titleIconOrange-->\r\n</div>\r\n<table class="record mt40">\r\n    <thead class="text-c">\r\n        <tr>\r\n            <td class="title-bold" colspan="4">身份信息核验</td>\r\n        </tr>\r\n    </thead>\r\n    <tbody>\r\n        ';
        stack1 = helpers["if"].call(depth0, depth0, {
            hash: {},
            inverse: self.program(3, program3, data),
            fn: self.program(1, program1, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '\r\n    </tbody>\r\n</table>\r\n\r\n<table class="record mt40">\r\n    <thead class="text-c">\r\n        <tr>\r\n            <td class="title-bold" colspan="4">手机三要素校验</td>\r\n        </tr>\r\n    </thead>\r\n    <tbody>\r\n        <tr>\r\n            <td style="width: 400px">校验项</td>\r\n            <td style="width: 600px">比对结果</td>\r\n           \r\n        </tr>\r\n        <tr>\r\n            <td style="width: 400px">姓名+身份证+手机</td>\r\n            <td style="width: 600px" class="report-content">';
        if (helper = helpers.three) {
            stack1 = helper.call(depth0, {
                hash: {},
                data: data
            })
        } else {
            helper = depth0 && depth0.three;
            stack1 = typeof helper === functionType ? helper.call(depth0, {
                hash: {},
                data: data
            }) : helper
        }
        buffer += escapeExpression(stack1) + '</td>\r\n        </tr>\r\n    </tbody>\r\n</table>\r\n<div style="margin:20px;font-size:18px;color:#242424; line-height:30px;">\r\n    说明：身份核验通过人脸算法比对权威机构数据，校验得出，包含全国数据。\r\n</div>\r\n';
        return buffer
    })
});