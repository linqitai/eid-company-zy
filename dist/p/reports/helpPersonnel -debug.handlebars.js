define("xg/eid-company-zy/1.0.4/p/reports/helpPersonnel -debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
    var Handlebars = require("alinw/handlebars/1.3.0/runtime-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, ">= 1.0.0"];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        return '\r\n<div class="title">一、编号说明</div>\r\nB1：网贷黑名单<br>\r\nB2：信贷黑名单<br>\r\nH1：失信人执行人<br>\r\nH2：多平台借款<br>\r\nH3：金融机构M1逾期<br>\r\nH4：金融机构M2逾期<br>\r\nH5：金融机构M3逾期<br>\r\nH6：金融机构M3+逾期<br>\r\nH7：互联网信贷逾期<br>\r\n--：暂未发现风险<br>'
    })
});