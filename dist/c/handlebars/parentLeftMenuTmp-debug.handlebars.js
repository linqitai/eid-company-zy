define("xg/eid-company-zy/1.0.4/c/handlebars/parentLeftMenuTmp-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
    var Handlebars = require("alinw/handlebars/1.3.0/runtime-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, ">= 1.0.0"];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        return '<li #if($!{page}=="homePage") class="current" #end><a href="/headShop/homePage.htm">首页总览</a></li>\r\n<li #if($!{page}=="businessHandle") class="current" #end><a href="/headShop/business/view.htm">业务处理</a></li>\r\n<li #if($!{page}=="infoSearch") class="current" #end><a href="/headShop/infoSearch/view.htm">信息查询</a></li>\r\n<li #if($!{page}=="statisticalQuery") class="current" #end><a href="/headShop/total/view.htm">统计查询</a></li>\r\n<li #if($!{page}=="storeManage") class="current" #end><a href="/headShop/subShop/view.htm">门店管理</a></li>\r\n<li #if($!{page}=="storeStaff") class="current" #end><a href="/headShop/subShop/user.htm">审核员</a></li>\r\n<li #if($!{page}=="equipmentManage") class="current" #end><a href="/headShop/device/view.htm">设备管理</a></li>\r\n<li #if($!{page}=="accountManage") class="current" #end id="accountManage4Parent"><a href="/headShop/user/view.htm">账号管理</a></li>'
    })
});