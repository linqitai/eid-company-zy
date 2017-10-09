define("xg/eid-company-zy/1.0.4/p/adminAccount/customerManageH/cDetailSeachH-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
    var Handlebars = require("alinw/handlebars/1.3.0/runtime-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, ">= 1.0.0"];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        return '<label class="form-label col-xs-4 col-sm-3">MAC：</label>\r\n<div class="formControls col-xs-8 col-sm-7">\r\n  <input type="text" class="input-text" placeholder="MAC查询" name="macId" id="macId">\r\n</div>\r\n<input class="btn btn-default col-sm-2" type="submit" id="search_button" value="搜索">'
    })
});