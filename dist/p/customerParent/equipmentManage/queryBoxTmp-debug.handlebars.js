define("xg/eid-company-zy/1.0.4/p/customerParent/equipmentManage/queryBoxTmp-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
    var Handlebars = require("alinw/handlebars/1.3.0/runtime-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, ">= 1.0.0"];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        return '<div class="queryBox">\r\n    <label class="labelText pull-left">地区选择：</label>\r\n    <div class="pull-left" id="provinceCity"></div>\r\n</div>\r\n<div class="queryBox mt10">\r\n    <button class="btn radius btn-primary pull-left w100" id="add">新增</button>\r\n</div>\r\n<div class="hr"></div>'
    })
});