define("xg/eid-company-zy/1.0.4/p/report/consumeBehavior-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
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
                stack1, helper;
            buffer += '\r\n        <tr class="text-c">\r\n            <td>';
            if (helper = helpers.bankType) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.bankType;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + "</td>\r\n            <td>";
            if (helper = helpers.platformcode) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.platformcode;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + "</td>\r\n            <td>";
            if (helper = helpers.applicationtime) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.applicationtime;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + "</td>\r\n            <td>";
            if (helper = helpers.applicationamount) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.applicationamount;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + "</td>\r\n            <td>";
            if (helper = helpers.applicationresult) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.applicationresult;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + "</td>\r\n        </tr>\r\n        ";
            return buffer
        }

        function program4(depth0, data) {
            return '\r\n        <tr>\r\n            <td class="text-c" colspan="8">查无数据</td>\r\n        </tr>\r\n        '
        }
        buffer += '\r\n<table class="consumeBehavior">\r\n     <thead class="text-c">\r\n        <tr>\r\n            <td>序号</td>\r\n            <td class="title-bold" colspan="3">执行公告</td>\r\n        </tr>\r\n    </thead>\r\n    <tbody>\r\n    <tr>\r\n        <td rowspan="5">1</td>\r\n        <td style="width:310px;">立案时间</td>\r\n        <td style="width:310px;">执行法院</td>\r\n        <td style="width:310px;">执行申请人</td>\r\n    </tr>\r\n     <tr>\r\n        <td style="width:310px;">立案时间</td>\r\n        <td style="width:310px;">执行法院</td>\r\n        <td style="width:310px;">执行申请人</td>\r\n    </tr>\r\n    <tr>\r\n        <td style="width:310px;">执行暗号</td>\r\n        <td style="width:310px;">案件状态</td>\r\n        <td style="width:310px;">执行标的</td>\r\n    </tr>\r\n    <tr>\r\n        <td style="width:310px;">执行暗号</td>\r\n        <td style="width:310px;">案件状态</td>\r\n        <td style="width:310px;">执行标的</td>\r\n    </tr>\r\n     <tr>\r\n        <td style="width:310px;">案件概要</td>\r\n        <td colspan="2">案件状态</td>\r\n\r\n    </tr>\r\n    </tbody>\r\n</table>\r\n<table class="consumeBehavior">\r\n     <thead class="text-c">\r\n        <tr>\r\n            <td style="width:70px;">序号</td>\r\n            <td colspan="2">失信公告</td>\r\n        </tr>\r\n    </thead>\r\n    <tbody>\r\n    <tr>\r\n        <td rowspan="5">1</td>\r\n        <td >立案时间</td>\r\n        <td style="width:700px;">被执行人履历情况</td>\r\n    </tr>\r\n     <tr>\r\n        <td >执行法院</td>\r\n        <td>执行申请人</td>\r\n    </tr>\r\n    <tr>\r\n        <td >案件执行案号</td>\r\n        <td>执行法院</td>\r\n    </tr>\r\n    <tr>\r\n        <td >执行暗号</td>\r\n        <td >案件状态</td>\r\n    </tr>\r\n     <tr>\r\n        <td >内容摘要</td>\r\n        <td >案件状态</td>\r\n\r\n    </tr>\r\n    </tbody>\r\n</table>\r\n<table class="consumeBehavior">\r\n     <thead class="text-c">\r\n        <tr>\r\n            <td style="width:100px;">序号</td>\r\n            <td colspan="3">法院公告</td>\r\n        </tr>\r\n    </thead>\r\n    <tbody>\r\n    <tr>\r\n        <td rowspan="5">1</td>\r\n        <td style="width:300px;">发布时间</td>\r\n        <td style="width:300px;">法院名称</td>\r\n        <td style="width:300px;">公告类型</td>\r\n    </tr>\r\n     <tr>\r\n        <td style="width:300px;">发布时间</td>\r\n        <td style="width:300px;">法院名称</td>\r\n        <td style="width:300px;">公告类型</td>\r\n    </tr>\r\n    <tr>\r\n        <td >内容概要</td>\r\n        <td colspan="2"> 执行法院</td>\r\n    </tr>\r\n    </tbody>\r\n</table>\r\n<table class="consumeBehavior">\r\n     <thead class="text-c">\r\n        <tr>\r\n            <td style="width:70px;">序号</td>\r\n            <td colspan="3">裁判文书</td>\r\n        </tr>\r\n    </thead>\r\n    <tbody>\r\n    <tr>\r\n        <td rowspan="5">1</td>\r\n        <td style="width:270px;">审结时间</td>\r\n        <td style="width:700px;">法院名称</td>\r\n    </tr>\r\n     <tr>\r\n        <td>发布时间</td>\r\n        <td>法院名称</td>\r\n    </tr>\r\n    <tr>\r\n        <td>案号</td>\r\n        <td>案由</td>\r\n    </tr>\r\n    <tr>\r\n        <td>案号</td>\r\n        <td>案由</td>\r\n    </tr>\r\n    <tr>\r\n        <td >内容概要</td>\r\n        <td colspan="2"> 执行法院</td>\r\n    </tr>\r\n    </tbody>\r\n</table>\r\n<table class="consumeBehavior">\r\n     <thead class="text-c">\r\n        <tr>\r\n            <td style="width:100px;">序号</td>\r\n            <td colspan="3">曝光台</td>\r\n        </tr>\r\n    </thead>\r\n    <tbody>\r\n    <tr>\r\n        <td rowspan="5">1</td>\r\n        <td style="width:300px;">立案时间</td>\r\n        <td style="width:300px;">法院名称</td>\r\n        <td style="width:300px;">案由</td>\r\n    </tr>\r\n     <tr>\r\n        <td style="width:300px;">发布时间</td>\r\n        <td style="width:300px;">法院名称</td>\r\n        <td style="width:300px;">公告类型</td>\r\n    </tr>\r\n    <tr>\r\n        <td style="width:300px;">案号</td>\r\n        <td style="width:300px;">依据</td>\r\n        <td style="width:300px;">标的金额</td>\r\n    </tr>\r\n     <tr>\r\n        <td style="width:300px;">发布时间</td>\r\n        <td style="width:300px;">法院名称</td>\r\n        <td style="width:300px;">公告类型</td>\r\n    </tr>\r\n    <tr>\r\n        <td >内容</td>\r\n        <td colspan="2"> 执行法院</td>\r\n    </tr>\r\n    </tbody>\r\n</table>\r\n<table class="consumeBehavior">\r\n     <thead class="text-c">\r\n        <tr>\r\n            <td style="width:100px;">序号</td>\r\n            <td colspan="3">开庭公告</td>\r\n        </tr>\r\n    </thead>\r\n    <tbody>\r\n    <tr>\r\n        <td rowspan="5">1</td>\r\n        <td style="width:300px;">开庭时间</td>\r\n        <td style="width:300px;">原告</td>\r\n        <td style="width:300px;">法院名称</td>\r\n    </tr>\r\n     <tr>\r\n        <td style="width:300px;">发布时间</td>\r\n        <td style="width:300px;">法院名称</td>\r\n        <td style="width:300px;">公告类型</td>\r\n    </tr>\r\n    <tr>\r\n        <td style="width:300px;">案号</td>\r\n        <td style="width:300px;">案由</td>\r\n        <td style="width:300px;">标题</td>\r\n    </tr>\r\n     <tr>\r\n        <td style="width:300px;">发布时间</td>\r\n        <td style="width:300px;">法院名称</td>\r\n        <td style="width:300px;">公告类型</td>\r\n    </tr>\r\n    <tr>\r\n        <td >内容概要</td>\r\n        <td colspan="2"> 执行法院</td>\r\n    </tr>\r\n    </tbody>\r\n</table>\r\n<table class="consumeBehavior">\r\n     <thead class="text-c">\r\n        <tr>\r\n            <td style="width:100px;">序号</td>\r\n            <td colspan="3">案件流程</td>\r\n        </tr>\r\n    </thead>\r\n    <tbody>\r\n    <tr>\r\n        <td rowspan="7">1</td>\r\n        <td style="width:300px;">立案时间</td>\r\n        <td style="width:300px;">立案类型</td>\r\n        <td style="width:300px;">判决日期</td>\r\n    </tr>\r\n     <tr>\r\n        <td style="width:300px;">发布时间</td>\r\n        <td style="width:300px;">法院名称</td>\r\n        <td style="width:300px;">公告类型</td>\r\n    </tr>\r\n    <tr>\r\n        <td style="width:300px;">案号</td>\r\n        <td style="width:300px;">案件状态</td>\r\n        <td style="width:300px;">法院名称</td>\r\n    </tr>\r\n     <tr>\r\n        <td style="width:300px;">发布时间</td>\r\n        <td style="width:300px;">法院名称</td>\r\n        <td style="width:300px;">公告类型</td>\r\n    </tr>\r\n    <tr>\r\n        <td style="width:300px;">审理状态</td>\r\n        <td style="width:300px;">案由</td>\r\n        <td style="width:300px;">诉讼标的</td>\r\n    </tr>\r\n     <tr>\r\n        <td style="width:300px;">发布时间</td>\r\n        <td style="width:300px;">法院名称</td>\r\n        <td style="width:300px;">公告类型</td>\r\n    </tr>\r\n    <tr>\r\n        <td >内容概要</td>\r\n        <td colspan="2"> 执行法院</td>\r\n    </tr>\r\n    </tbody>\r\n</table>\r\n<table class="consumeBehavior">\r\n     <thead class="text-c">\r\n        <tr>\r\n            <td style="width:100px;">序号</td>\r\n            <td colspan="3">网贷 黑名单</td>\r\n        </tr>\r\n    </thead>\r\n    <tbody>\r\n    <tr>\r\n        <td rowspan="5">1</td>\r\n        <td style="width:300px;">贷款时间</td>\r\n        <td style="width:300px;">执行法院</td>\r\n        <td style="width:300px;">来源单位名称</td>\r\n    </tr>\r\n     <tr>\r\n        <td style="width:300px;">发布时间</td>\r\n        <td style="width:300px;">法院名称</td>\r\n        <td style="width:300px;">公告类型</td>\r\n    </tr>\r\n    <tr>\r\n        <td style="width:300px;">未还/罚息</td>\r\n        <td style="width:300px;">本金/本息</td>\r\n        <td style="width:300px;">已还金额</td>\r\n    </tr>\r\n     <tr>\r\n        <td style="width:300px;">发布时间</td>\r\n        <td style="width:300px;">法院名称</td>\r\n        <td style="width:300px;">公告类型</td>\r\n    </tr>\r\n    <tr>\r\n        <td >内容概要</td>\r\n        <td colspan="2"> 执行法院</td>\r\n    </tr>\r\n    </tbody>\r\n</table>\r\n<table class="record mt40">\r\n    <thead class="text-c">\r\n        <tr>\r\n            <td colspan="5">贷款申请信息</td>\r\n        </tr>\r\n    </thead>\r\n    <tbody>\r\n        ';
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