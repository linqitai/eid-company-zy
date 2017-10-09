define("xg/eid-company-zy/1.0.4/c/handlebars/confirm-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
    var Handlebars = require("alinw/handlebars/1.3.0/runtime-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, ">= 1.0.0"];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        return '<div id="modal-confirm" class="modal fade">\r\n    <div class="modal-dialog">\r\n        <div class="modal-content radius">\r\n            <div class="modal-header">\r\n                <h3 class="modal-title">提示</h3>\r\n                <a class="close" data-dismiss="modal" aria-hidden="true" href="javascript:void();">×</a>\r\n            </div>\r\n            <div class="modal-body">\r\n                你确定要重置此门店密码？\r\n            </div>\r\n            <div class="modal-footer">\r\n                <a class="btn btn-primary">确定</a>\r\n                <a class="btn" data-dismiss="modal" aria-hidden="true">关闭</a>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>'
    })
});