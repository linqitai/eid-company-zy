define("xg/eid-company-zy/1.0.4/c/handlebars/parentRightMenuTmp-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
    var Handlebars = require("alinw/handlebars/1.3.0/runtime-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, ">= 1.0.0"];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        return '<li #if($!{page}=="businessHandle") class="current" #end><a href="/subShop/business/view.htm">业务处理</a></li>\r\n<li #if($!{page}=="infoSearch") class="current" #end><a href="/subShop/infoSearch/view.htm">信息查询</a></li>\r\n<li #if($!{page}=="equipmentManage") class="current" #end><a href="/subShop/device/view.htm">设备管理</a></li>\r\n<li #if($!{page}=="accountManage") class="current" #end id="accountManage4Sub"><a href="/subShop/user/view.htm">账号管理</a></li>'
    })
});