define("xg/eid-company-zy/1.0.4/p/adminAccount/customerManageH/cDetailSeachDH-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
    var Handlebars = require("alinw/handlebars/1.3.0/runtime-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, ">= 1.0.0"];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        return '<div class="col-xs-12 data_search">\r\n    <div class="queryBox mt-10 text" id="queryTime">\r\n        <label class="labelText w70 pull-left text-r">查询时间：</label>\r\n        <input size="16" class="customStartTime form-control" placeholder="开始时间" type="text" value="" readonly>        \r\n        <label class="to_text">至</label>\r\n        <input size="16" class="customEndTime form-control" placeholder="结束时间" type="text" value="" readonly>\r\n    </div>\r\n</div>\r\n<div class="col-xs-12">\r\n\t<form id="detailData_searchForm" class="col-xs-4">  \r\n\t\t<label class="form-label col-xs-4 col-sm-3">门店名称：</label>\r\n\t\t<div class="formControls col-xs-8 col-sm-7">\r\n\t\t  <input type="text" class="input-text" placeholder="门店名称" name="companyName">\r\n\t\t</div>\r\n\t\t<input class="btn btn-default col-sm-2" type="submit" id="search_button" value="搜索">\r\n\t</form>\r\n</div>'
    })
});