define("xg/eid-company-zy/1.0.4/p/reports/badBehavior-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
    var Handlebars = require("alinw/handlebars/1.3.0/runtime-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, ">= 1.0.0"];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        return '<div class="title title2 overflowHidden mt50" id="badBehavior">\r\n    <div class="title2Text" id="reportTitle">公安负面信息</div>\r\n</div>\r\n<table class="badBehavior">\r\n    <thead class="text-c">\r\n    <tr>\r\n        <td>序号</td>\r\n        <td>案件来源</td>\r\n        <td>案件类别</td>\r\n        <td>案发日期</td>\r\n    </tr>\r\n    <tr>\r\n        <td>序号</td>\r\n        <td>案件来源</td>\r\n        <td>案件类别</td>\r\n        <td>案发日期</td>\r\n    </tr>\r\n    </thead>\r\n    <tbody id="policeRecordList">\r\n\r\n    </tbody>\r\n</table>'
    })
});