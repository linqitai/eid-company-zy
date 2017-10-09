define("xg/eid-company-zy/1.0.4/p/adminAccount/accountManageH/editAccountH-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
    var Handlebars = require("alinw/handlebars/1.3.0/runtime-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, ">= 1.0.0"];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        var buffer = "",
            stack1, helper, options, functionType = "function",
            escapeExpression = this.escapeExpression,
            self = this,
            helperMissing = helpers.helperMissing;

        function program1(depth0, data) {
            return "checked"
        }
        buffer += ' <div id="modal-editAccount" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">\r\n  <div class="modal-dialog">\r\n    <div class="modal-content radius">\r\n      <div class="modal-header">\r\n        <h5 class="modal-title">编辑账号</h5>\r\n        <a class="close" data-dismiss="modal" aria-hidden="true" href="javascript:void();">×</a>\r\n      </div>\r\n      <form class="form form-horizontal" id="editAccountForm">\r\n        <input type="hidden" name="userId" id="userId" value="';
        if (helper = helpers.userId) {
            stack1 = helper.call(depth0, {
                hash: {},
                data: data
            })
        } else {
            helper = depth0 && depth0.userId;
            stack1 = typeof helper === functionType ? helper.call(depth0, {
                hash: {},
                data: data
            }) : helper
        }
        buffer += escapeExpression(stack1) + '">\r\n        <div class="modal-body">\r\n            <div class="row cl">\r\n              <label class="form-label col-xs-4 col-sm-3">手机号码：</label>\r\n              <div class="formControls col-xs-8 col-sm-8">\r\n                <input type="text" class="input-text" autocomplete="off" placeholder="手机号码" name="mobile" id="mobile" value="';
        if (helper = helpers.mobile) {
            stack1 = helper.call(depth0, {
                hash: {},
                data: data
            })
        } else {
            helper = depth0 && depth0.mobile;
            stack1 = typeof helper === functionType ? helper.call(depth0, {
                hash: {},
                data: data
            }) : helper
        }
        buffer += escapeExpression(stack1) + '">\r\n              </div>\r\n            </div>\r\n            <div class="row cl">\r\n              <label class="form-label col-xs-4 col-sm-3">姓名：</label>\r\n              <div class="formControls col-xs-8 col-sm-8">\r\n                <input type="text" class="input-text" autocomplete="off" placeholder="联系人" name="realName" id="realName" value="';
        if (helper = helpers.realName) {
            stack1 = helper.call(depth0, {
                hash: {},
                data: data
            })
        } else {
            helper = depth0 && depth0.realName;
            stack1 = typeof helper === functionType ? helper.call(depth0, {
                hash: {},
                data: data
            }) : helper
        }
        buffer += escapeExpression(stack1) + '">\r\n              </div>\r\n            </div>\r\n            <div class="row cl">\r\n              <label class="form-label col-xs-4 col-sm-3">角色：</label>\r\n              <div class="formControls skin-minimal col-xs-8 col-sm-9 role_radio">\r\n                \r\n              </div>\r\n            </div>\r\n            <div class="row cl">\r\n              <label class="form-label col-xs-4 col-sm-3">状态：</label>\r\n              <div class="formControls skin-minimal col-xs-8 col-sm-9">\r\n                <div class="radio-box">\r\n                  <input type="radio" id="status-1" name="status" value="0" ';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(1, program1, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.status, "==", 0, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.status, "==", 0, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '>\r\n                  <label for="status-1">启用</label>\r\n                </div>\r\n                <div class="radio-box">\r\n                  <input type="radio" id="status-2" name="status" value="1" ';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(1, program1, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.status, "!=", 0, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.status, "!=", 0, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '>\r\n                  <label for="status-2">禁用</label>\r\n                </div>\r\n              </div>\r\n            </div>\r\n        </div>\r\n        <div class="modal-footer">\r\n          <input class="btn btn-primary" type="submit" value="提交">\r\n          <!-- <button type="submit" class="btn btn-primary">确定</button> -->\r\n          <button class="btn" data-dismiss="modal" aria-hidden="true">关闭</button>\r\n        </div>\r\n      </form>\r\n    </div>\r\n  </div>\r\n</div>';
        return buffer
    })
});