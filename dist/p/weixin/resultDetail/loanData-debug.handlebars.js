define("xg/eid-company-zy/1.0.4/p/weixin/resultDetail/loanData-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
    var Handlebars = require("alinw/handlebars/1.3.0/runtime-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, ">= 1.0.0"];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        var buffer = "",
            stack1, self = this;

        function program1(depth0, data) {
            return '\r\n    <div class="item">\r\n        <div><span class="mylabel">信用/消费贷黑名单</span><span class="text pull-right name">无记录</span></div>\r\n        <div><span class="mylabel">信贷逾期</span><span class="text pull-right idCard">无记录</span></div>\r\n        <div><span class="mylabel">信用卡逾期</span><span class="text pull-right cardNumber">无记录</span></div>\r\n        <div><span class="mylabel">P2P黑名单</span><span class="text pull-right time">无记录</span></div>\r\n        <div><span class="mylabel">助学贷款逾期</span><span class="text pull-right time">无记录</span></div>\r\n        <div><span class="mylabel">套现交易</span><span class="text pull-right time">无记录</span></div>\r\n        <div><span class="mylabel">信贷失联</span><span class="text pull-right time">无记录</span></div>\r\n        <div><span class="mylabel">信贷欺诈</span><span class="text pull-right time">无记录</span></div>\r\n        <div><span class="mylabel">风控规则</span><span class="text pull-right time">无记录</span></div>\r\n        <div><span class="mylabel">黑中介</span><span class="text pull-right time">无记录</span></div>\r\n        <div><span class="mylabel">骗取补贴</span><span class="text pull-right time">无记录</span></div>\r\n        <div><span class="mylabel">冒用风险</span><span class="text pull-right time">无记录</span></div>\r\n        <div><span class="mylabel">信贷分值低</span><span class="text pull-right time">无记录}</span></div>\r\n        <div><span class="mylabel">曾经逾期（0-30天）</span><span class="text pull-right time">无记录</span></div>\r\n        <div><span class="mylabel">信贷黑名单</span><span class="text pull-right time">无记录</span></div>\r\n        <div><span class="mylabel">商户欺诈名单</span><span class="text pull-right time">无记录</span></div>\r\n        <div><span class="mylabel">曾经逾期（未知期限）</span><span class="text pull-right time">无记录</span></div>\r\n    </div>\r\n'
        }
        stack1 = helpers.each.call(depth0, depth0, {
            hash: {},
            inverse: self.noop,
            fn: self.program(1, program1, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += "\r\n";
        return buffer
    })
});