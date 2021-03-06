define("xg/eid-company/1.0.4/p/report/report/leftBasicInfo-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
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
            var buffer = "",
                helper, options;
            buffer += '<div class="line1 iconComplete">' + escapeExpression((helper = helpers.infoResult || depth0 && depth0.infoResult, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.result, depth0 && depth0.flowStatus, options) : helperMissing.call(depth0, "infoResult", depth0 && depth0.result, depth0 && depth0.flowStatus, options))) + "</div>";
            return buffer
        }

        function program3(depth0, data) {
            var buffer = "",
                helper, options;
            buffer += '<div class="line1 iconFail">' + escapeExpression((helper = helpers.infoResult || depth0 && depth0.infoResult, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.result, depth0 && depth0.flowStatus, options) : helperMissing.call(depth0, "infoResult", depth0 && depth0.result, depth0 && depth0.flowStatus, options))) + "</div>";
            return buffer
        }

        function program5(depth0, data) {
            var buffer = "",
                helper, options;
            buffer += '\r\n        <div class="line1 iconNotV">' + escapeExpression((helper = helpers.validateStatus || depth0 && depth0.validateStatus, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.mobileStatus, options) : helperMissing.call(depth0, "validateStatus", depth0 && depth0.mobileStatus, options))) + '</div>\r\n        <div class="f14">（温馨提示：由于手机号码未校验，导致该报告不完整。）</div>\r\n    ';
            return buffer
        }

        function program7(depth0, data) {
            var buffer = "",
                helper, options;
            buffer += '\r\n        <div class="line1 iconVMobileError">' + escapeExpression((helper = helpers.validateStatus || depth0 && depth0.validateStatus, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.mobileStatus, options) : helperMissing.call(depth0, "validateStatus", depth0 && depth0.mobileStatus, options))) + '</div>\r\n        <div class="f14">（温馨提示：由于手机号码匹配不成功，导致该报告不完整。）</div>\r\n    ';
            return buffer
        }

        function program9(depth0, data) {
            var buffer = "",
                helper, options;
            buffer += '<div class="line1 iconVMobileSuccess">' + escapeExpression((helper = helpers.validateStatus || depth0 && depth0.validateStatus, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.mobileStatus, options) : helperMissing.call(depth0, "validateStatus", depth0 && depth0.mobileStatus, options))) + "</div>";
            return buffer
        }
        buffer += '<div class="box1LeftLines box1Title">比对结果</div>\r\n<div class="box1LeftLines2">\r\n    \r\n    ';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(1, program1, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.result, "==", 0, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.result, "==", 0, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += "\r\n    ";
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(3, program3, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.result, "!=", 0, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.result, "!=", 0, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += "\r\n    ";
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(5, program5, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.mobileStatus, "==", 0, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.mobileStatus, "==", 0, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += "\r\n    ";
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(7, program7, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.mobileStatus, "==", 1, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.mobileStatus, "==", 1, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += "\r\n    ";
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(9, program9, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.mobileStatus, "==", 2, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.mobileStatus, "==", 2, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '\r\n\r\n</div>\r\n<div class="box1LeftLines box1Title">基本信息</div>\r\n<div class="box1LeftLines2">\r\n    <div class="line1">姓<span class="ls">&nbsp</span>名：' + escapeExpression((helper = helpers.h || depth0 && depth0.h, options = {
            hash: {},
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.borrowerName, options) : helperMissing.call(depth0, "h", depth0 && depth0.borrowerName, options))) + '</div>\r\n    <div class="line1">姓<span class="ls">&nbsp</span>别：' + escapeExpression((helper = helpers.infoSex || depth0 && depth0.infoSex, options = {
            hash: {},
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.sex, options) : helperMissing.call(depth0, "infoSex", depth0 && depth0.sex, options))) + '</div>\r\n    <div class="line1">年<span class="ls">&nbsp</span>龄：' + escapeExpression((helper = helpers.countAge || depth0 && depth0.countAge, options = {
            hash: {},
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.birthdate, options) : helperMissing.call(depth0, "countAge", depth0 && depth0.birthdate, options))) + '</div>\r\n    <div class="line1">出<span class="ls">&nbsp</span>生：' + escapeExpression((helper = helpers.h || depth0 && depth0.h, options = {
            hash: {},
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.birthdate, options) : helperMissing.call(depth0, "h", depth0 && depth0.birthdate, options))) + '</div>\r\n    \r\n    <div class="line1">手机号：' + escapeExpression((helper = helpers.h || depth0 && depth0.h, options = {
            hash: {},
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.mobile, options) : helperMissing.call(depth0, "h", depth0 && depth0.mobile, options))) + '</div>\r\n    \r\n</div>\r\n<div class="box1LeftLines2">\r\n    <div class="line1">证件类型：身份证</div>\r\n    <div class="line1">身份证号：' + escapeExpression((helper = helpers.h || depth0 && depth0.h, options = {
            hash: {},
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.cardNum, options) : helperMissing.call(depth0, "h", depth0 && depth0.cardNum, options))) + '</div>\r\n    \r\n    <div class="line1">有效期限：' + escapeExpression((helper = helpers.h || depth0 && depth0.h, options = {
            hash: {},
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.validDate, options) : helperMissing.call(depth0, "h", depth0 && depth0.validDate, options))) + '</div>\r\n</div>\r\n<div class="box1LeftLinesLast">\r\n    <div class="line1">查询网点：' + escapeExpression((helper = helpers.h || depth0 && depth0.h, options = {
            hash: {},
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.companyName, options) : helperMissing.call(depth0, "h", depth0 && depth0.companyName, options))) + '</div>\r\n    <div class="line1">查询时间：' + escapeExpression((helper = helpers.formatDate || depth0 && depth0.formatDate, options = {
            hash: {},
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.created, options) : helperMissing.call(depth0, "formatDate", depth0 && depth0.created, options))) + "</div>\r\n</div>";
        return buffer
    })
});