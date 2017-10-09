define("xg/eid-company-zy/1.0.4/p/customerParent/infoSearch/picter-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
    var Handlebars = require("alinw/handlebars/1.3.0/runtime-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, ">= 1.0.0"];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        return ' <div id="daypicker" class="queryBox mt-10"> \r\n      <label class="labelText pull-left">时间选择：</label>\r\n        <input size="16" id="startTime" class="startTime input-text pull-left w120" type="text" placeholder="开始时间" readonly>\r\n        <div class="pull-left" style="height: 32px;line-height: 32px;padding: 0px 10px;">--</div>\r\n        <input size="16" id="endTime" class="endTime input-text pull-left w120" type="text" placeholder="结束时间" readonly>\r\n    </div>\r\n    <div class="queryBox mt-10">\r\n    <label class="labelText pull-left">地区选择：</label>\r\n    <div class="pull-left" id="address"></div>\r\n\r\n    <label class="labelText pull-left ml-40">门店名称：</label>\r\n    <select class="input-text pull-left w140" id="storeNameSelect" placeholder="请输入客户姓名">\r\n      <option value="">全部</option> \r\n    </select>\r\n    <div class="searchGroup">\r\n        <input type="text" class="input-text pull-right w200" id="searchText" placeholder="请输入客户姓名">\r\n        <i class="Hui-iconfont searchIcon" id="searchIcon">&#xe665;</i>\r\n    </div>\r\n</div>\r\n<div class="hr"></div>'
    })
});