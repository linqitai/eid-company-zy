define("xg/eid-company-zy/1.0.4/p/weixin/identitySearch/sureInfo-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
    var Handlebars = require("alinw/handlebars/1.3.0/runtime-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, ">= 1.0.0"];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        var buffer = "",
            stack1, helper, functionType = "function",
            escapeExpression = this.escapeExpression;
        buffer += '<div class="myModalConfirm" id="myModalConfirm">\r\n    <div class="myModaldialog">\r\n        <div class="myModalContent radius">\r\n            <div class="myModalHeader">\r\n                <span class="myModalTitle">温馨提示</span>\r\n            </div>\r\n            <div class="myModalBody">\r\n                <span class="tip">为了避免查询错误,请认真核对姓名及身份证！</span>\r\n                <div class="mt5">\r\n                    <div class="lineGroup">\r\n                        <span>姓名：</span><span>';
        if (helper = helpers.name) {
            stack1 = helper.call(depth0, {
                hash: {},
                data: data
            })
        } else {
            helper = depth0 && depth0.name;
            stack1 = typeof helper === functionType ? helper.call(depth0, {
                hash: {},
                data: data
            }) : helper
        }
        buffer += escapeExpression(stack1) + '</span>\r\n                    </div>\r\n                    <div class="lineGroup">\r\n                        <span>身份证：</span><span>';
        if (helper = helpers.identityNumber) {
            stack1 = helper.call(depth0, {
                hash: {},
                data: data
            })
        } else {
            helper = depth0 && depth0.identityNumber;
            stack1 = typeof helper === functionType ? helper.call(depth0, {
                hash: {},
                data: data
            }) : helper
        }
        buffer += escapeExpression(stack1) + '</span>\r\n                    </div>\r\n                </div>\r\n                <div class="mt10">\r\n                    <div class="lineGroup">支付方式选择：</div>\r\n                    <div class="lineGroup">\r\n                        <span>微信支付</span><span class="myRadio16 pull-right"></span>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class="myModalFooter">\r\n                <div class="myModalFooterBtnGroup">\r\n                    <a class="displayInline" id="close">取消</a>\r\n                    <a class="button-md displayInline">确定</a>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n<div class="modal-backdrop"></div>';
        return buffer
    })
});