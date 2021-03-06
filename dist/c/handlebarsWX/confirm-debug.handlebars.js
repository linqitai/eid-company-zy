define("xg/eid-company-zy/1.0.4/c/handlebarsWX/confirm-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
    var Handlebars = require("alinw/handlebars/1.3.0/runtime-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, ">= 1.0.0"];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        var buffer = "",
            stack1, helper, functionType = "function",
            escapeExpression = this.escapeExpression;
        buffer += '<div class="myModalConfirm" id="myModalConfirm">\r\n    <div class="myModaldialog">\r\n        <div class="myModalContent radius">\r\n            <div class="myModalHeader">\r\n                <span class="myModalTitle">温馨提示</span>\r\n            </div>\r\n            <div class="myModalBody">\r\n                ';
        if (helper = helpers.msg) {
            stack1 = helper.call(depth0, {
                hash: {},
                data: data
            })
        } else {
            helper = depth0 && depth0.msg;
            stack1 = typeof helper === functionType ? helper.call(depth0, {
                hash: {},
                data: data
            }) : helper
        }
        buffer += escapeExpression(stack1) + '\r\n            </div>\r\n            <div class="myModalFooter">\r\n                <div class="myModalFooterBtnGroup">\r\n                    <a class="displayInline" id="close">取消</a>\r\n                    <a class="button-md displayInline">确定</a>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n<div class="modal-backdrop"></div>';
        return buffer
    })
});