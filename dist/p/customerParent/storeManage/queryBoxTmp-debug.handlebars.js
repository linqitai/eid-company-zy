define("xg/eid-company-zy/1.0.4/p/customerParent/storeManage/queryBoxTmp-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
    var Handlebars = require("alinw/handlebars/1.3.0/runtime-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, ">= 1.0.0"];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        return '<div class="queryBox">\r\n    <label class="labelText pull-left">地区选择：</label>\r\n    <div class="pull-left" id="provinceCity"></div>\r\n</div>\r\n<div class="queryBox mt10">\r\n    <button class="btn radius btn-primary pull-left w100" id="addStore">新增</button>\r\n    <div class="searchGroup pull-right ml10">\r\n        <input type="text" class="input-text pull-right w200" id="linkname" placeholder="请输入负责人">\r\n        <i class="Hui-iconfont searchIcon" data-searchtype="linkname">&#xe665;</i>\r\n    </div>\r\n    <div class="searchGroup pull-right">\r\n        <input type="text" class="input-text pull-right w200" id="companyname" placeholder="请输入门店名称">\r\n        <i class="Hui-iconfont searchIcon" data-searchtype="companyname">&#xe665;</i>\r\n    </div>\r\n</div>\r\n<div class="hr"></div>'
    })
});