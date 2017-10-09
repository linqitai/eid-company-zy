define("xg/eid-company-zy/1.0.4/p/adminAccount/customerManageH/cDetailMH-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
    var Handlebars = require("alinw/handlebars/1.3.0/runtime-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, ">= 1.0.0"];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        var buffer = "",
            stack1, helper, functionType = "function",
            escapeExpression = this.escapeExpression;
        buffer += '<form class="form form-horizontal" id="editCustomerForm">\r\n  <input type="hidden" name="companyId" value="';
        if (helper = helpers.companyId) {
            stack1 = helper.call(depth0, {
                hash: {},
                data: data
            })
        } else {
            helper = depth0 && depth0.companyId;
            stack1 = typeof helper === functionType ? helper.call(depth0, {
                hash: {},
                data: data
            }) : helper
        }
        buffer += escapeExpression(stack1) + '">\r\n  <div class="col-sm-12 text-r">\r\n    <a href="javascript:void(0)" class="btn btn-primary" id="customerResetPsw" data-companyid="';
        if (helper = helpers.companyId) {
            stack1 = helper.call(depth0, {
                hash: {},
                data: data
            })
        } else {
            helper = depth0 && depth0.companyId;
            stack1 = typeof helper === functionType ? helper.call(depth0, {
                hash: {},
                data: data
            }) : helper
        }
        buffer += escapeExpression(stack1) + '" data-phone="';
        if (helper = helpers.phone) {
            stack1 = helper.call(depth0, {
                hash: {},
                data: data
            })
        } else {
            helper = depth0 && depth0.phone;
            stack1 = typeof helper === functionType ? helper.call(depth0, {
                hash: {},
                data: data
            }) : helper
        }
        buffer += escapeExpression(stack1) + '">重置密码</a>\r\n    <div class="editOption">\r\n      <a class="btn btn-primary editBtn" id="editBtn">编辑</a>\r\n      <input class="btn btn-primary saveBtn current" type="submit" value="保存">\r\n    </div>\r\n  </div>\r\n  <div class="row cl col-sm-6">\r\n    <label class="form-label col-xs-4 col-sm-3">客户名称：</label>\r\n    <div class="formControls col-xs-8 col-sm-9">\r\n      <input type="text" class="input-text" placeholder="客户名称" name="companyName" id="companyName" value="';
        if (helper = helpers.companyName) {
            stack1 = helper.call(depth0, {
                hash: {},
                data: data
            })
        } else {
            helper = depth0 && depth0.companyName;
            stack1 = typeof helper === functionType ? helper.call(depth0, {
                hash: {},
                data: data
            }) : helper
        }
        buffer += escapeExpression(stack1) + '" disabled>\r\n    </div>\r\n  </div>\r\n  <div class="row cl col-sm-6">\r\n    <label class="form-label col-xs-4 col-sm-3">联系人：</label>\r\n    <div class="formControls col-xs-8 col-sm-9">\r\n      <input type="text" class="input-text" autocomplete="off" placeholder="联系人" name="linkMan" id="linkMan" value="';
        if (helper = helpers.linkMan) {
            stack1 = helper.call(depth0, {
                hash: {},
                data: data
            })
        } else {
            helper = depth0 && depth0.linkMan;
            stack1 = typeof helper === functionType ? helper.call(depth0, {
                hash: {},
                data: data
            }) : helper
        }
        buffer += escapeExpression(stack1) + '"\r\n        disabled>\r\n    </div>\r\n  </div>\r\n  <div class="row cl col-sm-6">\r\n    <label class="form-label col-xs-4 col-sm-3">手机号码：</label>\r\n    <div class="formControls col-xs-8 col-sm-9">\r\n      <input type="text" class="input-text" autocomplete="off" placeholder="手机号码" name="phone" id="phone" value="';
        if (helper = helpers.phone) {
            stack1 = helper.call(depth0, {
                hash: {},
                data: data
            })
        } else {
            helper = depth0 && depth0.phone;
            stack1 = typeof helper === functionType ? helper.call(depth0, {
                hash: {},
                data: data
            }) : helper
        }
        buffer += escapeExpression(stack1) + '" disabled>\r\n    </div>\r\n  </div>\r\n  <div class="row cl col-sm-6">\r\n    <label class="form-label col-xs-4 col-sm-3">设备数量：</label>\r\n    <div class="formControls col-xs-8 col-sm-9">\r\n      <input type="text" class="input-text" autocomplete="off" placeholder="设备数量" name="deviceCount" id="deviceCount" value="';
        if (helper = helpers.deviceCount) {
            stack1 = helper.call(depth0, {
                hash: {},
                data: data
            })
        } else {
            helper = depth0 && depth0.deviceCount;
            stack1 = typeof helper === functionType ? helper.call(depth0, {
                hash: {},
                data: data
            }) : helper
        }
        buffer += escapeExpression(stack1) + '"\r\n        disabled>\r\n    </div>\r\n  </div>\r\n  <div class="row cl col-sm-6">\r\n    <label class="form-label col-xs-4 col-sm-3">客户类型：</label>\r\n    <div class="formControls col-xs-8 col-sm-9">\r\n      <select name="typeId" id="typeId" value="';
        if (helper = helpers.typeId) {
            stack1 = helper.call(depth0, {
                hash: {},
                data: data
            })
        } else {
            helper = depth0 && depth0.typeId;
            stack1 = typeof helper === functionType ? helper.call(depth0, {
                hash: {},
                data: data
            }) : helper
        }
        buffer += escapeExpression(stack1) + '" disabled>\r\n          <option value="">请选择类型</option>\r\n        </select>\r\n      <input type="hidden" name="typeName" id="typeName" value="">\r\n    </div>\r\n  </div>\r\n  <div class="row cl col-sm-6">\r\n    <label class="form-label col-xs-4 col-sm-3">状态：</label>\r\n    <div class="formControls col-xs-8 col-sm-9">\r\n      <select name="status" id="status" value="';
        if (helper = helpers.status) {
            stack1 = helper.call(depth0, {
                hash: {},
                data: data
            })
        } else {
            helper = depth0 && depth0.status;
            stack1 = typeof helper === functionType ? helper.call(depth0, {
                hash: {},
                data: data
            }) : helper
        }
        buffer += escapeExpression(stack1) + '" disabled>\r\n          <option value="">请选择类型</option>\r\n          <option value="0">禁用</option>\r\n          <option value="1">启用</option>\r\n        </select>\r\n    </div>\r\n  </div>\r\n  <div class="row cl col-sm-6">\r\n    <label class="form-label col-xs-4 col-sm-3">省市：</label>\r\n    <div class="formControls col-xs-8 col-sm-9">\r\n      <div id="province_city"></div>\r\n    </div>\r\n  </div>\r\n  <div class="row cl col-sm-6">\r\n    <label class="form-label col-xs-4 col-sm-3">详细地址：</label>\r\n    <div class="formControls col-xs-8 col-sm-9">\r\n      <textarea class="textarea" placeholder="详细地址..." rows="" cols="" name="address" id="address" disabled>';
        if (helper = helpers.address) {
            stack1 = helper.call(depth0, {
                hash: {},
                data: data
            })
        } else {
            helper = depth0 && depth0.address;
            stack1 = typeof helper === functionType ? helper.call(depth0, {
                hash: {},
                data: data
            }) : helper
        }
        buffer += escapeExpression(stack1) + '</textarea>\r\n    </div>\r\n  </div>\r\n  <div class="row cl col-sm-6">\r\n    <label class="form-label col-xs-4 col-sm-3">接口：</label>\r\n    <div class="formControls col-xs-8 col-sm-9">\r\n      <select class="form-control" name="isNeedCall" id="isNeedCall" value="';
        if (helper = helpers.isNeedCall) {
            stack1 = helper.call(depth0, {
                hash: {},
                data: data
            })
        } else {
            helper = depth0 && depth0.isNeedCall;
            stack1 = typeof helper === functionType ? helper.call(depth0, {
                hash: {},
                data: data
            }) : helper
        }
        buffer += escapeExpression(stack1) + '" disabled>\r\n        <option value="0">不使用</option>\r\n        <option value="1">使用</option>\r\n      </select>\r\n    </div>\r\n  </div>\r\n  <div class="row cl col-sm-6">\r\n    <label class="form-label col-xs-4 col-sm-3">回调地址：</label>\r\n    <div class="formControls col-xs-8 col-sm-9">\r\n      <input type="text" class="input-text" autocomplete="off" placeholder="回调地址" name="callBackUrl" id="callBackUrl" value="';
        if (helper = helpers.callBackUrl) {
            stack1 = helper.call(depth0, {
                hash: {},
                data: data
            })
        } else {
            helper = depth0 && depth0.callBackUrl;
            stack1 = typeof helper === functionType ? helper.call(depth0, {
                hash: {},
                data: data
            }) : helper
        }
        buffer += escapeExpression(stack1) + '"\r\n        disabled>\r\n    </div>\r\n  </div>\r\n  <div class="row cl col-sm-6">\r\n    <label class="form-label col-xs-4 col-sm-3">LOGO：</label>\r\n    <div class="formControls col-xs-8 col-sm-9">\r\n      <div id="picWrapper">\r\n        <img src="" alt="" id="imgUrl">\r\n        <div id="showContent">\r\n          <a id="changeText">更换LOGO</a>\r\n          <input type="file" class="input-text" autocomplete="off" placeholder="请上传LOGO" id="fileUpload2" accept="image/png,image/jpg,image/jpeg">\r\n        </div>\r\n        <input type="text" name="logoUrl" id="logoUrl2">\r\n      </div>\r\n    </div>\r\n  </div>\r\n</form>';
        return buffer
    })
});