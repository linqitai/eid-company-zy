define("xg/eid-company-zy/1.0.4/p/customerParent/storeStaff/queryBoxTmp-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
    var Handlebars = require("alinw/handlebars/1.3.0/runtime-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, ">= 1.0.0"];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        return '\r\n<div class="queryBox mt10">\r\n    <label class="labelText pull-left">地区选择：</label>\r\n    <div id="address" class="pull-left"></div>\r\n\r\n    <label class="labelText pull-left ml-40">门店名称：</label>\r\n    <select class="input-text pull-left w180" id="storeNameSelect"></select>\r\n    <div class="searchGroup pull-right ml10">\r\n        <input type="text" class="input-text pull-right w200" maxlength="13" id="mobile" placeholder="请输入手机号码">\r\n        <i class="Hui-iconfont searchIcon" data-searchtype="mobile">&#xe665;</i>\r\n    </div>\r\n    <div class="searchGroup">\r\n        <input type="text" class="input-text pull-right w200" id="realName" placeholder="请输入员工姓名">\r\n        <i class="Hui-iconfont searchIcon" id="searchIcon" data-searchtype="realName">&#xe665;</i>\r\n    </div>\r\n</div>\r\n<div class="hr"></div>'
    })
});