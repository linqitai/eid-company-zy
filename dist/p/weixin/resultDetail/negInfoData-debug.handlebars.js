define("xg/eid-company-zy/1.0.4/p/weixin/resultDetail/negInfoData-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
    var Handlebars = require("alinw/handlebars/1.3.0/runtime-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, ">= 1.0.0"];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        var buffer = "",
            stack1, self = this;

        function program1(depth0, data) {
            return '\r\n    <div class="item">\r\n        <div><span class="mylabel">不良记录</span><span class="text pull-right name">XXXXXX</span></div>\r\n        <div><span class="mylabel">案件时间</span><span class="text pull-right idCard">XXXXXX</span></div>\r\n    </div>\r\n'
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