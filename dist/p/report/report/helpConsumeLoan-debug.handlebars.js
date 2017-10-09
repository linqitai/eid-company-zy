define("xg/eid-company/1.0.4/p/report/report/helpConsumeLoan-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
    var Handlebars = require("alinw/handlebars/1.3.0/runtime-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, ">= 1.0.0"];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        return '\r\n<div class="title">一、编号说明</div>\r\nI1：金融机构M1逾期<br>\r\nI2：金融机构M2逾期<br>\r\nI3：金融机构M3逾期<br>\r\nI4：金融机构M3+逾期<br>\r\nP1：信贷逾期<br>\r\nP2：助学贷款逾期<br>\r\nP3：其他逾期<br>\r\nB1：网贷黑名单<br>\r\nB2：信贷黑名单<br>\r\n--：暂未发现风险<br>'
    })
});